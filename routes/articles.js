const express = require('express');
const router = express.Router();

let Art = require('../models/art');

router.get('/add', function (req, res) {
    res.render('add_article', {
        title: 'Add article'
    })
});

router.post('/add', function (req, res) {
    let article = new Art;
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function (err) {
        if (err){
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }

    })
});

router.get('/edit/:id', function (req, res) {
    Art.findById(req.params.id, function (err, article) {
        res.render('edit_article', {
            article:article
        })
    })
});

router.post('/edit/:id', function (req, res) {
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id:req.params.id};

    Art.update(query, article, function (err) {
        if (err){
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    })
});

router.delete('/:id', function (req, res) {
    let query = {_id:req.params.id};

    Art.remove(query, function (err) {
        if (err){
            console.log(err);
        }
        res.send('Success')
    })
});

router.get('/:id', function (req, res) {
    Art.findById(req.params.id, function (err, ar) {
        res.render('article', {
            article: ar
        })
    })
});

module.exports = router;
