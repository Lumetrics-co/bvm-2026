"use client";

import { useState } from "react";
import { BookOpen, CalendarClock, Clock, Earth, MapPin, type LucideIcon } from "lucide-react";
import { t, tRaw } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import SectionHeading from "@/components/ui/SectionHeading";

interface Session {
  time: string;
  heading?: string;
  title: string;
  venue?: string;
}
interface Card {
  sessions: Session[];
}
interface Group {
  heading: string;
  icon?: string;
  cards: Card[];
}
interface Day {
  label: string;
  date: string;
  groups: Group[];
}

const GROUP_ICONS: Record<string, LucideIcon> = { sessions: BookOpen, dialogue: Earth };

/** Consecutive sessions without a heading belong to the previous heading's block. */
function blocksOf(sessions: Session[]) {
  const blocks: { heading?: string; rows: Session[] }[] = [];
  for (const session of sessions) {
    const last = blocks[blocks.length - 1];
    if (!session.heading && last) last.rows.push(session);
    else blocks.push({ heading: session.heading, rows: [session] });
  }
  return blocks;
}

export default function Agenda() {
  const days = tRaw<Day[]>("AgendaSection.days");
  const [activeDay, setActiveDay] = useState(0);
  const day = days[activeDay];

  return (
    <section
      id="agenda"
      aria-label={t("AgendaSection.ariaLabel")}
      className="relative overflow-hidden bg-gray-50 py-16 sm:py-20 lg:py-24 border-t border-gray-100"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="agenda-glow agenda-glow-1" />
        <div className="agenda-glow agenda-glow-2" />
        <div className="agenda-glow agenda-glow-3" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <SectionHeading
          badge={t("AgendaSection.badge")}
          line1={t("AgendaSection.headingLine1")}
          line2={t("AgendaSection.headingLine2")}
        />

        <div className="anim-hidden anim-slide-up flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-14">
          {days.map((d, i) => (
            <button
              key={d.label}
              type="button"
              onClick={() => setActiveDay(i)}
              aria-pressed={i === activeDay}
              className={cn("agenda-tab", i === activeDay && "agenda-tab-active")}
            >
              <span className="agenda-tab-number">{i + 1}</span>
              <span className="agenda-tab-text">
                <span className="agenda-tab-label">{d.label}</span>
                {d.date && <span className="agenda-tab-date">{d.date}</span>}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-14 sm:gap-16">
          {day?.groups.map((group, g) => {
            const Icon = GROUP_ICONS[group.icon ?? ""] ?? CalendarClock;
            return (
              <div key={`${activeDay}-${g}`}>
                <div className="anim-hidden anim-slide-up flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 text-center">
                  <div className="flex items-center gap-3 sm:contents">
                    <div
                      className="hidden sm:block h-px flex-1 max-w-16 sm:max-w-24"
                      style={{ background: "linear-gradient(to right, transparent, #c2185b)" }}
                    />
                    <div className="agenda-group-icon">
                      <Icon className="w-4.5 h-4.5" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="agenda-group-heading">{group.heading}</h3>
                  <div
                    className="hidden sm:block h-px flex-1 max-w-16 sm:max-w-24"
                    style={{ background: "linear-gradient(to left, transparent, #ef7b20)" }}
                  />
                </div>
                <div className="flex flex-col gap-6">
                  {group.cards.map((card, c) => (
                    <div key={c} className={cn("anim-hidden anim-slide-up agenda-card", `anim-delay-${Math.min(c + 1, 4)}`)}>
                      {blocksOf(card.sessions).map((block, b) => (
                        <div key={b} className={cn(b > 0 && "mt-5")}>
                          {block.heading && <h4 className="agenda-card-title">{block.heading}</h4>}
                          <div className="flex flex-col">
                            {block.rows.map((row, r) => (
                              <div key={r} className={cn("agenda-row", r !== block.rows.length - 1 && "agenda-row-divider")}>
                                <span className="agenda-row-time">
                                  <Clock className="w-3 h-3" aria-hidden="true" />
                                  {row.time}
                                </span>
                                <span className="agenda-row-title">{row.title}</span>
                                {row.venue && (
                                  <span className="agenda-row-venue">
                                    <MapPin className="w-3 h-3" aria-hidden="true" />
                                    {row.venue}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
