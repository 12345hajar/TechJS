const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');

// GET /books (protégé)
router.get('/books', ensureAuthenticated, (req, res) => {
  const books = req.app.locals.books || [];
  res.render('books', { title: 'Livres', books });
});

module.exports = router;
