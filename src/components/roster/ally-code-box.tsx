"use client";

import { useEffect, useState } from "react";
import { formatAllyCode, normalizeAllyCode } from "@/lib/roster";
import { useRoster } from "./roster-provider";
import styles from "./ally-code-box.module.css";

/** Boîte fixe en haut à droite pour saisir son code allié */
export const AllyCodeBox = () => {
  const { roster, status, error, load, clear, dismissError } = useRoster();
  const [value, setValue] = useState("");
  const code = normalizeAllyCode(value);

  // Le message d'erreur disparaît tout seul au bout de 5 s
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(dismissError, 5000);
    return () => clearTimeout(timer);
  }, [error, dismissError]);

  if (roster) {
    return (
      <div className={styles.box}>
        <div className={styles.player}>
          <span className={styles.playerName}>{roster.playerName}</span>
          <span className={styles.code}>
            {status === "loading" ? "Mise à jour…" : formatAllyCode(roster.allyCode)}
          </span>
        </div>
        <button type="button" className={styles.clear} onClick={clear} aria-label="Changer de code allié">
          ×
        </button>
      </div>
    );
  }

  return (
    <form
      className={styles.box}
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
        placeholder="Code allié"
        inputMode="numeric"
        autoComplete="off"
        aria-label="Code allié"
        maxLength={11}
      />
      <button type="submit" className={styles.submit} disabled={code.length !== 9 || status === "loading"}>
        {status === "loading" ? "…" : "Charger"}
      </button>
      {error && (
        <button type="button" className={styles.error} onClick={dismissError} title="Fermer">
          {error}
        </button>
      )}
    </form>
  );
};
