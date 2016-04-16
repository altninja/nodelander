'use strict';

var express = require('express');
var router = express.Router();

var pages = require('../config/pages.js');
var view = require('../../shared/helpers/view');

router.get('/', function(req, res, next) {
	var title = pages.index.title;
	var img = pages.index.img;
	view.build(req, res, 'index', title, img);
});

router.get('/about', function(req, res, next) {
	var title = pages.about.title;
	var img = pages.about.img;
	view.build(req, res, pages.about.view, title, img);
});

router.get('/contact', function(req, res, next) {
	var title = pages.contact.title;
	var img = pages.contact.img;
	view.build(req, res, pages.contact.view, title, img);
});


module.exports = router;
