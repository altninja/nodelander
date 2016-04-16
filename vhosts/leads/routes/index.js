'use strict';

var express = require('express');
var router = express.Router();

var pages = require('../config/pages.js');
var view = require('../../shared/helpers/view');

router.get('/', function(req, res, next) {
	var title = pages.index.title;
	var img = pages.index.img;
	view.build(req, res, pages.index.view, title, img);
});

router.get('/a', function(req, res, next) {
	var title = pages.a.title;
	var img = pages.a.img;
	view.build(req, res, pages.a.view, title, img);
});

router.get('/b', function(req, res, next) {
	var title = pages.b.title;
	var img = pages.b.img;
	view.build(req, res, pages.b.view, title, img);
});

module.exports = router;
