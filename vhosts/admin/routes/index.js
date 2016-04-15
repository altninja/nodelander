'use strict';

var express = require('express');
var passport = require('passport');
var router = express.Router();

var Account = require('../models/account');

var assetbase = 'http://assets.nodelander.dev/';

router.get('/', function (req, res) {
    res.render('index', {
        user: req.user,
        assetbase: assetbase
    });
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/'
}), function (req, res) {
    if (req.user && req.user.role == 'admin') {
        res.redirect('/dashboard');
    } else {
        Account.findOneAndUpdate({
            email: req.body.email
        }, {
            $inc: {
                sessions: 1
            }
        }, function (err) {
            if (err) throw new Error(err);

            res.redirect('/dashboard');
        });
    }
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
