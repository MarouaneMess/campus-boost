# Campus Boost

**Investissez dans les talents de demain.**

Application Next.js de présentation du projet de sept étudiants de l’UFR Mathématiques et Informatique de l’Université Paris Cité. MATCH met en relation huit secteurs et des compétences documentées ; le simulateur illustre des budgets pédagogiques ; `/demo` propose un parcours guidé en sept étapes.

**Projet développé localement. Aucun déploiement, enregistrement de site distant ou envoi de source n’a été effectué.**

## Installation et lancement

Prérequis : **Node.js 22.18+ ou 24 LTS**, npm et un navigateur récent. Node 24 a été utilisé pour la vérification.

Depuis le dossier parent `campus boost`, dans PowerShell :

```powershell
cd "C:\Users\marou\Desktop\M1\S1\campus boost\campus_boost"
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000). La démonstration est disponible sur [http://localhost:3000/demo](http://localhost:3000/demo).

Pour reproduire exactement les dépendances verrouillées sur une autre machine, utiliser `npm ci` à la place de `npm install`. Aucune clé API, compte, base de données ou service payant n’est nécessaire. L’installation initiale des paquets requiert Internet ; l’application utilise ensuite uniquement ses fichiers locaux, hors liens officiels explicitement ouverts.

Pour une présentation avec le build de production, arrêter le serveur de développement avec `Ctrl+C`, puis :

```powershell
npm run build
npm start
```

Ces commandes compilent et démarrent un serveur **sur votre ordinateur** ; elles ne déploient rien. Pour changer de port : `npm run dev -- --port 3001` ou `npm start -- --port 3001`.

## Structure

```text
src/
  app/                     Pages App Router, métadonnées, erreurs
    demo/                  Parcours de présentation guidé
    sources/               Sources officielles et méthode de matching
    mentions-legales/      Informations transparentes sur le prototype
  components/
    3d/                    Scène Three.js, alternative SVG, gestion des capacités
    demo/                  Étapes interactives et préparation hors ligne
    impact/                Simulateur, catégories et illustrations d’équipements
    layout/                Navigation et pied de page
    match/                 Sélecteur de secteur, besoins et fiches de formations
    ...                    Sections éditoriales, composants UI et animations
  data/                    Secteurs, formations, compétences, projets, configuration
  lib/                     Calculs purs : matching et simulation
  styles/globals.css       Design system, styles responsive et accessibilité
  types/content.ts         Types stricts des contenus
public/
  brand/                   Logo fourni, variantes optimisées, favicon, palette
  images/                  Affiche vectorielle de la future vidéo
  videos/                  Emplacement des futurs fichiers MP4 et VTT
  sw.js                    Cache local limité à la démonstration
logo/CampusBoost_logo.png   Original fourni, conservé intact
scripts/prepare-brand.mjs   Reproduction des variantes du logo
tests/                     Tests métier et parcours navigateur
```

Stack : Next.js App Router, React, TypeScript strict, Tailwind CSS 4, Motion, Three.js, React Three Fiber, Drei et Lucide React. Les polices DM Sans et Instrument Serif sont embarquées via Fontsource ; aucun appel à Google Fonts. Les dessins SVG et les objets 3D sont créés en code.

## Fonctionnement de MATCH

1. L’entreprise sélectionne un secteur parmi les huit de `src/data/sectors.ts`.
2. Les besoins de ce secteur sont présélectionnés ; chacun peut être désactivé ou réactivé.
3. Chaque besoin renvoie à des identifiants de compétences documentés dans `src/data/skills.ts`.
4. `src/lib/matching.ts` retient les formations ayant au moins une compétence commune. Il trie par nombre de domaines communs, puis par identifiant pour les ex æquo.
5. L’interface affiche les domaines concernés, les fiches officielles et une idée de projet pédagogique du secteur.

Il s’agit d’une **mise en relation éditoriale explicable**, sans score prédictif ou API d’IA. Aucun besoin n’est attribué à une entreprise réelle. Une sélection vide affiche une explication et permet de reprendre la sélection. Les cinq maillons entreprise → besoins → compétences → formations → projets restent lisibles en HTML, indépendamment de WebGL.

Le catalogue complet propose également une recherche insensible aux accents et un filtre par discipline. Les liens vers les projets supplémentaires rendent le projet ciblé visible même si la liste est repliée.

## Contenu institutionnel et éligibilité

Références consultées le **17 novembre 2026** :

- [Page Entreprises de l’UFR](https://math-info.u-paris.fr/entreprises/) : références de l’université, campagne 2026 et cinq masters MIAGE, IAD, DCI, RSA, VMI.
- [Plaquette officielle des formations éligibles 2026](https://formationcontinue.u-paris.fr/wp-content/uploads/sites/50/2026/04/Plaquette-formations-%C3%A9ligibles-%C3%A0-la-TA-2026.pdf), page 11 : IMB, MMAS et MVA également référencés sous l’UFR Maths-Info.
- Fiches de formation de l’UFR et catalogue ODF, liés directement depuis chaque fiche.
- [SOLTéA](https://www.soltea.education.gouv.fr/), [guide employeur](https://www.soltea.education.gouv.fr/espace-public/node/1864) et [conditions d’utilisation](https://www.soltea.education.gouv.fr/espace-public/conditions-generales-utilisation-taxe-apprentissage).

Les statuts sont dans `src/data/programs.ts` : `ufr-listed`, `university-listed`, `to-check`. Ils décrivent **la source et l’année**, sans promettre une habilitation permanente. La L3 MIAGE comporte une précision de rattachement à l’IUT Paris – Rives de Seine ; le M2 MVA une précision de partenariat et de pilotage ENS Paris-Saclay. Aucun code RNCP potentiellement obsolète n’est affiché.

L’UAI `0755976N` et le SIRET `13002573700011` ont été vérifiés sur la page Entreprises. Ils sont centralisés dans `src/data/site.ts`, avec leur source et la date de vérification. Ils identifient l’université : il faut ensuite choisir la bonne composante ou formation dans SOLTéA. Le calendrier de répartition 2027 n’est pas inventé ; la note de campagne indique la clôture 2026 et renvoie au calendrier officiel.

Avant de mettre à jour une campagne, revérifier ces informations, les badges et les dates. `/sources` présente la méthode et les limites directement aux visiteurs.

## Simulateur d’impact

Les quatre équipements et prix illustratifs sont définis dans `src/data/impact.ts`. Les valeurs sont **des estimations sans devis**, et non des prix de marché certifiés. La quantité est `floor(budget / prix unitaire)` ; le reste est affiché. Le montant est borné entre 0 et 100 000 €, avec un curseur rapide jusqu’à 10 000 € et cinq boutons de montant.

Chaque équipement est une **alternative indépendante**, pas un panier additionnable. Le montant saisi ne calcule pas le solde réel de l’entreprise. L’entreprise ne peut pas réserver un matériel ni affecter directement sa taxe à un équipement. L’établissement décide de l’utilisation réelle des fonds. Ces limites sont affichées dans le simulateur.

Toutes les idées d’investissement et de projets sont signalées « Proposition à valider avec l’UFR ». Aucun achat, montant collecté, résultat ou partenariat réalisé n’a été inventé.

## Personnaliser le contenu

| Contenu                                        | Fichier                    |
| ---------------------------------------------- | -------------------------- |
| Secteurs, besoins et projet relié              | `src/data/sectors.ts`      |
| Compétences et descriptions                    | `src/data/skills.ts`       |
| Formations, liens, rattachements et sources    | `src/data/programs.ts`     |
| Huit projets pédagogiques illustratifs         | `src/data/projects.ts`     |
| Six catégories, équipements et prix estimatifs | `src/data/impact.ts`       |
| Témoignages futurs                             | `src/data/testimonials.ts` |
| Étapes d’affectation                           | `src/data/soltea.ts`       |
| Références UAI/SIRET, dates et vidéo           | `src/data/site.ts`         |

Ne pas modifier uniquement une fiche visible : garder cohérents les domaines de compétences, les sources et les statuts. Les tests métier vérifient notamment la cohérence des identifiants.

### Témoignages

Les trois cartes actuelles sont des **emplacements de démonstration**, sans personne inventée ni fausse citation. Pour publier un témoignage autorisé, renseigner `name`, `quote`, `consentDate` et passer `status` à `approved`. Ajouter éventuellement `photo` ou `video` avec un chemin local. Le composant n’affiche une citation réelle que si l’accord et les champs indispensables sont présents.

### Vidéo

Déposer un MP4 autorisé et des sous-titres WebVTT dans `public/videos/`. Renseigner `video.src`, `video.subtitles`, `video.poster` et `video.title` dans `src/data/site.ts`. Le lecteur HTML utilise les contrôles natifs, `preload="metadata"`, un poster local et une piste de sous-titres. Si le fichier manque ou échoue au chargement, un état explicite est affiché. Le bouton de lecture décoratif de l’état « à venir » n’est pas un faux bouton fonctionnel.

## Logo et design system

Le fichier original se trouve dans `logo/CampusBoost_logo.png` et reste inchangé. L’analyse des pixels opaques confirme surtout du **bleu marine et du fuchsia**, et non les couleurs supposées dans le brief. La palette dominante et les bornes de la marge transparente sont enregistrées dans `public/brand/palette.json`.

Le script `npm run prepare:brand` retire uniquement la marge transparente, conserve le dessin et ses proportions, et génère un WebP sans perte et des icônes PNG. Le logo est réutilisé dans la navigation, le footer et le favicon ; aucun logo universitaire n’a été inventé. Le nom de l’université est simplement composé en texte.

Tokens principaux dans `src/styles/globals.css` : marine `#0b2146`, fuchsia `#b60055`, papier `#faf9f6`. Les styles spécifiques complètent les utilitaires Tailwind pour conserver une mise en page cohérente.

## Animation 3D et accessibilité

`network-scene.tsx` utilise Three.js, React Three Fiber, les lignes de Drei et des étiquettes dessinées localement sur des sprites. Le réseau tourne lentement, réagit légèrement au pointeur et relie les cinq maillons du matching ; la sélection modifie les connexions éclairées. Three.js est fixé à la version 0.182.0, compatible avec l’horloge de React Three Fiber 9 sans avertissement de dépréciation. Le ratio de pixels est plafonné à 1,5 et aucune texture ou police distante n’est chargée.

`network-visual.tsx` charge la scène dynamiquement et seulement dans la zone visible. Une version SVG est privilégiée si :

- `prefers-reduced-motion` est actif ;
- WebGL 2 est indisponible ou rencontre une erreur ;
- le navigateur indique un mode d’économie de données, une mémoire de 4 Go ou moins, ou deux cœurs ou moins ;
- le visiteur met l’animation en pause.

La scène est suspendue hors écran et lorsque l’onglet est masqué. La détection matérielle dépend des informations exposées par le navigateur ; le bouton Pause reste accessible. MATCH fonctionne en HTML même sans 3D. Les animations de contenu respectent le mouvement réduit. Les titres, boutons, états `aria-pressed`, messages de résultat, liens d’évitement et contrôles mobiles sont utilisables au clavier.

## Démonstration et fonctionnement hors ligne

Le parcours `/demo` comporte sept étapes : introduction → secteur → besoins → compétences → projet → simulation → SOLTéA. Choisir Aviation pour le scénario conseillé. La progression reste manuelle pour que la présentation puisse être commentée. Le bouton « Recommencer la démonstration » remet le parcours, les choix et la simulation à zéro.

La démo utilise un réseau SVG et des imports locaux, pour éviter que la 3D ralentisse la présentation. Deux usages hors ligne sont possibles :

1. **Sans Internet, serveur local actif** : après l’installation, `npm run dev` ou `npm start` sert tous les fichiers depuis l’ordinateur. Les liens externes sont les seules fonctionnalités qui requièrent Internet.
2. **Sans accès au serveur après préparation** : lancer `npm run build`, puis `npm start`, ouvrir `/demo` et attendre **« Démo prête hors ligne »**. Le service worker enregistre la page et ses ressources locales. La route peut alors être rechargée et les sept étapes parcourues hors ligne, sur la même origine (même nom d’hôte et même port).

Le cache ne contient aucun montant saisi ni profil d’entreprise. Il peut être supprimé dans les données de site du navigateur. Le service worker n’est enregistré qu’en production, sur localhost ou HTTPS. Après une modification du code, reconstruire et ouvrir la démo en ligne pour préparer la nouvelle version ; incrémenter `CACHE` dans `public/sw.js` en cas d’évolution du format du cache. La navigation vers d’autres pages n’est pas promise hors serveur.

## Vérifications

```powershell
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

- ESLint refuse les avertissements.
- TypeScript est strict.
- Les tests Node vérifient les données, le matching ciblé, l’absence de résultat sans besoin, les statuts et les bornes de budget.
- Playwright vérifie les huit secteurs, les filtres, les simulations, le parcours guidé hors ligne après rechargement, le menu au clavier, les largeurs 320/390/768/1440 px et l’alternative sans WebGL.
- Un test WebGL vérifie le rendu, la pause/reprise, la perte de contexte et l’absence d’appels externes ou d’avertissements de rendu.
- Axe vérifie les règles WCAG A/AA sur les vues testées. Cela ne constitue pas une certification globale d’accessibilité.

Sous Windows, les tests utilisent Microsoft Edge installé. Sur une machine sans navigateur compatible, lancer `npx playwright install chromium` puis adapter `channel` dans `playwright.config.ts` (retirer `msedge`). Le serveur de production est démarré et arrêté automatiquement par Playwright si aucun serveur n’est déjà disponible au port 3000. Les captures locales se trouvent dans `.local/` et les rapports d’échec dans `test-results/`, tous deux ignorés par Git.

## Informations à compléter avant publication

La publication reste à votre initiative. Les informations réelles de l’éditeur et de l’hébergeur doivent être renseignées dans `/mentions-legales`, les références de campagne doivent être revérifiées et les contenus définitifs validés avec l’UFR. Les métadonnées gardent `robots: noindex, nofollow` pour ce prototype ; modifier ce choix uniquement pour une version publique validée.

Il n’y a volontairement ni paiement, ni compte, ni formulaire de contact non fonctionnel. Le site n’utilise pas de statistiques de collecte, de classement ou de témoignages inventés.
