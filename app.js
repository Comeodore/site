const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 80;
// process.env.PORT || 80

process.env.MONGODB_URI = 'mongodb+srv://vova:1q2w3e@cluster0-pkydx.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// process.env.MONGODB_URI
// mongodb://localhost:27017/

const db = mongoose.connection;

db.once('open', () => {
  console.log('connected to Mongodb');
});

db.on('error', (err) => {
  console.log(err);
});

const ap = express();

const Art = require('./models/art');

ap.set('views', path.join(__dirname, 'public'));
ap.set('view engine', 'pug');

// parse application/x-www-form-urlencoded
ap.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
ap.use(bodyParser.json());

ap.use(express.static(path.join(__dirname, 'pub')));


ap.get('/', (request, response) => {
// eslint-disable-next-line max-len
// response.end('<div><ul><li><a href="/">home</a></li><li><a href="/about">about</a></li></ul><h1>Home page</h1></div>');

  Art.find({}, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      response.render('index', {
        title: 'Articles',
        articles: res,
      });
    }
  });
});

const articles = require('./routes/articles');
const users = require('./routes/users');

ap.use('/articles', articles);
ap.use('/users', users);


ap.listen(PORT);
