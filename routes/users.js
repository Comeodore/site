const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

let User =  require('../models/user');

router.get('/register', function (req, res) {
    let er = '';
    if (req.query.login == 'error'){
        console.log('login incorrect');
        er = 'login incorrect'
    }
    res.render('register', {
        er:er
    })
});

router.post('/register', function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    if (password2 === password) {

        let newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password
        });


        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        res.redirect('/users/login')
                    }

                })
            })
        })
    } else {
        res.redirect('/users/register?login=error')
    }
});

router.get('/login', function (req, res) {
   res.render('login');

});
module.exports = router;
