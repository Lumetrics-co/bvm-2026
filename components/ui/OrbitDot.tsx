import type { CSSProperties } from "react";

export interface OrbitSpec {
  /** Orbit radius in px */
  r: number;
  /** Dot diameter in px */
  size: number;
  color: string;
  /** Seconds per revolution */
  dur: number;
  /** Starting angle in degrees */
  deg: number;
}

/**
 * A glowing dot circling a point. `anchor` positions the orbit centre inside the
 * nearest positioned ancestor (e.g. `{ top: "50%", right: "130px" }`).
 */
export default function OrbitDot({
  spec,
  anchor,
  reverse = false,
}: {
  spec: OrbitSpec;
  anchor: CSSProperties;
  reverse?: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        ...anchor,
        animation: `orbit-spin ${spec.dur}s linear infinite${reverse ? " reverse" : ""}`,
        animationDelay: `-${((spec.deg / 360) * spec.dur).toFixed(2)}s`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -spec.r,
          left: -spec.size / 2,
          width: spec.size,
          height: spec.size,
          borderRadius: "50%",
          background: spec.color,
          opacity: 0.75,
          boxShadow: `0 0 12px ${spec.color}, 0 0 24px ${spec.color}55`,
        }}
      />
    </div>
  );
}
