# fall2024-webtech-202

## Description

Ce projet est une application de publication numérique développée dans le cadre du cours de technologie web pour l'ECE, visant à démontrer les compétences acquises durant le semestre. L'application permet aux utilisateurs de créer et partager des contenus tout en offrant une plateforme d'interaction communautaire inspirée de sites comme Medium ou Hacker News.

## Fonctionnalités

- **Authentification utilisateur** : Intégration OAuth2 avec un fournisseur externe.
- **Gestion de contenu** : Création, publication et stockage de publications via une base de données.
- **Interaction communautaire** : Possibilité pour les utilisateurs de commenter les publications.
- **Navigation intuitive** : Interface simple pour naviguer entre les publications et les commentaires.
- **Personnalisation des profils** : Gestion et personnalisation des profils utilisateurs.

## Installation

### Prérequis
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Compte [Supabase](https://supabase.com/)

### Étapes d'installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/JulesDias/fall2024-webtech-202.git

2. Accédez au dossier du projet :
   ```bash
   cd fall2024-webtech-202
3. Installez les dépendances :
   ```bash
   npm install
4. Démarrer l'application :
   ```bash
   npm run dev

## Utilisation

1. **Accédez à l'application** via [Vercel](https://fall2024-webtech-2022.vercel.app/) pour tester les fonctionnalités.
2. **Connexion utilisateur** : Utilisez l'authentification OAuth pour accéder aux fonctionnalités étendues.
3. **Gestion de contenu** : Publiez, commentez, et personnalisez votre profil via l'interface.

## Architecture du Projet

```plaintext
├── client/          # Frontend en Next.js
├── api/             # Backend en Node.js/Express
├── supabase/        # Configuration Docker Compose de Supabase
├── README.md
└── .gitignore       # Ignorer les fichiers globaux, DS_Store, etc.
```

## Technologies Utilisées

- **Next.js** - Framework pour le frontend
- **Node.js/Express** - API backend
- **Supabase** - Stockage des données et authentification
- **Tailwind CSS** - Framework CSS
- **OAuth2** - Authentification externe

## Contributeurs

- **Jules DIAS** - [GitHub](https://github.com/julesdias) - [LinkedIn](https://www.linkedin.com/in/jules-dias-2347bb24b/)
- **Arthur BERRET** - [GitHub](https://github.com/Atlas002) - [LinkedIn](https://www.linkedin.com/in/arthur-berret-b0aa411a5/)
