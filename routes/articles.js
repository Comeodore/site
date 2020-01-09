const express = require('express');

const router = express.Router();

const Art = require('../models/art');

router.post('/add', (req, res) => {
  const article = new Art();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

router.get('/edit/:id', (req, res) => {
  Art.findById(req.params.id, (err, article) => {
    res.render('edit_article', {
      article,
    });
  });
});

router.post('/edit/:id', (req, res) => {
  const article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  const query = { _id: req.params.id };

  Art.update(query, article, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

router.delete('/:id', (req, res) => {
  const query = { _id: req.params.id };

  Art.remove(query, (err) => {
    if (err) {
      console.log(err);
    }
    res.send('Success');
  });
});

router.get('/:id', (req, res) => {
  Art.findById(req.params.id, (err, ar) => {
    res.render('article', {
      article: ar,
    });
  });
});

module.exports = router;
