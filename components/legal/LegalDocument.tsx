import { Fragment } from "react";

export interface LegalSection {
  title: string;
  /** Paragraphs; lines beginning with "• " render as bullet lists. */
  content: string[];
}

/** Group consecutive "• " lines into a single list so they render as semantic <ul> markup. */
function groupLines(lines: string[]) {
  const groups: ({ type: "p"; text: string } | { type: "ul"; items: string[] })[] = [];
  for (const line of lines) {
    if (line.startsWith("• ")) {
      const last = groups[groups.length - 1];
      if (last?.type === "ul") last.items.push(line.slice(2));
      else groups.push({ type: "ul", items: [line.slice(2)] });
    } else {
      groups.push({ type: "p", text: line });
    }
  }
  return groups;
}

export default function LegalDocument({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
          <div className="space-y-3 text-[15px] leading-relaxed text-gray-700">
            {groupLines(section.content).map((group, i) => (
              <Fragment key={i}>
                {group.type === "p" ? (
                  <p>{group.text}</p>
                ) : (
                  <ul className="list-disc pl-6 space-y-1.5 marker:text-magenta">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </Fragment>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
