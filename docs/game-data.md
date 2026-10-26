# Générer les données du jeu

L'outil `scripts/generate-game-data.mjs` récupère les données officielles du jeu via
[swgoh-comlink](https://github.com/swgoh-utils/swgoh-comlink) et écrit
`src/data/generated/game-data.json` :

- toutes les unités jouables (personnages et vaisseaux), avec leur identifiant du jeu (`baseId`) ;
- leurs noms officiels en anglais et en français ;
- l'image de chaque unité (`tex.charui_…`) ;
- l'équipage de chaque vaisseau ;
- leurs catégories (factions, rôles) avec leurs noms traduits, et leur camp (lumineux / obscur).

## 1. Lancer comlink

Il faut [Docker](https://www.docker.com/products/docker-desktop/). Dans un terminal :

```bash
docker run --name swgoh-comlink -d -p 3200:3000 -e APP_NAME=swgoh-teams ghcr.io/swgoh-utils/swgoh-comlink:latest
```

Attends une dizaine de secondes qu'il démarre. Pour vérifier qu'il répond :

```bash
curl -X POST http://localhost:3200/metadata -H "Content-Type: application/json" -d "{}"
```

## 2. Générer le fichier

À la racine du projet :

```bash
yarn gamedata
```

Le résumé affiche le nombre d'unités, de capital ships et de vaisseaux avec équipage.
Si comlink tourne sur une autre adresse : `COMLINK_URL=http://localhost:1234 yarn gamedata`.

## 3. Envoyer le résultat

Commit et pousse `src/data/generated/game-data.json` (ou envoie-le à Claude).
À relancer après une mise à jour du jeu qui ajoute des unités.

## Arrêter comlink

```bash
docker stop swgoh-comlink     # pour le relancer plus tard : docker start swgoh-comlink
```
