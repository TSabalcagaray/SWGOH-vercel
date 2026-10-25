import styles from "./counter-video.module.css";

interface CounterVideoProps {
  url?: string;
  title: string;
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

export const CounterVideo = ({ url, title }: CounterVideoProps) => {
  const videoId = url ? getYoutubeId(url) : null;

  if (!videoId) {
    return (
      <div className={`${styles.frame} ${styles.placeholder}`}>
        <span className={styles.play} aria-hidden="true">▶</span>
        <span>Vidéo à venir</span>
      </div>
    );
  }

  return (
    <div className={styles.frame}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
};
