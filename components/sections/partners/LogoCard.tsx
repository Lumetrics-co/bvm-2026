interface LogoCardProps {
  src: string;
  alt: string;
  size?: "default" | "large" | "xlarge";
  /** Duplicate copies in a looping carousel are hidden from assistive tech. */
  decorative?: boolean;
}

export const CARD_WIDTH = { default: 200, large: 240, xlarge: 300 } as const;
const CARD_HEIGHT = { default: 120, large: 145, xlarge: 180 } as const;

export default function LogoCard({ src, alt, size = "default", decorative = false }: LogoCardProps) {
  const width = `${CARD_WIDTH[size]}px`;
  return (
    <div
      aria-hidden={decorative || undefined}
      style={{
        background: "#fff",
        borderRadius: "12px",
        border: "1px solid rgba(0,0,0,0.08)",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: width,
        maxWidth: width,
        height: `${CARD_HEIGHT[size]}px`,
        flexShrink: 0,
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
      }}
    >
      { }
      <img src={src} alt={decorative ? "" : alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </div>
  );
}
