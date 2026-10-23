/**
 * Content for the 3D virtual expo. Everything the walkthrough shows (halls, shops, products,
 * chatbot answers) comes from this file, so swapping in real exhibitors only means editing data.
 * The brands below are fictional demo content.
 */

export interface ExpoSection {
  id: string;
  name: string;
  icon: string;
  color: string;
  blurb: string;
}

export interface ExpoProduct {
  id: string;
  name: string;
  price: string;
  shortDesc: string;
  description: string;
  specs: Record<string, string>;
}

export interface ExpoFaq {
  keywords: string[];
  answer: string;
}

export interface ExpoShop {
  id: string;
  sectionId: string;
  name: string;
  icon: string;
  color: string;
  tagline: string;
  about: string;
  founded: string;
  hq: string;
  products: ExpoProduct[];
  faqs: ExpoFaq[];
}

export const EXPO_EVENT = {
  "name": "Virtual Expo 2026",
  "tagline": "One map. Five worlds. Walk in, look around, ask a question."
} as const;

export const EXPO_SECTIONS: ExpoSection[] = [
  {
    "id": "automobiles",
    "name": "Automobiles",
    "icon": "🚗",
    "color": "#2563eb",
    "blurb": "Concept cars, everyday rides, and the garages that build them."
  },
  {
    "id": "art-craft",
    "name": "Art & Craft",
    "icon": "🎨",
    "color": "#c026d3",
    "blurb": "Handmade pieces, studio work, and the makers behind them."
  },
  {
    "id": "food",
    "name": "Food",
    "icon": "🍜",
    "color": "#ea580c",
    "blurb": "Kitchens, roasters, and pantries with something to taste."
  },
  {
    "id": "electronics",
    "name": "Electronics",
    "icon": "💡",
    "color": "#0891b2",
    "blurb": "Gadgets, components, and the labs pushing them forward."
  },
  {
    "id": "garments",
    "name": "Garments",
    "icon": "🧵",
    "color": "#16a34a",
    "blurb": "Fabric, thread, and the studios cutting new silhouettes."
  }
];

export const EXPO_SHOPS: ExpoShop[] = [
  {
    "id": "voltra-motors",
    "sectionId": "automobiles",
    "name": "Voltra Motors",
    "icon": "🚗",
    "color": "#2563eb",
    "tagline": "Electric, and unbothered about it.",
    "about": "Voltra Motors builds electric vehicles for people who don't want to talk about electric vehicles — just drive them. Founded in 2019, the brand focuses on long range, fast charging, and interiors that don't look like a spaceship.",
    "founded": "2019",
    "hq": "Pune, India",
    "products": [
      {
        "id": "voltra-arc",
        "name": "Arc GT",
        "price": "₹28,50,000",
        "shortDesc": "The long-range hatchback that started it all.",
        "description": "The Arc GT is Voltra's flagship hatchback: a 480km range, 0-100 in 6.8s, and a cabin built around a single curved display. Designed for daily driving, not showrooms.",
        "specs": {
          "Range": "480 km",
          "0-100 km/h": "6.8 s",
          "Charging (10-80%)": "22 min",
          "Seats": "5"
        }
      },
      {
        "id": "voltra-mono",
        "name": "Mono Runabout",
        "price": "₹14,90,000",
        "shortDesc": "A city-first EV built for tight streets.",
        "description": "Mono trades range for size — a compact runabout that turns in 9.4m, parks in anything, and still seats four adults without complaint.",
        "specs": {
          "Range": "260 km",
          "Turning radius": "9.4 m",
          "Seats": "4",
          "Boot": "310 L"
        }
      },
      {
        "id": "voltra-haul",
        "name": "Haul Pickup",
        "price": "₹32,00,000",
        "shortDesc": "An electric pickup for people who actually haul things.",
        "description": "1-tonne payload, a flat load bed, and a frunk big enough for a generator. Built for site visits, not Instagram.",
        "specs": {
          "Payload": "1,000 kg",
          "Range": "410 km",
          "Towing": "1,800 kg",
          "Drive": "AWD"
        }
      }
    ],
    "faqs": [
      {
        "keywords": [
          "range",
          "battery",
          "km",
          "distance"
        ],
        "answer": "Range varies by model: the Mono does about 260 km, the Arc GT does 480 km, and the Haul pickup does 410 km on a full charge."
      },
      {
        "keywords": [
          "charge",
          "charging",
          "fast charge"
        ],
        "answer": "All Voltra vehicles support fast charging — the Arc GT goes from 10% to 80% in about 22 minutes on a compatible fast charger."
      },
      {
        "keywords": [
          "price",
          "cost",
          "how much"
        ],
        "answer": "Prices start at ₹14,90,000 for the Mono Runabout and go up to ₹32,00,000 for the Haul Pickup. Ask me about a specific model for its exact price."
      },
      {
        "keywords": [
          "warranty",
          "guarantee"
        ],
        "answer": "Every Voltra comes with an 8-year / 1,60,000 km battery warranty and a 3-year bumper-to-bumper warranty."
      },
      {
        "keywords": [
          "test drive",
          "book",
          "booking"
        ],
        "answer": "You can book a test drive from any Voltra Motors showroom — this virtual booth doesn't take bookings directly, but I can tell you all about the cars!"
      },
      {
        "keywords": [
          "founded",
          "history",
          "about",
          "company"
        ],
        "answer": "Voltra Motors was founded in 2019 in Pune, India, with one goal: make EVs that feel normal to drive, not futuristic."
      }
    ]
  },
  {
    "id": "cragmont-classics",
    "sectionId": "automobiles",
    "name": "Cragmont Classics",
    "icon": "🏎️",
    "color": "#1d4ed8",
    "tagline": "Restored, not replaced.",
    "about": "Cragmont Classics restores vintage automobiles to factory-original condition, part by part, using period-correct materials wherever possible. Every car on this floor has a full restoration logbook.",
    "founded": "1994",
    "hq": "Coimbatore, India",
    "products": [
      {
        "id": "cragmont-falcon68",
        "name": "Falcon '68 Restoration",
        "price": "₹41,00,000",
        "shortDesc": "A 1968 roadster, restored bolt by bolt.",
        "description": "A full nut-and-bolt restoration of a 1968 roadster: rebuilt engine, reupholstered original-pattern seats, and a repaint in factory-matched lacquer.",
        "specs": {
          "Year": "1968",
          "Engine": "2.0L inline-4 (rebuilt)",
          "Restoration time": "14 months",
          "Logbook": "Included"
        }
      },
      {
        "id": "cragmont-derby",
        "name": "Derby Tourer",
        "price": "₹35,50,000",
        "shortDesc": "A 1970s tourer with its original interior intact.",
        "description": "Rare among restorations: the Derby Tourer kept over 70% of its original interior trim, refreshed rather than replaced.",
        "specs": {
          "Year": "1974",
          "Engine": "2.4L inline-6",
          "Interior": "70% original trim",
          "Mileage": "62,000 km"
        }
      },
      {
        "id": "cragmont-care-kit",
        "name": "Classic Care Kit",
        "price": "₹6,500",
        "shortDesc": "The maintenance kit Cragmont uses on every restoration.",
        "description": "The same waxes, leather conditioners, and touch-up paints Cragmont's own restoration bay uses, packaged for owners to take home.",
        "specs": {
          "Contents": "8 items",
          "Suitable for": "Vintage paint & leather",
          "Shelf life": "24 months"
        }
      }
    ],
    "faqs": [
      {
        "keywords": [
          "restore",
          "restoration",
          "process"
        ],
        "answer": "Every Cragmont restoration is a full nut-and-bolt teardown and rebuild — engine, body, and interior — documented in a logbook that comes with the car."
      },
      {
        "keywords": [
          "price",
          "cost",
          "how much"
        ],
        "answer": "Full restorations range from ₹35,50,000 to ₹41,00,000 depending on the car and condition. The Classic Care Kit is ₹6,500."
      },
      {
        "keywords": [
          "original",
          "authentic",
          "parts"
        ],
        "answer": "We use period-correct or original parts wherever they exist, and factory-matched replacements where they don't. Every car's parts sourcing is listed in its logbook."
      },
      {
        "keywords": [
          "time",
          "how long",
          "duration"
        ],
        "answer": "A full restoration typically takes 12 to 16 months depending on parts availability."
      },
      {
        "keywords": [
          "founded",
          "history",
          "about",
          "company"
        ],
        "answer": "Cragmont Classics has been restoring vintage cars in Coimbatore since 1994."
      }
    ]
  },
  {
    "id": "clayfolk-studio",
    "sectionId": "art-craft",
    "name": "Clayfolk Studio",
    "icon": "🏺",
    "color": "#a21caf",
    "tagline": "Wheel-thrown, wood-fired, one at a time.",
    "about": "Clayfolk Studio is a two-person pottery studio making wheel-thrown stoneware, fired in a wood kiln built by hand. No two pieces come out the same, and that's the point.",
    "founded": "2016",
    "hq": "Auroville, India",
    "products": [
      {
        "id": "clayfolk-mug-set",
        "name": "Ash-Glaze Mug Set (4)",
        "price": "₹3,200",
        "shortDesc": "Four wood-fired mugs, no two glazed alike.",
        "description": "Wood ash settles differently on every piece during firing, so each mug in this set of four carries a slightly different glaze pattern.",
        "specs": {
          "Material": "Stoneware",
          "Capacity": "300 ml each",
          "Dishwasher safe": "Yes",
          "Set size": "4"
        }
      },
      {
        "id": "clayfolk-vase",
        "name": "Riverline Vase",
        "price": "₹2,450",
        "shortDesc": "A tall wheel-thrown vase with a carved rim.",
        "description": "Hand-carved rim detailing over a wheel-thrown body, finished in a matte celadon glaze.",
        "specs": {
          "Height": "32 cm",
          "Material": "Stoneware",
          "Glaze": "Matte celadon"
        }
      },
      {
        "id": "clayfolk-plate-set",
        "name": "Everyday Plate Set (6)",
        "price": "₹4,800",
        "shortDesc": "Six dinner plates for daily use, not display.",
        "description": "Built thick enough for daily use and dishwasher cycles, glazed in a soft speckled white.",
        "specs": {
          "Diameter": "26 cm",
          "Set size": "6",
          "Microwave safe": "Yes"
        }
      }
    ],
    "faqs": [
      {
        "keywords": [
          "material",
          "made of",
          "clay"
        ],
        "answer": "Everything here is stoneware, wheel-thrown and fired in our hand-built wood kiln."
      },
      {
        "keywords": [
          "price",
          "cost",
          "how much"
        ],
        "answer": "Prices range from ₹2,450 for the Riverline Vase to ₹4,800 for the Everyday Plate Set."
      },
      {
        "keywords": [
          "dishwasher",
          "microwave",
          "care",
          "wash"
        ],
        "answer": "The mugs and plates are dishwasher and microwave safe. The vase is decorative and best hand-cleaned."
      },
      {
        "keywords": [
          "custom",
          "commission",
          "bespoke"
        ],
        "answer": "We do take small custom commissions — glaze color and size can often be adjusted, just ask about the piece you're interested in."
      },
      {
        "keywords": [
          "founded",
          "history",
          "about",
          "studio"
        ],
        "answer": "Clayfolk Studio has been working out of Auroville since 2016, run by two potters and one wood kiln."
      }
    ]
  },
  {
    "id": "loomline",
    "sectionId": "art-craft",
    "name": "Loomline",
    "icon": "🧶",
    "color": "#86198f",
    "tagline": "Handwoven textiles, traceable to the loom.",
    "about": "Loomline works with a collective of 40 weaver families to produce handwoven textile art — wall hangings, rugs, and throws — each tagged with the name of the weaver who made it.",
    "founded": "2020",
    "hq": "Bhuj, India",
    "products": [
      {
        "id": "loomline-wallhanging",
        "name": "Dune Wall Hanging",
        "price": "₹5,600",
        "shortDesc": "A handwoven wall piece in undyed cotton and wool.",
        "description": "Woven on a pit loom using undyed cotton warp and naturally dyed wool weft, in a gradient pattern inspired by desert dunes.",
        "specs": {
          "Size": "90 x 60 cm",
          "Material": "Cotton & wool",
          "Weaver": "Tagged on delivery"
        }
      },
      {
        "id": "loomline-rug",
        "name": "Kutch Flatweave Rug",
        "price": "₹9,200",
        "shortDesc": "A durable flatweave rug in traditional Kutch patterns.",
        "description": "A flatweave rug using traditional Kutch geometric motifs, woven for durability underfoot rather than display.",
        "specs": {
          "Size": "180 x 120 cm",
          "Material": "Wool",
          "Weave": "Flatweave"
        }
      },
      {
        "id": "loomline-throw",
        "name": "Two-Tone Throw",
        "price": "₹3,100",
        "shortDesc": "A soft cotton throw in a simple two-tone weave.",
        "description": "A lightweight everyday throw, woven in a simple two-tone pattern that works with most interiors.",
        "specs": {
          "Size": "150 x 130 cm",
          "Material": "Cotton",
          "Care": "Hand wash cold"
        }
      }
    ],
    "faqs": [
      {
        "keywords": [
          "who made",
          "weaver",
          "artisan",
          "maker"
        ],
        "answer": "Every Loomline piece is tagged with the name of the weaver who made it — we work with a collective of 40 weaver families in and around Bhuj."
      },
      {
        "keywords": [
          "price",
          "cost",
          "how much"
        ],
        "answer": "Prices range from ₹3,100 for the Two-Tone Throw to ₹9,200 for the Kutch Flatweave Rug."
      },
      {
        "keywords": [
          "material",
          "made of",
          "fabric"
        ],
        "answer": "We work mainly in cotton and wool, often undyed or naturally dyed."
      },
      {
        "keywords": [
          "care",
          "wash",
          "clean"
        ],
        "answer": "Rugs can be spot cleaned; throws and wall hangings should be hand washed in cold water to protect natural dyes."
      },
      {
        "keywords": [
          "founded",
          "history",
          "about",
          "company"
        ],
        "answer": "Loomline started in 2020 in Bhuj, working directly with weaver families instead of middlemen."
      }
    ]
  },
  {
    "id": "roast-theory",
    "sectionId": "food",
    "name": "Roast Theory",
    "icon": "☕",
    "color": "#c2410c",
    "tagline": "Single-origin coffee, roasted in small batches.",
    "about": "Roast Theory sources green coffee directly from small farms and roasts it in batches under 12kg, so every bag is close to the farm that grew it.",
    "founded": "2018",
    "hq": "Chikmagalur, India",
    "products": [
      {
        "id": "roast-ethiopia",
        "name": "Ethiopia Yirgacheffe (250g)",
        "price": "₹650",
        "shortDesc": "A light roast with floral, citrus notes.",
        "description": "A washed Yirgacheffe, roasted light to preserve its floral and citrus character. Best as a pour-over.",
        "specs": {
          "Roast": "Light",
          "Process": "Washed",
          "Weight": "250g",
          "Best for": "Pour-over"
        }
      },
      {
        "id": "roast-blend",
        "name": "House Espresso Blend (500g)",
        "price": "₹900",
        "shortDesc": "A balanced medium roast built for espresso.",
        "description": "A three-origin blend roasted medium-dark for a chocolatey, low-acid espresso shot.",
        "specs": {
          "Roast": "Medium-dark",
          "Origins": "3-origin blend",
          "Weight": "500g",
          "Best for": "Espresso"
        }
      },
      {
        "id": "roast-decaf",
        "name": "Sunrise Decaf (250g)",
        "price": "₹700",
        "shortDesc": "A Swiss-water decaf with full flavor.",
        "description": "Swiss-water processed to remove caffeine without solvents, roasted medium for a rounded, full-flavored decaf.",
        "specs": {
          "Roast": "Medium",
          "Process": "Swiss water decaf",
          "Weight": "250g"
        }
      }
    ],
    "faqs": [
      {
        "keywords": [
          "price",
          "cost",
          "how much"
        ],
        "answer": "Bags run from ₹650 for the Ethiopia Yirgacheffe to ₹900 for the House Espresso Blend."
      },
      {
        "keywords": [
          "decaf",
          "caffeine"
        ],
        "answer": "Yes — the Sunrise Decaf is Swiss-water processed, so it's decaffeinated without chemical solvents."
      },
      {
        "keywords": [
          "roast",
          "roasted",
          "fresh"
        ],
        "answer": "We roast in batches under 12kg and ship within a week of roasting — check the bag for the roast date."
      },
      {
        "keywords": [
          "origin",
          "farm",
          "source",
          "where"
        ],
        "answer": "Green coffee is sourced directly from small farms — the Yirgacheffe comes from Ethiopia, and the espresso blend combines three origins."
      },
      {
        "keywords": [
          "founded",
          "history",
          "about",
          "company"
        ],
        "answer": "Roast Theory has been roasting in Chikmagalur since 2018."
      }
    ]
  },
  {
    "id": "spice-anchor",
    "sectionId": "food",
    "name": "Spice Anchor",
    "icon": "🌶️",
    "color": "#b91c1c",
    "tagline": "Small-batch spice blends, ground weekly.",
    "about": "Spice Anchor grinds its spice blends weekly in small batches, sourcing whole spices from farmer cooperatives across South India.",
    "founded": "2021",
    "hq": "Kochi, India",
    "products": [
      {
        "id": "spice-garam-masala",
        "name": "Coastal Garam Masala (100g)",
        "price": "₹220",
        "shortDesc": "A warm, aromatic blend ground weekly.",
        "description": "A 9-spice blend roasted and ground fresh every week, balanced for both curries and marinades.",
        "specs": {
          "Weight": "100g",
          "Spice count": "9",
          "Ground": "Weekly batches"
        }
      },
      {
        "id": "spice-chili-flakes",
        "name": "Byadgi Chili Flakes (150g)",
        "price": "₹180",
        "shortDesc": "Mild-heat chili flakes with deep color.",
        "description": "Byadgi chilies, known for color over heat, coarsely flaked for finishing dishes.",
        "specs": {
          "Weight": "150g",
          "Heat level": "Mild-medium"
        }
      },
      {
        "id": "spice-pickle-mix",
        "name": "Malabar Pickle Spice Mix (200g)",
        "price": "₹260",
        "shortDesc": "The spice base for a classic Malabar-style pickle.",
        "description": "A ready spice mix for making Malabar-style pickle at home — just add oil, vinegar, and your vegetable of choice.",
        "specs": {
          "Weight": "200g",
          "Use": "Pickle base"
        }
      }
    ],
    "faqs": [
      {
        "keywords": [
          "price",
          "cost",
          "how much"
        ],
        "answer": "Prices range from ₹180 for the Chili Flakes to ₹260 for the Pickle Spice Mix."
      },
      {
        "keywords": [
          "fresh",
          "ground",
          "shelf life"
        ],
        "answer": "Spices are ground in small batches weekly, and stay fresh for about 6 months if kept airtight."
      },
      {
        "keywords": [
          "heat",
          "spicy",
          "hot"
        ],
        "answer": "The Byadgi Chili Flakes are mild-to-medium heat — more color than fire. The Garam Masala is aromatic, not spicy."
      },
      {
        "keywords": [
          "source",
          "farmer",
          "where",
          "origin"
        ],
        "answer": "We source whole spices directly from farmer cooperatives across South India."
      },
      {
        "keywords": [
          "founded",
          "history",
          "about",
          "company"
        ],
        "answer": "Spice Anchor started in Kochi in 2021."
      }
    ]
  },
  {
    "id": "nimbus-audio",
    "sectionId": "electronics",
    "name": "Nimbus Audio",
    "icon": "🎧",
    "color": "#0e7490",
    "tagline": "Headphones tuned by ear, not by spec sheet.",
    "about": "Nimbus Audio designs headphones and speakers in-house, tuned by a small team of audio engineers who listen to every batch before it ships.",
    "founded": "2015",
    "hq": "Bengaluru, India",
    "products": [
      {
        "id": "nimbus-aero",
        "name": "Aero ANC Headphones",
        "price": "₹12,999",
        "shortDesc": "Over-ear ANC headphones with 40-hour battery life.",
        "description": "Active noise cancellation tuned for consistent frequency response, with a 40-hour battery life and USB-C fast charging.",
        "specs": {
          "Battery": "40 hours",
          "ANC": "Yes",
          "Connectivity": "Bluetooth 5.3, USB-C",
          "Weight": "260g"
        }
      },
      {
        "id": "nimbus-puck",
        "name": "Puck Mini Speaker",
        "price": "₹3,499",
        "shortDesc": "A palm-sized speaker with surprising bass.",
        "description": "A compact Bluetooth speaker with a passive bass radiator that punches well above its size.",
        "specs": {
          "Battery": "12 hours",
          "Waterproof": "IPX6",
          "Weight": "310g"
        }
      },
      {
        "id": "nimbus-buds",
        "name": "Cirrus Earbuds",
        "price": "₹6,499",
        "shortDesc": "True wireless earbuds with adaptive ANC.",
        "description": "Adaptive ANC that adjusts to ambient noise levels, with a case that adds 3 extra charges on the go.",
        "specs": {
          "Battery": "6h (+18h case)",
          "ANC": "Adaptive",
          "Connectivity": "Bluetooth 5.3"
        }
      }
    ],
    "faqs": [
      {
        "keywords": [
          "price",
          "cost",
          "how much"
        ],
        "answer": "Prices range from ₹3,499 for the Puck Mini Speaker to ₹12,999 for the Aero ANC Headphones."
      },
      {
        "keywords": [
          "battery",
          "life",
          "how long"
        ],
        "answer": "The Aero headphones last 40 hours, the Cirrus earbuds last 6 hours (plus 18 more from the case), and the Puck speaker lasts 12 hours."
      },
      {
        "keywords": [
          "waterproof",
          "water resistant"
        ],
        "answer": "The Puck Mini Speaker is IPX6 rated. The Aero headphones and Cirrus earbuds are not designed for water exposure."
      },
      {
        "keywords": [
          "noise cancelling",
          "anc",
          "noise cancellation"
        ],
        "answer": "Both the Aero headphones and Cirrus earbuds have active noise cancellation — the Cirrus's is adaptive to ambient noise."
      },
      {
        "keywords": [
          "warranty",
          "guarantee"
        ],
        "answer": "All Nimbus Audio products carry a 1-year manufacturer warranty."
      },
      {
        "keywords": [
          "founded",
          "history",
          "about",
          "company"
        ],
        "answer": "Nimbus Audio has been designing audio gear in Bengaluru since 2015."
      }
    ]
  },
  {
    "id": "circuitworks",
    "sectionId": "electronics",
    "name": "CircuitWorks Lab",
    "icon": "🔧",
    "color": "#155e75",
    "tagline": "Open-hardware kits for people who like to build.",
    "about": "CircuitWorks Lab designs open-hardware electronics kits — schematics included — for hobbyists, students, and makerspaces.",
    "founded": "2017",
    "hq": "Hyderabad, India",
    "products": [
      {
        "id": "circuit-starter-kit",
        "name": "Microcontroller Starter Kit",
        "price": "₹1,899",
        "shortDesc": "Everything needed to start building with microcontrollers.",
        "description": "A beginner kit with a microcontroller board, breadboard, sensors, and a printed guide covering 12 starter projects.",
        "specs": {
          "Projects included": "12",
          "Board": "Included",
          "Skill level": "Beginner"
        }
      },
      {
        "id": "circuit-solder-station",
        "name": "Precision Solder Station",
        "price": "₹5,200",
        "shortDesc": "A temperature-controlled soldering station.",
        "description": "Digital temperature control from 200°C to 450°C, with a ceramic heating element for fast warm-up.",
        "specs": {
          "Temp range": "200-450°C",
          "Warm-up time": "~20s",
          "Power": "60W"
        }
      },
      {
        "id": "circuit-sensor-pack",
        "name": "Sensor Pack (12-in-1)",
        "price": "₹1,150",
        "shortDesc": "Twelve common sensors for prototyping.",
        "description": "Temperature, humidity, motion, light, and more — 12 breakout sensors compatible with most hobbyist boards.",
        "specs": {
          "Sensors": "12",
          "Compatibility": "Most hobbyist boards"
        }
      }
    ],
    "faqs": [
      {
        "keywords": [
          "price",
          "cost",
          "how much"
        ],
        "answer": "Prices range from ₹1,150 for the Sensor Pack to ₹5,200 for the Precision Solder Station."
      },
      {
        "keywords": [
          "beginner",
          "start",
          "new",
          "learn"
        ],
        "answer": "The Microcontroller Starter Kit is built for beginners — it includes 12 guided projects to learn from."
      },
      {
        "keywords": [
          "open source",
          "open hardware",
          "schematics"
        ],
        "answer": "Yes — all our kits ship with full open-hardware schematics, so you can modify or repair anything you build."
      },
      {
        "keywords": [
          "compatible",
          "compatibility",
          "works with"
        ],
        "answer": "The Sensor Pack works with most common hobbyist microcontroller boards. Ask a specific board name if you want to double check."
      },
      {
        "keywords": [
          "founded",
          "history",
          "about",
          "company"
        ],
        "answer": "CircuitWorks Lab has been building open-hardware kits in Hyderabad since 2017."
      }
    ]
  },
  {
    "id": "fieldstitch",
    "sectionId": "garments",
    "name": "Fieldstitch",
    "icon": "🧥",
    "color": "#15803d",
    "tagline": "Workwear cut for actual work.",
    "about": "Fieldstitch makes durable workwear — jackets, trousers, and shirts — reinforced at stress points and cut a little roomier than fashion brands dare to.",
    "founded": "2013",
    "hq": "Ludhiana, India",
    "products": [
      {
        "id": "fieldstitch-jacket",
        "name": "Canvas Work Jacket",
        "price": "₹4,200",
        "shortDesc": "A heavyweight canvas jacket with reinforced elbows.",
        "description": "12oz waxed canvas with double-stitched, reinforced elbows and four utility pockets rated for tools, not just phones.",
        "specs": {
          "Material": "12oz waxed canvas",
          "Sizes": "S-XXL",
          "Pockets": "4"
        }
      },
      {
        "id": "fieldstitch-trousers",
        "name": "Ripstop Cargo Trousers",
        "price": "₹2,600",
        "shortDesc": "Ripstop trousers with a gusseted crotch for movement.",
        "description": "Ripstop fabric with a gusseted crotch seam for a full range of movement, plus reinforced knee panels.",
        "specs": {
          "Material": "Ripstop cotton blend",
          "Sizes": "28-42",
          "Knee panels": "Reinforced"
        }
      },
      {
        "id": "fieldstitch-shirt",
        "name": "Twill Work Shirt",
        "price": "₹1,650",
        "shortDesc": "A breathable twill shirt built for long shifts.",
        "description": "Lightweight twill with underarm gussets for breathability during long shifts, and a chest pocket that actually closes.",
        "specs": {
          "Material": "Cotton twill",
          "Sizes": "S-XXL",
          "Closure": "Button-flap pocket"
        }
      }
    ],
    "faqs": [
      {
        "keywords": [
          "size",
          "sizing",
          "fit"
        ],
        "answer": "The Canvas Work Jacket runs S to XXL, trousers run waist 28 to 42, and shirts run S to XXL. All are cut roomier than typical fashion sizing for ease of movement."
      },
      {
        "keywords": [
          "price",
          "cost",
          "how much"
        ],
        "answer": "Prices range from ₹1,650 for the Twill Work Shirt to ₹4,200 for the Canvas Work Jacket."
      },
      {
        "keywords": [
          "material",
          "fabric",
          "made of"
        ],
        "answer": "We use 12oz waxed canvas for jackets, a ripstop cotton blend for trousers, and cotton twill for shirts."
      },
      {
        "keywords": [
          "durable",
          "durability",
          "tough",
          "reinforced"
        ],
        "answer": "Everything is reinforced at stress points — elbows on the jacket, knees on the trousers — because this line is built for actual work."
      },
      {
        "keywords": [
          "founded",
          "history",
          "about",
          "company"
        ],
        "answer": "Fieldstitch has been making workwear in Ludhiana since 2013."
      }
    ]
  },
  {
    "id": "linen-and-co",
    "sectionId": "garments",
    "name": "Linen & Co.",
    "icon": "👕",
    "color": "#166534",
    "tagline": "Linen for every season, not just summer.",
    "about": "Linen & Co. works exclusively in linen — lightweight for summer, heavier weaves for winter — arguing that linen deserves to be a year-round fabric, not a seasonal one.",
    "founded": "2019",
    "hq": "Jaipur, India",
    "products": [
      {
        "id": "linen-shirt",
        "name": "Everyday Linen Shirt",
        "price": "₹2,100",
        "shortDesc": "A lightweight linen shirt for warm weather.",
        "description": "Pre-washed linen for softness from day one, cut with a relaxed fit that doesn't cling in the heat.",
        "specs": {
          "Material": "100% linen",
          "Sizes": "XS-XL",
          "Fit": "Relaxed"
        }
      },
      {
        "id": "linen-dress",
        "name": "Wrap Midi Dress",
        "price": "₹3,400",
        "shortDesc": "A wrap-style midi dress in heavier linen.",
        "description": "A heavier mid-weight linen weave holds structure for a wrap silhouette without needing an underlayer.",
        "specs": {
          "Material": "100% linen (mid-weight)",
          "Sizes": "XS-XL",
          "Length": "Midi"
        }
      },
      {
        "id": "linen-scarf",
        "name": "Woven Linen Scarf",
        "price": "₹900",
        "shortDesc": "A lightweight scarf for cool evenings.",
        "description": "A finely woven linen scarf, light enough for summer evenings but warm enough for a light winter layer.",
        "specs": {
          "Material": "100% linen",
          "Size": "180 x 60 cm"
        }
      }
    ],
    "faqs": [
      {
        "keywords": [
          "size",
          "sizing",
          "fit"
        ],
        "answer": "Shirts and dresses run XS to XL with a relaxed fit. The scarf is one size."
      },
      {
        "keywords": [
          "price",
          "cost",
          "how much"
        ],
        "answer": "Prices range from ₹900 for the scarf to ₹3,400 for the Wrap Midi Dress."
      },
      {
        "keywords": [
          "material",
          "fabric",
          "made of"
        ],
        "answer": "Everything is 100% linen — lighter weight for shirts, mid-weight for the dress."
      },
      {
        "keywords": [
          "care",
          "wash",
          "iron"
        ],
        "answer": "Machine wash cold and hang dry. Linen wrinkles by nature — we consider that a feature, not a flaw."
      },
      {
        "keywords": [
          "winter",
          "summer",
          "season"
        ],
        "answer": "Our lighter weaves suit summer, and the mid-weight pieces like the Wrap Midi Dress work fine into cooler months too."
      },
      {
        "keywords": [
          "founded",
          "history",
          "about",
          "company"
        ],
        "answer": "Linen & Co. has been working exclusively in linen out of Jaipur since 2019."
      }
    ]
  }
];

export const getSection = (id: string) => EXPO_SECTIONS.find((s) => s.id === id);
export const getShop = (id: string) => EXPO_SHOPS.find((s) => s.id === id);
export const shopsInSection = (sectionId: string) => EXPO_SHOPS.filter((s) => s.sectionId === sectionId);
