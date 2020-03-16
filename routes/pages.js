const express = require('express');
const User = require('../core/user');
const router = express.Router();
const user = new User();

router.get('/', (req, res, next) => {
    let user = req.session.user;
    if (user) {
        res.render('homepage.ejs', { opp: req.session.opp, name: user.username });
    } else {
        res.render('homepage.ejs', { opp: 0, name: "User" })
    }


});
router.get('/loginpage', (req, res, next) => {
    res.render('login.ejs');
    let user = req.session.user;
});
router.get('/restdetails', (req, res, next) => {
    res.render('restaurant.ejs')
});
router.get('/help', (req, res, next) => {
    res.render('help.ejs')
});
router.post('/register', (req, res, next) => {
    let userInput = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    user.create(userInput, function(lastId) {
        if (lastId) {
            user.find(lastId, function(result) {

                req.session.user = result;
                req.session.opp = 0;
                res.redirect('/');
            });
        } else {
            console.log('Error creating a new user ...');
        }
    });
});
router.post('/login', (req, res, next) => {
    user.login(req.body.username, req.body.password, function(result) {
        if (result) {
            req.session.user = result;
            req.session.opp = 1;
            res.redirect('/');
        } else {
            res.send('Username/Password incorrect!');
        }
    })

});
module.exports = router;