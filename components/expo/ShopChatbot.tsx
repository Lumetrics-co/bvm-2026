"use client";

import { useEffect, useRef, useState } from "react";
import { fallbackAnswer, greeting, matchFaq, suggestedQuestions } from "@/lib/expo/chatbot";
import type { ExpoShop } from "@/lib/expo/data";

interface Message {
  from: "bot" | "user";
  text: string;
}

/** Scripted, keyword-matched FAQ bot scoped to a single shop. No network calls. */
export default function ShopChatbot({ shop }: { shop: ExpoShop }) {
  const [messages, setMessages] = useState<Message[]>(() => [{ from: "bot", text: greeting(shop) }]);
  const [draft, setDraft] = useState("");
  const logRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { from: "user", text: trimmed }]);
    const answer = matchFaq(shop, trimmed) ?? fallbackAnswer(shop);
    timers.current.push(setTimeout(() => setMessages((m) => [...m, { from: "bot", text: answer }]), 220));
  };

  return (
    <section aria-label={`${shop.name} chatbot`} className="flex max-h-[520px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-lg">
      <header className="flex items-center gap-2.5 border-b border-gray-200 p-3.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white" style={{ background: shop.color }}>
          {shop.icon}
        </span>
        <div>
          <p className="text-[15px] font-bold leading-tight">{shop.name} Bot</p>
          <p className="text-xs text-gray-500">Ask about the brand or products</p>
        </div>
      </header>

      <div ref={logRef} className="flex min-h-40 flex-1 flex-col gap-2.5 overflow-y-auto p-3.5" aria-live="polite">
        {messages.map((message, i) => (
          <p
            key={i}
            className={
              message.from === "bot"
                ? "max-w-[90%] self-start rounded-xl rounded-bl-sm bg-[#eef0f8] px-3 py-2 text-sm"
                : "max-w-[90%] self-end rounded-xl rounded-br-sm bg-magenta px-3 py-2 text-sm text-white"
            }
          >
            {message.text}
          </p>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 px-3.5 pb-2.5">
        {suggestedQuestions(shop).map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => send(question)}
            className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs hover:bg-[#eef0f8]"
          >
            {question}
          </button>
        ))}
      </div>

      <form
        className="flex gap-2 border-t border-gray-200 p-3"
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
          setDraft("");
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a question…"
          aria-label={`Ask the ${shop.name} bot a question`}
          className="min-w-0 flex-1 rounded-lg border border-gray-300 px-2.5 py-2 text-sm focus:border-magenta focus:outline-none focus:ring-2 focus:ring-magenta/30"
        />
        <button type="submit" className="rounded-lg bg-magenta px-3.5 py-2 text-sm font-semibold text-white hover:opacity-90">
          Send
        </button>
      </form>
    </section>
  );
}
