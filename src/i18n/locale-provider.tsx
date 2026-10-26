"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { locales, translate, type Locale, type MessageKey, type MessageParams } from "./messages";
import { unitName } from "./unit-names";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = "swgoh-teams:locale";

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && locales.includes(stored)) setLocaleState(stored);
    } catch {
      // Stockage indisponible : on reste en français
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Stockage indisponible : le choix ne vaut que pour cette visite
    }
  }, []);

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale doit être utilisé dans un LocaleProvider");
  return context;
};

/** Traductions pour les composants client */
export const useT = () => {
  const { locale } = useLocale();
  return {
    locale,
    t: (key: MessageKey, params?: MessageParams) => translate(locale, key, params),
    unit: (name: string) => unitName(name, locale),
  };
};

/** Texte traduit, utilisable depuis les composants serveur */
export const T = ({ k, params }: { k: MessageKey; params?: MessageParams }) => {
  const { t } = useT();
  return <>{t(k, params)}</>;
};

/** Nom d'unité traduit, utilisable depuis les composants serveur */
export const UnitName = ({ name }: { name: string }) => {
  const { unit } = useT();
  return <>{unit(name)}</>;
};

/** Met à jour le titre de l'onglet dans la langue choisie */
export const DocumentTitle = ({ k }: { k: MessageKey }) => {
  const { t } = useT();
  useEffect(() => {
    document.title = `${t(k)} · SWGOH Teams`;
  });
  return null;
};
