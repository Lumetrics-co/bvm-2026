"use client";

import { useRef, useState } from "react";
import { X } from "lucide-react";
import { t } from "@/lib/i18n";
import { useDialogA11y } from "@/hooks/useDialogA11y";

const VIDEOS = [
  { id: "v1", videoId: "ceZz6OoB6cA" },
  { id: "v2", videoId: "ST79V3Xtqr0" },
  { id: "v3", videoId: "O23s3y_BlhY" },
  { id: "v4", videoId: "q4i_Uwyy_9Q" },
  { id: "v5", videoId: "RGB_6TUIFIA" },
  { id: "v6", videoId: "P75qAyCyMGk" },
] as const;

const FEATURED_VIDEO_ID = "ceZz6OoB6cA";
const PREVIEW_ALLOW = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

const previewUrl = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=0&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${id}`;

export default function VideoGallery() {
  const [active, setActive] = useState<{ videoId: string; title: string } | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const close = () => setActive(null);
  useDialogA11y(active !== null, close, dialogRef);

  const videos = VIDEOS.map((v, i) => ({ ...v, title: t(`YouTubeSection.videos.${i}.title`) }));
  const featured = videos.find((v) => v.videoId === FEATURED_VIDEO_ID) ?? videos[0];
  const loop = [...videos, ...videos];

  return (
    <>
      <section aria-label={t("YouTubeSection.ariaLabel")} className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="anim-hidden anim-slide-up anim-delay-1">
            <div
              className="rounded-3xl px-7 lg:px-10 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #EF7B20 0%, #c2185b 100%)",
                boxShadow: "0 20px 60px rgba(194,24,91,0.3), 0 8px 30px rgba(239,123,32,0.2)",
                height: "min(90vh, 640px)",
              }}
            >
              <div className="flex flex-col lg:flex-row gap-16 items-stretch h-full">
                <div className="w-full lg:w-[66.6666%] flex-shrink-0 flex items-center py-7 lg:py-10">
                  <div className="relative w-full rounded-2xl overflow-hidden bg-gray-900" style={{ aspectRatio: "16/9" }}>
                    <iframe
                      src={previewUrl(FEATURED_VIDEO_ID)}
                      allow={PREVIEW_ALLOW}
                      className="absolute inset-0 w-full h-full"
                      title={`${featured.title}${t("YouTubeSection.previewSuffix")}`}
                      style={{ pointerEvents: "none" }}
                      aria-hidden="true"
                    />
                    <button
                      type="button"
                      aria-label={t("YouTubeSection.playVideo", { title: featured.title })}
                      onClick={() => setActive({ videoId: featured.videoId, title: featured.title })}
                      className="absolute inset-0 cursor-pointer group focus:outline-none focus-visible:ring-4 focus-visible:ring-saffron rounded-2xl"
                    >
                      <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 group-focus-visible:bg-black/30 transition-colors duration-300" />
                      <span className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xs font-semibold bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                          {t("YouTubeSection.clickToWatch")}
                        </span>
                      </span>
                    </button>
                  </div>
                </div>

                <div className="w-full lg:flex-1 lg:min-w-0 overflow-hidden self-stretch">
                  <div className="overflow-hidden h-full">
                    <div className="yt-scroll-track">
                      {loop.map((video, i) => {
                        const duplicate = i >= videos.length;
                        return (
                          <div
                            key={`${video.id}-${i}`}
                            className="relative w-full overflow-hidden bg-gray-900"
                            style={{ height: "140px", marginBottom: "12px", flexShrink: 0 }}
                            aria-hidden={duplicate || undefined}
                          >
                            <iframe
                              src={previewUrl(video.videoId)}
                              allow={PREVIEW_ALLOW}
                              className="absolute inset-0 w-full h-full"
                              title={`${video.title}${t("YouTubeSection.previewSuffix")}`}
                              style={{ pointerEvents: "none" }}
                              tabIndex={-1}
                              loading="lazy"
                            />
                            <button
                              type="button"
                              tabIndex={duplicate ? -1 : 0}
                              aria-label={t("YouTubeSection.playVideo", { title: video.title })}
                              onClick={() => setActive({ videoId: video.videoId, title: video.title })}
                              className="absolute inset-0 cursor-pointer group/card focus:outline-none focus-visible:ring-4 focus-visible:ring-saffron"
                            >
                              <span className="absolute inset-0 bg-black/0 group-hover/card:bg-black/25 group-focus-visible/card:bg-black/35 transition-colors duration-200" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {active && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-10"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
          role="presentation"
          onClick={close}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={active.title || t("YouTubeSection.videoPlayer")}
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              <iframe
                src={`https://www.youtube.com/embed/${active.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                title={active.title || t("YouTubeSection.videoPlayer")}
              />
            </div>
            <button
              type="button"
              onClick={close}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
              aria-label={t("YouTubeSection.closeVideo")}
            >
              <X size={18} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
