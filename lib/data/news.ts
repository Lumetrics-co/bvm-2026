export interface NewsItem {
  img: string;
  href: string;
  /** Overrides the default "Read Full Article" label. */
  cta?: string;
}

/** Order matches NewsArticlesSection.articles in messages/en.json. */
export const NEWS_ITEMS: NewsItem[] = [
  {
    img: "/images/news/piyush-goyal.png",
    href: "https://ddnews.gov.in/en/piyush-goyal-urges-cait-to-hold-biggest-ever-swadeshi-mela-with-itpo/",
  },
  {
    img: "/images/news/maiden-swadeshi-mela.jpg",
    href: "https://www.tribuneindia.com/news/delhi/maiden-bhartiya-swadeshi-mela-in-delhi-from-may-1-5/",
  },
  {
    img: "/images/news/swadeshi-expo.png",
    href: "https://news.abplive.com/cities/swadeshi-expo-2026-india-to-host-biggest-swadeshi-expo-at-delhi-pragati-maidan-date-details-ann-1814714",
  },
  {
    img: "/images/news/CAIT-organises.png",
    href: "https://economictimes.indiatimes.com/news/india/cait-to-organise-indias-largest-national-trade-expo-in-may/articleshow/126378283.cms",
  },
  {
    img: "/images/news/times-of-india.png",
    href: "https://timesofindia.indiatimes.com/business/india-business/piyush-goyal-asks-industry-to-identify-import-substitutes-pushes-local-manufacturing-to-cut-dependence/articleshow/131175198.cms",
  },
  { img: "/images/news/swadeshi-expo.png", href: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2262262&reg=3&lang=1" },
  { img: "/images/news/et-now.png", href: "https://x.com/etnowlive/status/2056350931328155724?s=48", cta: "View Post" },
  { img: "/images/news/cnbc-tv-18.png", href: "https://x.com/etnowlive/status/2056350931328155724?s=48", cta: "View Post" },
];
