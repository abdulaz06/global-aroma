# Research and creative direction

Reviewed 23 November 2026. The public company pages, the supplied HTML demonstration and the local Sonora checkout informed the brief before implementation.

## The missing journey

Global Aroma's homepage introduces three divisions, while its primary menu centres on fragrance. The prominent division actions resolve to the homepage, and general shopping categories sit alongside corporate information. A hotel operator looking for guest linen or signage has little indication of where to go. The prototype gives each division an address, a representative material and a project-specific enquiry. Featured products, oil and diffuser categories, and the distributor page link to the official site. Sampler requests open a prefilled enquiry. [Homepage](https://globalaroma.me/) · [Company](https://globalaroma.me/about-us/) · [Catalogue](https://globalaroma.me/shop/) · [Distribution](https://globalaroma.me/distributors/) · [Ordering review](ORDERING.md)

The fragrance collection includes named compositions and individual notes. These support a sensory introduction and a meaningful choice in the Studio. The public site provides less detail for the other divisions, so their pages describe published service categories and ask concrete project questions. Named client installations, supplier relationships, coverage figures and service commitments would require separate evidence. [Scent collection](https://globalaroma.me/scent-collection/) · [Diffusers](https://globalaroma.me/aroma-diffusers/) · [Published divisions](https://globalaroma.me/)

## What the existing work taught us

The supplied 1.95 MB HTML file already gives visitors quick orientation, direct contact actions, keyboard-operable industry selections, manual image controls and a reduced-motion treatment. Embedding the media and presenting divisions in dialogs was convenient for sharing one file. Individual routes now support deep links, page titles and a browser back stack. Independent image files allow device-specific crops and caching.

Sonora's coherence comes from specifying how a mark, type, motion and voice work across surfaces. Its site presents the product visually before offering deeper technical routes. Its scripts defer expensive effects, its media component can show stills, and its Reel workflow fixes title placement, cover crops and review steps. This project applies those principles through an architectural identity, static HTML and reusable social compositions. The local checkout at `45a609c` was the implementation reference. The repository declares a PolyForm Noncommercial licence. All code, imagery and marks for this proposal were produced separately. [Sonora site](https://sonoravisuals.com/) · [Site source](https://github.com/abdulaz06/sonora/tree/45a609c0c196fd61def7943fc401907740c808e7/site) · [Brand specification](https://github.com/abdulaz06/sonora/blob/45a609c0c196fd61def7943fc401907740c808e7/DOCS/brand/17-BRAND.md) · [Reel workflow](https://github.com/abdulaz06/sonora/blob/45a609c0c196fd61def7943fc401907740c808e7/DOCS/REELS.md)

## A sense of place

Aman's presentation of a property moves from the setting to the details of a stay. Norm Architects introduces work through materials and use. Aesop gives physical referents to fragrance choices, and Crestron explains a technology through what someone can do in a room. The common lesson is to begin with a place a visitor can picture. [Amangiri](https://www.aman.com/resorts/amangiri) · [Norm Architects](https://normcph.com/) · [Aesop Fragrance Finder](https://www.aesop.com/fragrance-fables-finder/) · [Crestron AirMedia](https://www.crestron.com/Products/Featured-Solutions/Airmedia)

An arrival hall opens the website. Architectural ribs informed the line mark. Amber glass introduces fragrance, folded linen introduces hospitality, and a display set into a graphite wall introduces technology. The same serif wordmark and editorial italic appear across all three. A neutral sans serif carries product information and controls. On social, the introduction uses an architectural crop while the division posts move closer to an individual material. The editable records specify subject, crop, headline and product family. [Cross-format grid precedent](https://www.ibm.com/design/language/2x-grid/)

## Technical choices and limits

Astro renders the whole site at build time. The Studio needs three settings, three fragrances and a portable brief. Native radio inputs and a small TypeScript module cover the interaction. The opening image is discoverable in HTML, uses a portrait crop on small screens and receives high fetch priority. Other hero studies stay in inert templates until selected. There is no animation loop. [Astro architecture](https://docs.astro.build/en/concepts/why-astro/) · [Responsive images](https://web.dev/learn/images/responsive-images) · [LCP](https://web.dev/articles/optimize-lcp) · [Motion accessibility](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)

Research used public pages and source code. The team had no owner interview, performance analytics, private product sheets or installation photography. The proposed setting-to-service pairings are examples to start a conversation. [Approval register](APPROVALS.md)
