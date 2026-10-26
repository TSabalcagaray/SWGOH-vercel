"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { normalizeAllyCode, type Roster } from "@/lib/roster";
import type { MessageKey, MessageParams } from "@/i18n/messages";
import { swgohGgPlayerUrl, toRoster, type SwgohGgPlayer } from "@/lib/swgoh-gg";

type Status = "idle" | "loading" | "ready" | "error";

export interface RosterErrorInfo {
  key: MessageKey;
  params?: MessageParams;
}

interface RosterContextValue {
  roster: Roster | null;
  status: Status;
  error: RosterErrorInfo | null;
  load: (allyCode: string) => Promise<void>;
  clear: () => void;
  dismissError: () => void;
}

const RosterContext = createContext<RosterContextValue | null>(null);

const STORAGE_KEY = "swgoh-teams:roster";
/** Le roster mis de côté dans le navigateur est rechargé au-delà d'une heure */
const MAX_AGE_MS = 60 * 60 * 1000;

interface StoredRoster {
  savedAt: number;
  roster: Roster;
}

const readStored = (): StoredRoster | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredRoster) : null;
  } catch {
    return null;
  }
};

const writeStored = (roster: Roster | null) => {
  try {
    if (roster) localStorage.setItem(STORAGE_KEY, JSON.stringify({ savedAt: Date.now(), roster }));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Stockage indisponible (navigation privée…) : on garde le roster en mémoire seulement
  }
};

class RosterError extends Error {
  constructor(readonly info: RosterErrorInfo) {
    super(info.key);
  }
}

/**
 * swgoh.gg bloque les requêtes venant des serveurs de Vercel (403) : le navigateur du visiteur
 * l'interroge donc directement, et on ne passe par notre route /api/player qu'en secours.
 */
const fetchRoster = async (code: string): Promise<Roster> => {
  const direct = await fetch(swgohGgPlayerUrl(code)).catch(() => null);
  if (direct?.status === 404) throw new RosterError({ key: "allyCode.notFound" });
  if (direct?.ok) return toRoster(code, (await direct.json()) as SwgohGgPlayer);

  const response = await fetch(`/api/player/${code}`);
  const body = await response.json();
  if (!response.ok) {
    throw new RosterError({ key: body.error ?? "allyCode.failed", params: { status: body.status ?? response.status } });
  }
  return body as Roster;
};

export const RosterProvider = ({ children }: { children: React.ReactNode }) => {
  const [roster, setRoster] = useState<Roster | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<RosterErrorInfo | null>(null);

  const load = useCallback(async (allyCode: string) => {
    const code = normalizeAllyCode(allyCode);
    setStatus("loading");
    setError(null);
    try {
      const loaded = await fetchRoster(code);
      setRoster(loaded);
      writeStored(loaded);
      setStatus("ready");
    } catch (err) {
      setError(err instanceof RosterError ? err.info : { key: "allyCode.failed" });
      setStatus("error");
    }
  }, []);

  const clear = useCallback(() => {
    setRoster(null);
    setStatus("idle");
    setError(null);
    writeStored(null);
  }, []);

  const dismissError = useCallback(() => setError(null), []);

  useEffect(() => {
    const stored = readStored();
    if (!stored) return;
    setRoster(stored.roster);
    setStatus("ready");
    if (Date.now() - stored.savedAt > MAX_AGE_MS) load(stored.roster.allyCode);
  }, [load]);

  return (
    <RosterContext.Provider value={{ roster, status, error, load, clear, dismissError }}>
      {children}
    </RosterContext.Provider>
  );
};

export const useRoster = () => {
  const context = useContext(RosterContext);
  if (!context) throw new Error("useRoster doit être utilisé dans un RosterProvider");
  return context;
};
