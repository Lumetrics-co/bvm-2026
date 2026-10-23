interface SectionHeadingProps {
  badge: string;
  line1: string;
  line2: string;
  /** Spacing class for the badge row. */
  badgeClassName?: string;
}

/** Eyebrow badge + two-line shimmer heading + ornamental divider used by most home sections. */
export default function SectionHeading({ badge, line1, line2, badgeClassName = "mb-4" }: SectionHeadingProps) {
  return (
    <div className="text-center">
      <div className="anim-hidden anim-slide-up">
        <div className={`inline-flex items-center gap-2 ${badgeClassName}`}>
          <div className="h-px w-8" style={{ background: "linear-gradient(to right, transparent, #c2185b)" }} />
          <span className="text-[10px] uppercase tracking-[0.35em] font-bold" style={{ color: "#e84393" }}>
            {badge}
          </span>
          <div className="h-px w-8" style={{ background: "linear-gradient(to left, transparent, #ef7b20)" }} />
        </div>
      </div>
      <div className="anim-hidden anim-slide-up anim-delay-1">
        <h2 className="font-bold leading-[1.05] tracking-tight text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem]">
          <span style={{ color: "#1a0a02" }}>{line1}</span>
          <br />
          <span className="section-heading-shimmer">{line2}</span>
        </h2>
      </div>
      <div className="anim-hidden anim-fade anim-delay-2">
        <div className="flex items-center justify-center gap-3 mt-5 mb-8">
          <div className="h-px w-24" style={{ background: "linear-gradient(to right, transparent, rgba(194,24,91,0.7))" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#ef7b20", boxShadow: "0 0 8px #ef7b20" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#c2185b", boxShadow: "0 0 10px #c2185b" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#ef7b20", boxShadow: "0 0 8px #ef7b20" }} />
          <div className="h-px w-24" style={{ background: "linear-gradient(to left, transparent, rgba(239,123,32,0.7))" }} />
        </div>
      </div>
    </div>
  );
}
