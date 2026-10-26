"use client";

import { useT } from "@/i18n/locale-provider";

interface CounterVideoProps {
  url?: string;
  /** Nom du capital ship du counter, pour le titre de la vidéo */
  name: string;
}

/** Extrait l'identifiant d'une vidéo YouTube (watch, youtu.be, shorts, embed) */
const getYoutubeId = (url: string) => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1) || null;
    if (parsed.searchParams.has("v")) return parsed.searchParams.get("v");
    const match = parsed.pathname.match(/^\/(?:shorts|embed|live)\/([^/?]+)/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
};

export const CounterVideo = ({ url, name }: CounterVideoProps) => {
  const { t } = useT();
  const videoId = url ? getYoutubeId(url) : null;

  if (!videoId) {
    return (
      <div className="relative flex aspect-video flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(-45deg,rgb(255_255_255/0.03)_0_12px,transparent_12px_24px),#050b16] text-[0.9rem] text-white/60">
        <span className="grid size-14 place-items-center rounded-full border-2 border-white/40 pl-1 text-[1.2rem]" aria-hidden="true">
          ▶
        </span>
        <span>{t("video.soon")}</span>
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-black">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        className="absolute inset-0 size-full border-0"
        title={t("counters.videoTitle", { name })}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
};
