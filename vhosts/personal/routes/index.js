'use strict';

var express = require('express');
var router = express.Router();

var assetbase = require('../../shared/config/secrets.js').assetbase;

router.get('/', function(req, res, next) {
	res.render('index', {
        assetbase: assetbase.url
    });
});

router.get('/a', function(req, res, next) {
	res.render('a', {
        assetbase: assetbase.url
    });
});

router.get('/b', function(req, res, next) {
	res.render('b', {
        assetbase: assetbase.url
    });
});

module.exports = router;
