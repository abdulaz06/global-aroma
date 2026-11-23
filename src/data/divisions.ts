export type DivisionSlug = "aroma" | "hospitality" | "technology";

type Service = {
  title: string;
  description: string;
  link?: { label: string; href: string };
};

type Division = {
  slug: DivisionSlug;
  index: string;
  name: string;
  imageAlt: string;
  discipline: string;
  intro: string;
  heading: string;
  briefPrompt: string;
  services: Service[];
};

export const divisions: Division[] = [
  {
    slug: "aroma",
    index: "01",
    name: "Global Aroma",
    imageAlt:
      "Illustrative still life of amber fragrance bottles on stone in warm sunlight.",
    discipline: "Fragrance & diffusion",
    intro:
      "A signature scent begins with the room. Explore fragrance oils, diffusion systems and scented objects for hotels, restaurants and shared spaces.",
    heading: "Ways to scent a space.",
    briefPrompt:
      "Tell us about the room, its approximate size and the fragrances you have in mind.",
    services: [
      {
        title: "Fragrance selection",
        description:
          "Explore the scent collection by family, from fresh citrus and soft florals to woods and spice. Ask about developing a signature fragrance for your brand.",
        link: {
          label: "Explore the scent collection",
          href: "https://globalaroma.me/scent-collection/",
        },
      },
      {
        title: "Diffusers & oils",
        description:
          "The GA-OV-5 is a compact cold-air diffuser. For a building with central air, the GA-M-H3000 connects to the HVAC system. Discuss the room and installation with the team before choosing a model.",
        link: {
          label: "View diffuser models",
          href: "https://globalaroma.me/aroma-diffusers/",
        },
      },
      {
        title: "Scent boxes",
        description:
          "Compare fragrances side by side with a sample set. Ask the Dubai team about available samples and the scents you would like to include.",
        link: {
          label: "Enquire about scent boxes",
          href: "/contact/?division=aroma&brief=I%20would%20like%20to%20enquire%20about%20a%20scent%20box.",
        },
      },
      {
        title: "Candles, reeds & room sprays",
        description:
          "A reed diffuser brings fragrance to a bedside or reception desk. Candles and room sprays offer other ways to carry a scent through a guest room or spa.",
        link: {
          label: "See the scented formats",
          href: "https://globalaroma.me/candles-reed-diffusers-room-spray/",
        },
      },
    ],
  },
  {
    slug: "hospitality",
    index: "02",
    name: "Global Hospitality",
    imageAlt:
      "Illustrative guest room with folded sheets and a stack of textured towels.",
    discipline: "Guest experience & supplies",
    intro:
      "From the linen on a guest’s bed to the trolley outside the door, each detail has a job. Global Hospitality supplies the guest room, the dining room and the teams behind them.",
    heading: "Inside the guest experience.",
    briefPrompt:
      "Share the room count, the items you need and any materials or finishes already specified.",
    services: [
      {
        title: "Guest rooms",
        description:
          "Guest-room linen, electrical items and guest amenities make up the in-room collection. Bring your room schedule, quantities and finish preferences to an enquiry.",
      },
      {
        title: "Dining & banquets",
        description:
          "Food and beverage linen and banquet furniture serve restaurants, dining rooms and event spaces. Share table sizes, seating arrangements and how often the room changes use.",
      },
      {
        title: "Housekeeping & front office",
        description:
          "Housekeeping and front-office trolleys support room servicing and arrivals. Include service routes, storage space and lift dimensions when discussing your requirements.",
      },
    ],
  },
  {
    slug: "technology",
    index: "03",
    name: "Global Technology",
    imageAlt:
      "Illustrative digital display set into the ribbed wall of a quiet corridor.",
    discipline: "ICT & smart solutions",
    intro:
      "Connectivity, digital signage and integrated systems help people find their way and teams run a building. Global Technology brings these services together for business environments.",
    heading: "Systems for shared spaces.",
    briefPrompt:
      "Describe the site, the systems already in place and what your teams or visitors need to do.",
    services: [
      {
        title: "Digital signage",
        description:
          "Plan displays around what someone needs to know at reception, in a lobby or along a route. Screen locations and the type of information you share are a useful starting point.",
      },
      {
        title: "ICT & connectivity",
        description:
          "Discuss the network and communications requirements of the site. A floor plan, existing equipment list and overview of the spaces in use will help define the brief.",
      },
      {
        title: "Integration & support",
        description:
          "System integration, smart business solutions and ongoing support are part of the division’s remit. Identify the systems that need to work together and who will operate them.",
      },
    ],
  },
];
