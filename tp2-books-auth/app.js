require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const app = express();

// --- MongoDB ---
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tp2_auth';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch((err) => console.error('Erreur MongoDB:', err));

// --- Passport config ---
require('./config/passport')(passport);

// --- View engine ---
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// --- Middlewares ---
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'dev_secret_change_me',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Expose l'utilisateur courant à toutes les vues Pug
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// --- Données locales: livres ---
app.locals.books = [
  { title: 'Clean Code', author: 'Robert C. Martin', year: 2008 },
  { title: 'You Don\'t Know JS Yet', author: 'Kyle Simpson', year: 2020 },
  { title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', year: 2018 }
];

// --- Routes ---
const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');

app.use('/', authRoutes);
app.use('/', booksRoutes);

// Accueil
app.get('/', (req, res) => {
  res.render('index', { title: 'TP2 — Auth' });
});

// 404
app.use((req, res) => {
  res.status(404).render('index', { title: 'Page introuvable', notFound: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
