# TP2 — Authentification (Express, Pug, MongoDB, Passport, Tailwind)

## Démarrage rapide

1. **Prérequis**
   - Node.js 18+ et npm
   - MongoDB (local) ou un cluster MongoDB Atlas
2. **Installation**
   ```bash
   npm install
   cp .env.example .env
   # Éditez .env si nécessaire
   ```
3. **Lancer MongoDB**
   - Local: lancez `mongod` (ou le service MongoDB).
4. **Démarrer l'app**
   ```bash
   npm run dev  # avec nodemon
   # ou
   npm start
   ```
5. Ouvrez http://localhost:3000

## Fonctionnalités
- Inscription + connexion avec **Passport local** (email + mot de passe).
- Hash des mots de passe avec **bcrypt**.
- **MongoDB/Mongoose** pour persister les utilisateurs.
- **Pug** pour les vues, **Tailwind** via CDN pour le style.
- Page **/books** protégée (besoin d'être connecté).
- Les livres sont stockés dans une **variable locale** (pas en base).

## Structure
```
config/passport.js     # stratégie LocalStrategy
middleware/auth.js     # ensureAuthenticated
models/User.js
routes/auth.js         # /register, /login, /logout
routes/books.js        # /books (protégé)
views/*.pug            # layout + pages
app.js                 # app Express
```
