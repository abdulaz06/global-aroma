// Named profiles and notes come from https://globalaroma.me/scent-collection/.
// The venue pairings are editorial starting points for a consultation.
export const spaces = [
  {
    id: "lobby",
    label: "Hotel lobby",
    title: "The hotel lobby",
    image: "arrival",
    alt: "An architectural study of a hotel arrival space",
    aroma:
      "Discuss diffuser placement along the arrival route and where the scent should give way.",
    hospitality:
      "Consider front office trolleys and guest amenities for the welcome at reception.",
    technology:
      "Explore digital signage for directions from reception to guest facilities.",
  },
  {
    id: "restaurant",
    label: "Restaurant",
    title: "The restaurant",
    image: "dining",
    alt: "An interior study of a restaurant dining space",
    aroma:
      "Consider an entrance scent and leave the dining area to the aromas of the kitchen.",
    hospitality:
      "Discuss table linen for daily service and banquet furniture for larger occasions.",
    technology: "Explore a digital menu or an event display near the entrance.",
  },
  {
    id: "workplace",
    label: "Workplace",
    title: "The workplace",
    image: "workplace",
    alt: "An architectural study of a contemporary workplace",
    aroma:
      "Discuss a scent for visitor reception and whether adjoining work areas should stay unscented.",
    hospitality:
      "Consider guest amenities for meeting suites and visitor washrooms.",
    technology:
      "Discuss ICT connectivity for meeting rooms and digital signage for visitors.",
  },
] as const;

export const scents = [
  {
    id: "white-tea",
    name: "White Tea",
    direction: "Fresh & green",
    notes: "Tea, tangerine and osmanthus",
    color: "#747c5a",
  },
  {
    id: "ginger-blossom",
    name: "Ginger Blossom",
    direction: "Floral & spiced",
    notes: "Ginger, jasmine and sandalwood",
    color: "#b27158",
  },
  {
    id: "black-tea",
    name: "Black Tea Accord",
    direction: "Citrus & wood",
    notes: "Bergamot, clove and vetiver",
    color: "#715342",
  },
] as const;

export type StudioSpace = (typeof spaces)[number];
export type StudioScent = (typeof scents)[number];

export function makeBrief(space: StudioSpace, scent: StudioScent) {
  return [
    `Space: ${space.label}`,
    `Scent direction: ${scent.direction} — ${scent.name} (${scent.notes}).`,
    `Scent: ${space.aroma}`,
    `Hospitality: ${space.hospitality}`,
    `Technology: ${space.technology}`,
  ].join("\n");
}

export function inquiryLink(space: StudioSpace, scent: StudioScent) {
  return `/contact/?${new URLSearchParams({ brief: makeBrief(space, scent) })}`;
}
