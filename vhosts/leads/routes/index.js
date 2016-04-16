'use strict';

var express = require('express');
var router = express.Router();

var general = require('../../shared/config/sample-general.js');
var social = require('../../shared/config/sample-social.js');

var layout = {
	assetbase: general.assetbase.url,
    seo_author: social.seo.author,
    seo_description: social.seo.description,
    seo_canonical: social.seo.canonical,
    twitter_card: social.twitter.card,
    twitter_site: social.twitter.site,
    twitter_creator: social.twitter.creator,
    twitter_title: social.twitter.title,
    twitter_description: social.twitter.description,
    twitter_image_src: general.assetbase.url + "images/1.jpg",
    facebook_og_url: social.facebook.og_url,
    facebook_og_type: social.facebook.og_type,
    facebook_og_title: social.facebook.og_type,
    facebook_og_image: general.assetbase.url + "images/1.jpg",
    facebook_og_description: social.facebook.og_description,
    facebook_og_site_name: social.facebook.og_site_name,
    google_name: social.google.name,
    google_description: social.google.description,
    google_image: general.assetbase.url + "images/1.jpg"
}

router.get('/', function(req, res, next) {
	res.render('index', layout);
});

router.get('/a', function(req, res, next) {
	res.render('a', {
        assetbase: general.assetbase.url,
        social: social
    });
});

router.get('/b', function(req, res, next) {
	res.render('b', {
        assetbase: general.assetbase.url,
        social: social
    });
});

module.exports = router;
