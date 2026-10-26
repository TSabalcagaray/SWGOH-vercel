# SWGOH Teams

Site de préparation de teams SWGOH (à la manière de swgoh.gg) : escouades, counters, vidéos…

## Pages

- `/` : page d'entrée en deux moitiés, Personnages / Vaisseaux
- `/personnages` : liste des personnages (à venir)
- `/vaisseaux` : liste des vaisseaux (à venir)

## Styles

Le site utilise [Tailwind CSS](https://tailwindcss.com) : les styles sont écrits directement dans les composants.
Les couleurs du site (`sith`, `jedi`, `starter`, `space`…) et les quelques effets réutilisés (`glow`, `text-glow`,
`relic-shape`, `accent-light` / `accent-dark`) sont définis dans `src/app/globals.css`.

## Visuels

Les fonds de la page d'entrée sont dans `public/images/` (`characters-bg.svg`, `ships-bg.svg`).
Pour utiliser tes propres images, remplace ces fichiers ou change les URL `bg-[url(...)]`
dans `src/components/split-home/split-home.tsx`.

## Développement

```bash
yarn install
yarn dev
```

Puis ouvre [http://localhost:3000](http://localhost:3000).
