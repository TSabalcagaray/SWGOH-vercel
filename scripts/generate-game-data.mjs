#!/usr/bin/env node
/**
 * Génère src/data/generated/game-data.json à partir de swgoh-comlink :
 * toutes les unités jouables avec leurs noms (anglais et français), leur image,
 * l'équipage de chaque vaisseau, leurs catégories (factions, rôles) et leur camp.
 *
 * Prérequis : comlink lancé en local (voir docs/game-data.md), puis :
 *   yarn gamedata
 *   COMLINK_URL=http://localhost:3200 yarn gamedata   (adresse par défaut)
 *
 * Aucune dépendance : Node 20+ suffit (fetch intégré).
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const COMLINK_URL = (process.env.COMLINK_URL ?? "http://localhost:3200").replace(/\/$/, "");
const OUTPUT = resolve(dirname(fileURLToPath(import.meta.url)), "../src/data/generated/game-data.json");

/** Fichiers de traduction du jeu à extraire */
const LANGUAGES = { en: "Loc_ENG_US.txt", fr: "Loc_FRE_FR.txt" };

const ALIGNMENTS = { 1: "neutral", 2: "light", 3: "dark" };

const log = (message) => console.log(`• ${message}`);

const post = async (path, body) => {
  let response;
  try {
    response = await fetch(`${COMLINK_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (error) {
    throw new Error(
      `Impossible de joindre comlink sur ${COMLINK_URL}. Est-il bien lancé ? (voir docs/game-data.md)\n  ${error.message}`,
    );
  }
  if (!response.ok) {
    throw new Error(`comlink ${path} a répondu ${response.status} : ${(await response.text()).slice(0, 300)}`);
  }
  return response.json();
};

/** Lit un fichier de traduction du jeu (lignes « CLÉ|Texte ») */
const parseLocalization = (content) => {
  const entries = new Map();
  for (const line of content.split("\n")) {
    if (!line || line.startsWith("#")) continue;
    const separator = line.indexOf("|");
    if (separator === -1) continue;
    entries.set(line.slice(0, separator), line.slice(separator + 1).replace(/\\n/g, "\n").trim());
  }
  return entries;
};

/** Retire les balises de couleur du jeu, ex. « [c][FFFF33]Texte[-][/c] » */
const cleanText = (text) => text?.replace(/\[\/?c\]|\[[0-9a-fA-F]{6}\]|\[-\]/g, "").trim();

/** Les données du jeu sont découpées en segments : on les parcourt jusqu'à trouver les collections voulues */
const fetchGameData = async (version, wanted) => {
  const found = {};
  for (let segment = 1; segment <= 4 && wanted.some((key) => !found[key]); segment += 1) {
    log(`Données du jeu : segment ${segment}…`);
    const data = await post("/data", {
      payload: { version, includePveUnits: false, requestSegment: segment },
      enums: false,
    });
    for (const key of wanted) {
      if (Array.isArray(data[key]) && data[key].length > 0) found[key] = data[key];
    }
  }
  return found;
};

const main = async () => {
  log(`comlink : ${COMLINK_URL}`);
  const metadata = await post("/metadata", {});
  const gameVersion = metadata.latestGamedataVersion;
  const localizationVersion = metadata.latestLocalizationBundleVersion;
  if (!gameVersion || !localizationVersion) {
    throw new Error(`Réponse /metadata inattendue : ${JSON.stringify(metadata).slice(0, 300)}`);
  }
  log(`Version des données : ${gameVersion}`);
  log(`Version des traductions : ${localizationVersion}`);

  const { units = [], category = [] } = await fetchGameData(gameVersion, ["units", "category"]);
  if (units.length === 0) throw new Error("Aucune unité trouvée dans les données du jeu.");
  log(`${units.length} définitions d'unités reçues`);

  log("Traductions…");
  const bundle = await post("/localization", { payload: { id: localizationVersion }, unzip: true, enums: false });
  const translations = Object.fromEntries(
    Object.entries(LANGUAGES).map(([language, file]) => {
      if (typeof bundle[file] !== "string") {
        throw new Error(`Fichier de traduction ${file} absent. Fichiers reçus : ${Object.keys(bundle).join(", ")}`);
      }
      return [language, parseLocalization(bundle[file])];
    }),
  );
  const translate = (key) =>
    Object.fromEntries(
      Object.keys(LANGUAGES).map((language) => [language, cleanText(translations[language].get(key)) ?? null]),
    );

  // Une même unité apparaît une fois par niveau d'étoiles : on garde une seule entrée par baseId
  const byBaseId = new Map();
  for (const unit of units) {
    if (!unit.obtainable || !unit.baseId) continue;
    const previous = byBaseId.get(unit.baseId);
    if (!previous || (unit.rarity ?? 0) > (previous.rarity ?? 0)) byBaseId.set(unit.baseId, unit);
  }

  const result = [...byBaseId.values()]
    .map((unit) => {
      const categories = unit.categoryId ?? [];
      return {
        baseId: unit.baseId,
        type: unit.combatType === 2 ? "ship" : "character",
        name: translate(unit.nameKey),
        image: unit.thumbnailName ?? null,
        alignment: ALIGNMENTS[unit.forceAlignment] ?? "neutral",
        capitalShip: categories.includes("role_capital"),
        crew: (unit.crew ?? []).map((member) => member.unitId).filter(Boolean),
        categories,
      };
    })
    .filter((unit) => unit.name.en)
    .sort((a, b) => a.name.en.localeCompare(b.name.en));

  // Catégories visibles (factions, rôles…) avec leurs noms traduits
  const usedCategories = new Set(result.flatMap((unit) => unit.categories));
  const categories = category
    .filter((entry) => entry.visible && usedCategories.has(entry.id))
    .map((entry) => ({ id: entry.id, name: translate(entry.descKey) }))
    .filter((entry) => entry.name.en)
    .sort((a, b) => a.id.localeCompare(b.id));

  const output = {
    generatedAt: new Date().toISOString(),
    gameVersion,
    localizationVersion,
    units: result,
    categories,
  };

  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, `${JSON.stringify(output, null, 2)}\n`);

  const ships = result.filter((unit) => unit.type === "ship");
  const missingFrench = result.filter((unit) => !unit.name.fr).length;
  console.log("");
  log(`${result.length} unités : ${result.length - ships.length} personnages, ${ships.length} vaisseaux`);
  log(`${ships.filter((unit) => unit.capitalShip).length} capital ships`);
  log(`${ships.filter((unit) => unit.crew.length > 0).length} vaisseaux avec équipage`);
  log(`${categories.length} catégories`);
  if (missingFrench) log(`${missingFrench} unités sans nom français`);
  console.log(`\n✅ Fichier généré : ${OUTPUT}`);
};

main().catch((error) => {
  console.error(`\n❌ ${error.message}`);
  process.exit(1);
});
