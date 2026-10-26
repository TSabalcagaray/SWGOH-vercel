"use client";

import { useEffect, useRef, useState } from "react";
import { formatAllyCode, normalizeAllyCode } from "@/lib/roster";
import { useLocale, useT } from "@/i18n/locale-provider";
import { locales, type Locale } from "@/i18n/messages";
import { useRoster } from "./roster-provider";

const roundButtonClass =
  "grid size-[30px] cursor-pointer place-items-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/25";

const localeLabels: Record<Locale, string> = { fr: "Français", en: "English" };

/** Petite roue crantée pour choisir la langue */
const LanguageMenu = () => {
  const { locale, setLocale } = useLocale();
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Ferme le menu au clic en dehors
  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className={`${roundButtonClass} group`}
        onClick={() => setOpen((value) => !value)}
        aria-label={t("settings.language")}
        aria-expanded={open}
        title={t("settings.language")}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-[18px] transition-transform duration-400 group-hover:rotate-60 group-aria-expanded:rotate-60"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M19.4 13a7.5 7.5 0 0 0 0-2l2.1-1.6-2-3.5-2.5 1a7.4 7.4 0 0 0-1.7-1L15 3.3h-4l-.4 2.6a7.4 7.4 0 0 0-1.7 1l-2.5-1-2 3.5L6.6 11a7.5 7.5 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-1a7.4 7.4 0 0 0 1.7 1l.4 2.6h4l.4-2.6a7.4 7.4 0 0 0 1.7-1l2.5 1 2-3.5zM13 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"
            transform="translate(-1 0)"
          />
        </svg>
      </button>
      {open && (
        <ul
          className="absolute top-[calc(100%+10px)] right-0 min-w-[130px] rounded-xl border border-white/20 bg-space/95 p-1.5 shadow-[0_8px_24px_rgb(0_0_0/0.5)]"
          role="menu" aria-label={t("settings.language")}>
          {locales.map((value) => (
            <li key={value}>
              <button
                type="button"
                role="menuitemradio"
                aria-checked={locale === value}
                className={`w-full cursor-pointer rounded-lg px-3 py-2 text-left text-[0.85rem] hover:bg-white/10 ${
                  locale === value ? "font-bold text-jedi" : "text-white"
                }`}
                onClick={() => {
                  setLocale(value);
                  setOpen(false);
                }}
              >
                {localeLabels[value]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/** Boîte fixe en haut à droite pour saisir son code allié et choisir la langue */
export const AllyCodeBox = () => {
  const { roster, status, error, load, clear, dismissError } = useRoster();
  const { t } = useT();
  const [value, setValue] = useState("");
  const code = normalizeAllyCode(value);

  // Le message d'erreur disparaît tout seul au bout de 5 s
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(dismissError, 5000);
    return () => clearTimeout(timer);
  }, [error, dismissError]);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-space/70 py-1.5 pr-1.5 pl-3.5 text-white shadow-[0_4px_20px_rgb(0_0_0/0.4)] backdrop-blur-md">
      {roster ? (
        <>
          <div className="flex flex-col leading-[1.15]">
            <span className="text-[0.9rem] font-bold">{roster.playerName}</span>
            <span className="text-xs opacity-65">
              {status === "loading" ? t("allyCode.updating") : formatAllyCode(roster.allyCode)}
            </span>
          </div>
          <button type="button" className={`${roundButtonClass} text-[1.1rem] leading-none`} onClick={clear} aria-label={t("allyCode.change")}>
            ×
          </button>
        </>
      ) : (
        <form
          className="flex items-center gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            if (code.length === 9) load(code);
          }}
        >
          <input
            className="w-30 py-1.5 text-[0.9rem] tracking-[0.04em] outline-none placeholder:text-white/50 max-[400px]:w-23"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              dismissError();
            }}
            placeholder={t("allyCode.placeholder")}
            inputMode="numeric"
            autoComplete="off"
            aria-label={t("allyCode.placeholder")}
            maxLength={11}
          />
          <button
            type="submit"
            className="cursor-pointer rounded-full bg-jedi px-3.5 py-1.5 text-[0.85rem] font-semibold text-space transition-opacity disabled:cursor-default disabled:opacity-40 max-[400px]:px-2.5" disabled={code.length !== 9 || status === "loading"}>
            {status === "loading" ? "…" : t("allyCode.load")}
          </button>
        </form>
      )}
      <LanguageMenu />
      {error && (
        <button
          type="button"
          className="absolute top-[calc(100%+6px)] right-0 max-w-[260px] animate-toast-in cursor-pointer rounded-[10px] bg-[rgb(160_30_30/0.9)] px-3 py-1.5 text-left text-[0.8rem] text-white"
          onClick={dismissError} title={t("allyCode.close")}>
          {t(error.key, error.params)}
        </button>
      )}
    </div>
  );
};
