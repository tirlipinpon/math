# Jeu de Mathématiques

## Description

Un jeu éducatif de mathématiques interactif développé en JavaScript pour apprendre les mathématiques de manière ludique.

## Fonctionnalités

- **4 Catégories mathématiques** :

  - ➕ Opérations de base (addition, soustraction, multiplication, division)
  - 🧩 Résolution de problèmes (problèmes concrets et situationnels)
  - 🔢 Manipulation des nombres (ordre, valeur de position, nombres jusqu'à plusieurs milliers)
  - 🧠 Activités logiques (raisonnement, suites logiques, classification, énigmes)

- **3 Types de questions** :

  - QCM (Questionnaire à Choix Multiples)
  - Vrai/Faux
  - Réponse libre (nombre ou mot)

- **Système de progression** :

  - Connexion utilisateur avec sauvegarde automatique
  - Suivi des questions répondues par catégorie
  - Statistiques de progression

- **Interface moderne et intuitive** :
  - Design responsive adapté aux différents écrans
  - Gestion des sons activable/désactivable
  - Animations et célébrations lors des bonnes réponses

## Installation

1. Cloner le repository
2. Ouvrir `index.html` dans un navigateur web

Aucune installation supplémentaire n'est requise, le jeu fonctionne entièrement côté client.

## Structure du projet

```
math/
├── css/
│   └── style.css          # Styles de l'application
├── js/
│   ├── data.js            # Données des questions (75 questions)
│   ├── categories.js      # Définition des catégories
│   ├── game.js            # Orchestrateur principal du jeu
│   ├── questionManager.js # Gestion de la logique des questions
│   ├── uiManager.js       # Gestion de l'interface utilisateur
│   ├── inputHandler.js    # Gestion des réponses utilisateur
│   ├── userManager.js     # Gestion des utilisateurs et sauvegarde
│   └── soundManager.js    # Gestion des sons
├── sounds/
│   └── README.md          # Documentation des sons
├── index.html             # Page principale
└── README.md              # Ce fichier
```

## Utilisation

1. Ouvrir le jeu dans un navigateur
2. Se connecter avec un nom d'utilisateur (pour sauvegarder la progression)
3. Choisir une catégorie ou laisser "Toutes" pour un mélange
4. Répondre aux questions selon leur type (cliquer sur une option ou taper la réponse)
5. La progression est sauvegardée automatiquement

## Version

Version actuelle : **3.0.0** (Jeu de Mathématiques)

## Technologies utilisées

- HTML5
- CSS3
- JavaScript (ES6+)
- LocalStorage (via cookies) pour la sauvegarde

## Auteurs

Projet éducatif développé pour l'apprentissage des mathématiques.
