'use strict';

var express = require('express');
var passport = require('passport');
var router = express.Router();

var Account = require('../models/account');
var Lead = require('../../shared/models/lead');
var assetbase = require('../../shared/config/general.js').assetbase.url;

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

router.get('/', function (req, res) {
    res.render('index', {
        assetbase: assetbase
    });
});

router.get('/login', function (req, res) {
    res.render('index', {
        assetbase: assetbase
    });
});

router.post('/login', 
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/'
    }), function (req, res) {
    console.log('hey')
    res.redirect('/dashboard', {
        assetbase: assetbase
    });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/dashboard', function (req, res, next) {
    Lead.find(function(err, leads) {
        if (err) throw new Error(err);
        leads.map(function (lead) {
            return {
                id: lead._id,
                email: lead.email,
                source: lead.source,
                domain: lead.domain
            };
        });
        res.render('dashboard', {
            user: req.user,
            leads: leads,
            assetbase: assetbase
        });
    });
});

module.exports = router;
