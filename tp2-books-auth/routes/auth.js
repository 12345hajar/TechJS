const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');

// GET /register
router.get('/register', (req, res) => {
  res.render('register', { title: 'Inscription' });
});

// POST /register
router.post('/register', async (req, res) => {
  const { name, email, password, password2 } = req.body;
  const errors = [];

  if (!name || !email || !password || !password2) {
    errors.push('Tous les champs sont obligatoires.');
  }
  if (password && password.length < 6) {
    errors.push('Le mot de passe doit contenir au moins 6 caractères.');
  }
  if (password !== password2) {
    errors.push('Les mots de passe ne correspondent pas.');
  }

  try {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      errors.push('Un compte existe déjà avec cet email.');
    }
  } catch (err) {
    errors.push('Erreur lors de la vérification de l\'email.');
  }

  if (errors.length) {
    return res.status(400).render('register', {
      title: 'Inscription',
      errors,
      values: { name, email }
    });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hash
    });
    await user.save();
    return res.redirect('/login?registered=1');
  } catch (err) {
    console.error(err);
    return res.status(500).render('register', { title: 'Inscription', errors: ['Erreur serveur. Réessayez.'] });
  }
});

// GET /login
router.get('/login', (req, res) => {
  const messages = req.session.messages || [];
  req.session.messages = [];
  const { registered } = req.query;
  res.render('login', { title: 'Connexion', messages, registered });
});

// POST /login
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/books',
    failureRedirect: '/login',
    failureMessage: 'Email ou mot de passe invalide.'
  })
);

// GET /logout
router.get('/logout', (req, res, next) => {
  
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

module.exports = router;
