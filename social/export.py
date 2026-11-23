"""Rebuild the social PNGs from the editable HTML and the website's original assets."""
from contextlib import contextmanager
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

from playwright.sync_api import sync_playwright

SOCIAL = Path(__file__).resolve().parent
OUTPUT = SOCIAL / "exports"


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass


@contextmanager
def project_server():
    serve_project = partial(QuietHandler, directory=str(SOCIAL.parent))
    with ThreadingHTTPServer(("127.0.0.1", 0), serve_project) as server:
        thread = Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            yield f"http://127.0.0.1:{server.server_port}"
        finally:
            server.shutdown()
            thread.join()


def export():
    OUTPUT.mkdir(exist_ok=True)
    with project_server() as url, sync_playwright() as playwright:
        with playwright.chromium.launch() as browser:
            page = browser.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=1)
            errors = []
            page.on("pageerror", lambda error: errors.append(str(error)))
            page.on("response", lambda response: errors.append(response.url) if response.status >= 400 else None)
            page.goto(f"{url}/social/", wait_until="networkidle")
            # Render the same artwork at a pixel-perfect width outside the responsive gallery.
            page.add_style_tag(content="""
                .studio { max-width: none; margin: 0; padding: 0; }
                .studio-heading, .studio h2, .asset-caption { display: none; }
                .studio section { margin: 0; }
                .gallery { display: block; }
                .frame { width: 1080px; }
            """)
            page.evaluate("""async () => {
                await Promise.all([
                    document.fonts.load('48px "Instrument Serif"'),
                    document.fonts.load('italic 48px "Instrument Serif"'),
                    document.fonts.load('500 16px "DM Sans"'),
                    ...Array.from(document.images, image => image.decode())
                ]);
                await document.fonts.ready;
            }""")
            if errors:
                raise RuntimeError("Assets or page failed to load: " + ", ".join(errors))
            artboards = page.locator(".art")
            if not artboards.count():
                raise RuntimeError("No artboards were found.")
            for art in artboards.all():
                name = art.get_attribute("id")
                dimensions = art.bounding_box()
                height = 1920 if "reel" in art.get_attribute("class").split() else 1350
                if dimensions["width"] != 1080 or round(dimensions["height"]) != height:
                    raise ValueError(f"{name} has unexpected dimensions {dimensions}")
                art.screenshot(path=str(OUTPUT / f"{name}.png"), animations="disabled")
                print(f"{name}.png  1080 × {height}")

            proof = browser.new_page(viewport={"width": 1800, "height": 1050}, device_scale_factor=1)
            proof.goto(f"{url}/social/", wait_until="networkidle")
            proof.evaluate("document.body.classList.add('proof')")
            proof.evaluate("document.fonts.ready")
            proof.locator(".studio").screenshot(path=str(OUTPUT / "campaign-proof.jpg"), quality=90)
            print("campaign-proof.jpg")


if __name__ == "__main__":
    export()
