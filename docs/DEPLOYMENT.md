# Owner preview verification

Verified on 23 November 2026. The website is ready for private design review.

| Vercel project | Environment | Deployment | Verified result |
| --- | --- | --- | --- |
| `uhbdul/global-aroma-concept` | Preview | `dpl_8Ba9wim7p9tr9nN5x6CcJ5DfffPy` | Ready. The seven-page Astro website is deployed here. |
| Same project | Production | `dpl_HKAz1dh2QYASvGkRcp1G8cekrTcP` | Ready. The only response body supplied to Vercel was a zero-byte file. The catch-all returns HTTP 404. |

The project uses Vercel-generated addresses exclusively. After the website went live in Preview, independent requests to the [Production root](https://global-aroma-concept.vercel.app/) and its Studio path still returned HTTP 404, zero bytes and a noindex header.

## Source control and future previews

The source repository is [abdulaz06/global-aroma](https://github.com/abdulaz06/global-aroma). Vercel reports no connected Git repository for this project. GitHub Actions verifies changes on `main` and pull requests. Publishing a subsequent private review is a separate CLI operation.

For an authorized Preview update from a fresh clone, first run `vercel link --project global-aroma-concept --scope uhbdul` from the repository root. Confirm the project name in the CLI output, then use `vercel deploy --environment=preview --scope uhbdul`. Reviewer links belong to a particular deployment. Verify the new deployment and its access before sharing it.

## Sharing the website

Use the deployment-specific reviewer link delivered privately to the project owner. Anyone holding it can view this Preview through **23 December 2026 at 10:32 UTC**. Vercel Authentication remains enabled. Signed-out visitors using the [bare Preview address](https://global-aroma-concept-7n3w4dw2q-uhbdul.vercel.app/) receive an authentication redirect. Before a later review, the project owner can issue a fresh link from the [deployment dashboard](https://vercel.com/uhbdul/global-aroma-concept/8Ba9wim7p9tr9nN5x6CcJ5DfffPy).

Every page identifies the work as an unofficial design concept and links to the official site. The deployed pages have HTML and HTTP noindex directives. The site's robots.txt disallows crawling. The social samples and presentation are maintained separately in this project.

## What passed

| Live check | Observed result |
| --- | --- |
| Signed-out access | Independent, fresh desktop and touch browser sessions opened the reviewer link without a Vercel login. |
| Seven routes | Home, About, Contact, Atmosphere Studio and the three division pages each returned HTTP 200 on desktop Chromium at 1440 × 900 and mobile Chromium at 390 × 844. A missing page returned 404. |
| Navigation and motion | Verified the mobile menu, desktop navigation, keyboard controls, carousel, fragrance disclosures, division enquiry links, desktop transition and reduced-motion behavior. No unexpected console or network errors were observed on the concept. |
| Atmosphere Studio | All nine space and scent combinations worked on desktop and mobile. Scene images decoded, selection survived reload, the copy fallback worked and the contact page received the selected brief. |
| Assets and sharing metadata | Compared all 27 deployed font and visual files, including the mark and social preview image, byte-for-byte with the build. Checked the absolute social-image URL and indexing directives. |
| Store handoff | Followed both featured product links to their official WooCommerce forms in desktop Chromium and touch WebKit at 390 × 844. Also verified Studio-to-contact in WebKit. No cart, checkout, payment or email submission was made. |

The local production build emitted all seven pages and the 404 page. Astro's check reported zero warnings and errors. The local browser suite passed 35 route and viewport combinations, 14 accessibility scans and 22 internal link targets. Mobile browser checks used emulated viewports and touch input.

See the [live check results](qa/hosted/report.json), [desktop homepage](qa/hosted/home-1440.jpg), [mobile homepage](qa/hosted/home-390.jpg), [desktop Studio](qa/hosted/studio-1440.jpg), [mobile Studio](qa/hosted/studio-390.jpg), [desktop shop handoff](qa/hosted/shop-1440.jpg) and [mobile shop handoff](qa/hosted/shop-390.jpg).

## Before taking customer orders

The public demo establishes the handoff to the company's existing store. Seller recipients, payment processing and actual inbox delivery require merchant evidence. See the [ordering review and acceptance procedure](ORDERING.md) and [owner approval register](APPROVALS.md).
