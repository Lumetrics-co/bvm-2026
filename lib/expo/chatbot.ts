import type { ExpoShop } from "./data";

/** Pick the FAQ whose keywords appear most often in the visitor's message. */
export function matchFaq(shop: ExpoShop, rawInput: string): string | null {
  const input = rawInput.toLowerCase();
  let best: string | null = null;
  let bestScore = 0;
  for (const faq of shop.faqs) {
    const score = faq.keywords.reduce((total, kw) => total + (input.includes(kw.toLowerCase()) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = faq.answer;
    }
  }
  return best;
}

export function fallbackAnswer(shop: ExpoShop): string {
  const topics = Array.from(new Set(shop.faqs.map((f) => f.keywords[0]))).slice(0, 4);
  return `I'm not sure about that one. Try asking me about ${topics.join(", ") || "price, materials, or the brand"}.`;
}

export function greeting(shop: ExpoShop): string {
  return `Hi! I'm the ${shop.name} bot. Ask me about the brand, or about price, materials, sizing, care — whatever's on your mind.`;
}

const PHRASING: Record<string, string> = {
  price: "What do things cost?",
  cost: "What do things cost?",
  "how much": "What do things cost?",
  range: "What's the range?",
  battery: "How's the battery life?",
  material: "What's it made of?",
  size: "What sizes are available?",
  sizing: "What sizes are available?",
  founded: "Tell me about the brand.",
  history: "Tell me about the brand.",
  about: "Tell me about the brand.",
  warranty: "Is there a warranty?",
  care: "How do I care for it?",
  source: "Where do you source from?",
  origin: "Where do you source from?",
  custom: "Do you take custom orders?",
  restore: "How does restoration work?",
};

/** Up to four natural-language quick replies derived from the shop's FAQ keywords. */
export function suggestedQuestions(shop: ExpoShop): string[] {
  const questions: string[] = [];
  for (const faq of shop.faqs) {
    if (questions.length >= 4) break;
    const key = faq.keywords.find((k) => PHRASING[k]);
    const question = key ? PHRASING[key] : null;
    if (question && !questions.includes(question)) questions.push(question);
  }
  return questions;
}
