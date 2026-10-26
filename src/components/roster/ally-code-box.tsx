"use client";

import { useEffect, useRef, useState } from "react";
import { formatAllyCode, normalizeAllyCode } from "@/lib/roster";
import { useLocale, useT } from "@/i18n/locale-provider";
import { locales, type Locale } from "@/i18n/messages";
import { useRoster } from "./roster-provider";
import styles from "./ally-code-box.module.css";

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
    <div className={styles.settings} ref={ref}>
      <button
        type="button"
        className={styles.gear}
        onClick={() => setOpen((value) => !value)}
        aria-label={t("settings.language")}
        aria-expanded={open}
        title={t("settings.language")}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M19.4 13a7.5 7.5 0 0 0 0-2l2.1-1.6-2-3.5-2.5 1a7.4 7.4 0 0 0-1.7-1L15 3.3h-4l-.4 2.6a7.4 7.4 0 0 0-1.7 1l-2.5-1-2 3.5L6.6 11a7.5 7.5 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-1a7.4 7.4 0 0 0 1.7 1l.4 2.6h4l.4-2.6a7.4 7.4 0 0 0 1.7-1l2.5 1 2-3.5zM13 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"
            transform="translate(-1 0)"
          />
        </svg>
      </button>
      {open && (
        <ul className={styles.menu} role="menu" aria-label={t("settings.language")}>
          {locales.map((value) => (
            <li key={value}>
              <button
                type="button"
                role="menuitemradio"
                aria-checked={locale === value}
                className={locale === value ? styles.selected : undefined}
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
    <div className={styles.box}>
      {roster ? (
        <>
          <div className={styles.player}>
            <span className={styles.playerName}>{roster.playerName}</span>
            <span className={styles.code}>
              {status === "loading" ? t("allyCode.updating") : formatAllyCode(roster.allyCode)}
            </span>
          </div>
          <button type="button" className={styles.clear} onClick={clear} aria-label={t("allyCode.change")}>
            ×
          </button>
        </>
      ) : (
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            if (code.length === 9) load(code);
          }}
        >
          <input
            className={styles.input}
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
          <button type="submit" className={styles.submit} disabled={code.length !== 9 || status === "loading"}>
            {status === "loading" ? "…" : t("allyCode.load")}
          </button>
        </form>
      )}
      <LanguageMenu />
      {error && (
        <button type="button" className={styles.error} onClick={dismissError} title={t("allyCode.close")}>
          {t(error.key, error.params)}
        </button>
      )}
    </div>
  );
};
