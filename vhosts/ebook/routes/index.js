'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/a', function(req, res, next) {
	res.render('a');
});

router.get('/b', function(req, res, next) {
	res.render('b');
});

module.exports = router;
