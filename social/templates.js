// Edit copy, crop or filename here, then run export.py to refresh the deliverables.
const pictures = '../public/images/';
const plates = [
  {
    id: '01-a-sense-of-place', layout: 'opening', edition: '01 / 04',
    division: 'Global DWC LLC', title: ['A sense', 'of place.'],
    subjects: 'Scent, hospitality and technology', image: 'arrival-1942.webp',
    alt: 'Warm daylight falls on a series of architectural arches.', crop: '62% 50%'
  },
  {
    id: '02-global-aroma', layout: 'aroma', edition: '02 / 04',
    division: 'Global Aroma', title: ['A signature', 'scent.'],
    subjects: 'Aroma diffusers & fragrance oils', image: 'aroma-724.webp',
    alt: 'Unlabelled amber bottles in warm light.', crop: '50% 50%'
  },
  {
    id: '03-global-hospitality', layout: 'hospitality', edition: '03 / 04',
    division: 'Global Hospitality', title: ['Details of', 'a stay.'],
    subjects: 'Guest room linen & guest amenities', image: 'hospitality-724.webp',
    alt: 'Folded towels on soft bed linen.', crop: '50% 50%'
  },
  {
    id: '04-global-technology', layout: 'technology', edition: '04 / 04',
    division: 'Global Technology', title: ['A connected', 'space.'],
    subjects: 'ICT, connectivity & digital signage', image: 'technology-724.webp',
    alt: 'A screen with abstract imagery stands in a dark corridor.', crop: '50% 50%'
  },
  {
    id: '05-reel-cover', layout: 'reel', edition: 'DUBAI, UAE',
    division: 'Global DWC LLC', title: ['A sense', 'of place.'],
    subjects: 'Scent, hospitality and technology', image: 'arrival-1942.webp',
    alt: 'A sunlit arch fills a vertical frame.', crop: '64% 50%'
  }
];

function element(tag, className, content) {
  const item = document.createElement(tag);
  item.className = className;
  if (content) item.textContent = content;
  return item;
}

function renderPlate(plate) {
  const frame = element('figure', 'frame');
  const surface = element('div', 'surface');
  const art = element('div', 'art ' + plate.layout);
  art.id = plate.id;
  const photo = element('img', 'photo');
  photo.src = pictures + plate.image;
  photo.alt = plate.alt;
  photo.style.objectPosition = plate.crop;

  const top = element('div', 'mast');
  const signature = element('div', 'signature');
  const symbol = element('img', 'symbol');
  symbol.src = '../public/mark.svg';
  symbol.alt = '';
  signature.append(symbol, element('span', '', 'Global Aroma'));
  top.append(signature, element('span', 'label edition', plate.edition));

  const text = element('div', 'type');
  text.append(element('p', 'label division', plate.division));
  const title = element('p', 'headline');
  title.append(element('span', '', plate.title[0]), element('i', '', plate.title[1]));
  text.append(title, element('p', 'subjects', plate.subjects));

  const foot = element('div', 'foot');
  foot.append(element('span', 'label', 'Design study'), element('span', 'label', 'Illustrative image'));
  art.append(photo, top, text, foot);
  surface.append(art);
  const caption = element('figcaption', 'asset-caption');
  const titleLabel = plate.layout === 'reel' ? 'A sense of place · Reel cover' :
    plate.layout === 'opening' ? 'Opening slide' : plate.division;
  const download = element('a', '', 'Download PNG');
  download.href = 'exports/' + plate.id + '.png';
  download.download = '';
  download.setAttribute('aria-label', 'Download ' + titleLabel + ' as PNG');
  caption.append(element('span', '', titleLabel), download);
  frame.append(surface, caption);
  document.querySelector(plate.layout === 'reel' ? '#cover' : '#feed').append(frame);
}

plates.forEach(renderPlate);
