# Design system and asset provenance

The opening scene places the visitor inside an arrival hall. Each division then comes closer to a material the business supplies. The heading “A sense of place.”, the arch mark and the same two type families carry that sequence from the website to the social campaign. All artwork is proposed for private owner review.

## Visual language

| Element | How it works | Source |
| --- | --- | --- |
| Signature | Pair the arch mark with the full Global Aroma name. The website renders the mark in the current text colour. Keep the SVG proportions when placing it over light or dark images. | [Mark](../public/mark.svg) · [Wordmark](../src/components/Wordmark.astro) |
| Type | Instrument Serif regular sets names and headlines. Its italic gives one phrase emphasis. DM Sans carries paragraphs, product details, labels and controls. | [Website styles](../src/styles/global.css) · [Campaign styles](../social/templates.css) |
| Shared palette | Warm paper `#faf8f3` and ink `#28261f` set the principal contrast. Muted text `#665f53`, rules `#d8d1c3` and copper labels `#855838` provide hierarchy. | [Colour and spacing tokens](../src/styles/global.css) |
| Division pages | Amber glass and a warm sand ground (`#ece3d6`) identify Aroma. Folded linen and pale green (`#e6e7da`) identify Hospitality. A corridor display and cool grey (`#dfe6e7`) identify Technology. Preserve each name in text alongside its visual cues. | [Division styles](../src/styles/interior.css) · [Division content](../src/data/divisions.ts) |
| Composition and movement | Opening scenes span the width of the page. Interior pages pair a heading with a material study. Scene changes follow visitor input. Keep the reading order, visible focus and reduced-motion treatment when editing. | [Home](../src/pages/index.astro) · [Studio](../src/pages/studio.astro) · [Shared styles](../src/styles/global.css) |

## Reusing the campaign

The four 1080 × 1350 carousel plates introduce the group, then its three divisions. The 1080 × 1920 Reel cover keeps the title within the centre square. Change a headline, crop, alt text or product family in the campaign records, then regenerate the PNGs from the editable layouts. Keep the concept-image disclosure on review artwork and inspect the cover in the intended crop before publication. [Campaign records](../social/templates.js) · [Templates, export steps and captions](../social/README.md)

## Sources and rights

| Material | Evidence and handoff |
| --- | --- |
| Instrument Serif | The regular and italic Latin WOFF2 files match the corresponding distribution files in `@fontsource/instrument-serif@5.3.0` byte for byte. Copyright 2022 The Instrument Serif Project Authors. [Fontsource package](https://www.npmjs.com/package/@fontsource/instrument-serif/v/5.3.0) · [Bundled notice](../public/fonts/LICENSE-Instrument-Serif.txt) |
| DM Sans | The variable-weight upright Latin WOFF2 matches the corresponding file in `@fontsource-variable/dm-sans@5.3.0` byte for byte. Copyright 2014 The DM Sans Project Authors. [Fontsource package](https://www.npmjs.com/package/@fontsource-variable/dm-sans/v/5.3.0) · [Bundled notice](../public/fonts/LICENSE-DM-Sans.txt) |
| Generated imagery | Seven original concept studies supply the 22 responsive WebP files. They illustrate possible environments, materials and equipment. Retain that description in alt text and captions. Owner approval or rights-cleared replacement photography is required for commercial use. [Image inventory](APPROVALS.md#visual-provenance) · [Responsive image sizes](../src/components/Photo.astro) |
| Derived artwork | The social card, campaign exports and two-page owner presentation reuse these visuals. The PDF embeds subsets of Instrument Serif regular and italic and DM Sans. Keep the editable social templates with the exports. [Social card](../public/social-preview.jpg) · [Campaign exports](../social/exports/) · [Owner presentation](../output/pdf/Global-Aroma-Owner-Presentation.pdf) |

Both type families use the SIL Open Font License 1.1. The two bundled copyright and licence notices match the Google Fonts upstream notices after whitespace normalization. Include them when distributing the font files. The licence permits commercial design work and embedding. The proposed identity, imagery and business copy have their own approval process. [Instrument Serif upstream notice](https://github.com/google/fonts/blob/main/ofl/instrumentserif/OFL.txt) · [DM Sans upstream notice](https://github.com/google/fonts/blob/main/ofl/dmsans/OFL.txt) · [SIL guidance](https://openfontlicense.org/ofl-faq/) · [Owner approval register](APPROVALS.md)

For approved replacement imagery, update the corresponding width and height in the image component if the aspect ratio changes. Provide the portrait crop for each opening scene, check it at 620 CSS pixels and below, and review dependent social crops and presentation pages. [Portrait image component](../src/components/ScenePicture.astro)
