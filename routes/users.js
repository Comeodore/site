const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user');

router.get('/register', (req, res) => {
  let er = '';
  if (req.query.login == 'error') {
    console.log('login incorrect');
    er = 'login incorrect';
  }
  res.render('register', {
    er,
  });
});

router.post('/register', (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { username } = req.body;
  const { password } = req.body;
  const { password2 } = req.body;

  if (password2 === password) {
    const newUser = new User({
      name,
      email,
      username,
      password,
    });


    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
        }
        newUser.password = hash;
        newUser.save((err) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect('/users/login');
          }
        });
      });
    });
  } else {
    res.redirect('/users/register?login=error');
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});
module.exports = router;
