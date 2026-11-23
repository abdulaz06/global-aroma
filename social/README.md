# A sense of place.

A four-slide Instagram carousel introduces Global DWC LLC and its three divisions. The Reel cover adapts the opening slide to a taller frame. The main title sits inside the cover’s central square so the phrase survives a centre crop. These are proposed campaign materials for review.

## Review the samples

Open the [campaign overview](exports/campaign-proof.jpg) or the individual PNGs in [exports](exports/). To view all five layouts with their download links, run this command from the project root and browse to [the sample gallery](http://localhost:8000/social/).

```sh
python -m http.server 8000 --bind 127.0.0.1
```

| Sample | Format | Suggested alt text |
| --- | --- | --- |
| [01 · Opening](exports/01-a-sense-of-place.png) | 1080 × 1350 | Warm light falls on a sequence of arches, introducing “A sense of place.” and the group's three disciplines. |
| [02 · Global Aroma](exports/02-global-aroma.png) | 1080 × 1350 | Amber glass bottles accompany the words “A signature scent.” and the categories aroma diffusers and fragrance oils. |
| [03 · Global Hospitality](exports/03-global-hospitality.png) | 1080 × 1350 | Folded towels and bed linen illustrate “Details of a stay.”, guest room linen and guest amenities. |
| [04 · Global Technology](exports/04-global-technology.png) | 1080 × 1350 | A display in a dark corridor introduces “A connected space.”, ICT, connectivity and digital signage. |
| [05 · Reel cover](exports/05-reel-cover.png) | 1080 × 1920 | A sunlit arch frames “A sense of place. Scent, hospitality and technology.” |

## Sample carousel caption

What gives a space its character? A scent as you arrive. The linen in a guest room. The information you find on a display. Global DWC LLC brings together three divisions in Dubai, each with a different part to play. Swipe to meet Global Aroma, Global Hospitality and Global Technology.

Concept imagery and proposed campaign copy for client review.

## Edit and export

1. Edit the campaign records in [templates.js](templates.js). Each record specifies the headline, product categories, image, crop and export name. Use short, two-line headlines and one line of product categories.
2. Adjust the master compositions and palette in [templates.css](templates.css). The gallery and exports use the same HTML. The opening and cover use a 1942-pixel architectural image. The inset product studies use 724-pixel sources. For new photography, update the filename and crop in the template, then inspect the result at both sizes.
3. Regenerate the PNGs with Python and Playwright. The exporter serves the project locally, checks the fonts and imagery and captures the two artboard sizes. It runs independently of the website build.

```sh
python -m pip install playwright
python -m playwright install chromium
python social/export.py
```

## Content and approval

The company’s public site identifies the three divisions and lists diffuser oils, aroma diffusers, guest room linen, guest amenities, ICT and digital signage. The headlines and caption are original campaign proposals. The images are illustrative and do not document client work, an installation, a specific product or a hotel relationship. Each export carries an image disclosure. Before publication, the owner should approve the identity, image use, copy and current product categories. Check cover crops in the intended platform preview. [Global Aroma](https://globalaroma.me/)
