# Preview QA

This is the original local design-review baseline from 23 November 2026, before the shop handoff was added. Browser checks ran on Windows against the static build with Node 24.19.0, Astro 7.4.13, Playwright 1.65.1 and axe integration 4.14.0. The subsequent [hosted verification](DEPLOYMENT.md) covers the published Preview and its updated 22 internal link targets.

## Results

| Check | Observed result |
| --- | --- |
| Installation, type checking and build | npm installed the locked dependencies. Astro reported 0 errors, warnings and hints. Eight HTML files were emitted, comprising seven content routes and a custom 404. An unknown address returned HTTP 404. |
| Responsive layout | All seven content routes returned HTTP 200 at 320, 390, 768, 1024 and 1440 CSS pixels. All 35 route and width combinations fit the viewport without horizontal overflow. |
| Links, navigation and media | All 20 unique internal destinations and fragment targets exercised by the crawler resolved. Content images decoded, the preview card and favicon returned HTTP 200, and the suite recorded no browser script errors or failed subresource responses. |
| Automated accessibility | Fourteen axe scans across the seven pages at 390 and 1440 pixels returned zero violations for the selected WCAG A/AA rules. Keyboard checks covered the skip link, division menu, Escape focus return, scene buttons and native Studio radio controls. |
| Browser engines | Chromium 159.0.8154.6 and WebKit 27.2 passed the carousel, fragrance disclosures, mobile menu, division enquiry, Studio selection, keyboard changes and JavaScript-disabled checks. Both interaction runs used reduced motion. |
| Studio and enquiry | All nine venue and fragrance combinations produced distinct briefs. Reload restored the selection, arrow keys changed the scent, and the contact textarea matched the selected brief exactly. Unknown selection values fell back to Hotel lobby and White Tea. Empty required messages failed native validation. |
| Copy and fallback | Browser tests exercised clipboard denial and verified the selectable brief. A separate isolated Chromium tab captured the successful Studio and enquiry clipboard writes. JavaScript-disabled navigation reached the static Studio example and its prefilled email link. |
| Public business links | HTTP GET returned 200 for the company homepage, about, shop, contact, scent collection, diffusers, oils, scented formats, scent boxes, distributor page and the two referenced diffuser model pages. |
| Vercel configuration | A second local build with a simulated deployment hostname emitted the correct absolute social-image URL. The review build contains preview robots directives. |
| Portable handoff | The ZIP passed its archive integrity test. A fresh extraction outside the workspace installed 275 packages with `npm ci` and rebuilt all eight HTML files successfully. |
| Social and owner materials | Four carousel PNGs measured 1080 × 1350 and the Reel cover measured 1080 × 1920. The gallery was checked at 320, 390, 768 and 1440 pixels, including all five downloads. The two-page owner PDF was rendered for inspection and its text was extracted successfully. |

## First-view performance

Three fresh Chromium contexts loaded the homepage at 390 × 844, device pixel ratio 2, with the cache disabled. The local lab applied 4× CPU slowdown, 150 ms latency, 1.6 Mbps download and 0.75 Mbps upload. Measurements include the document and resources fetched before scrolling. Repeat with `npm run build` and `npm run measure`.

| Run | Largest contentful paint | Cumulative layout shift | Transferred |
| --- | ---: | ---: | ---: |
| 1 | 1.312 s | 0.0394 | 294,515 bytes |
| 2 | 1.288 s | 0.0394 | 294,515 bytes |
| 3 | 1.296 s | 0.0394 | 294,515 bytes |

All three runs selected the portrait hero asset. Alternative scene images load on demand. The website output is approximately 1.53 MB, including every image candidate, font, page and the social preview. The large campaign exports and PDF live outside the website output.

## Visual review and revisions

The first desktop composition pushed the division imagery below a 900-pixel viewport. Shortening the opening revealed the next section while preserving the architectural perspective. On the phone, a stronger local shadow and shorter paragraph measure made the copy legible against the sunlit arch. Inspection at 768 pixels exposed a wrapped header. The revised header switches to compact navigation at 900 pixels. The narrow Studio now fits all three setting controls on one row. Wider scene candidates retain detail where a tall frame crops a landscape image.

[Desktop opening](qa/home-desktop.jpg) · [Full homepage](qa/home-full.jpg) · [Tablet](qa/home-tablet.jpg) · [Phone](qa/home-mobile.jpg) · [Division page](qa/aroma-desktop.jpg) · [Studio desktop](qa/studio-desktop.jpg) · [Studio mobile](qa/studio-mobile.jpg) · [Enquiry mobile](qa/contact-mobile.jpg)

## Known limits

The tests cover browser engines and emulated viewports. Physical iOS and Android devices, assistive-technology user testing, field performance and social-platform crop previews remain unverified. Automated scans cover a subset of accessibility requirements. Email, telephone and WhatsApp destinations were inspected without contacting the business. Email draft handling depends on the visitor's configured mail application. The office details, commercial imagery decision and product wording still need owner confirmation. [Approval register](APPROVALS.md)
