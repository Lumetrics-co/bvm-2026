export const EVENT_DATE = new Date("2026-08-12T10:00:00+05:30");

export const CONTACT = {
  email: "contactus@bvm2026.com",
  phone: "+91 96677 51132",
  phone2: "+91 96677 51479",
} as const;

export const CALL_NUMBERS = [
  { display: "+91 96677 51132", tel: "+919667751132" },
  { display: "+91 96677 51479", tel: "+919667751479" },
] as const;

export const WHATSAPP_URL =
  "https://wa.me/919667751132?text=Hi%2C%20I%20am%20interested%20in%20participating%20in%20Bharatiya%20Vyapar%20Mahotsav%202026";

export const LINKS = {
  hotels: "https://www.easemytrip.com/collab/bvm/hotels.html?user=bvm",
  exhibitorLogin: "https://exhizone.bharatiyavyaparmahotsav.com/exhibitor-zone/exhi-manual.aspx",
  brochure: "/BVM_2026_Brochure.pdf",
} as const;

/** Home-page sections used by the header scroll-spy / smooth scroll. */
export const NAV_ITEMS = [
  { key: "about", href: "about" },
  { key: "zones", href: "zones" },
  { key: "sectors", href: "sectors" },
  { key: "whyBvm", href: "why-bvm" },
  { key: "mission", href: "objectives" },
  { key: "partners", href: "partners" },
  { key: "eventScale", href: "event-scale" },
  { key: "aboutOrganizer", href: "cait" },
  { key: "announcements", href: "announcements" },
] as const;

export type RegisterRole = "DELEGATE" | "VISITOR";

export const REGISTER_OPTIONS: { value: RegisterRole; key: "delegate" | "visitor" }[] = [
  { value: "DELEGATE", key: "delegate" },
  { value: "VISITOR", key: "visitor" },
];

/** Registrations are closed in the source site. Flip to true once forms are wired to a backend. */
export const REGISTRATION_OPEN = false;
