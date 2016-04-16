'use strict';

var general = require('../../shared/config/general.js');
var social = require('../../shared/config/social.js');

function build (req, res, view, title, img) {	
	var url = req.protocol + '://' + req.get('host') + req.originalUrl;
	var meta = {
		title: title,
		assetbase: general.assetbase.url,
	    seo_author: social.seo.author,
	    seo_description: social.seo.description,
	    seo_canonical: url,
	    twitter_card: social.twitter.card,
	    twitter_site: social.twitter.site,
	    twitter_creator: social.twitter.creator,
	    twitter_title: title,
	    twitter_description: social.twitter.description,
	    twitter_image_src: img,
	    facebook_og_url: url,
	    facebook_og_type: social.facebook.og_type,
	    facebook_og_title: title,
	    facebook_og_image: img,
	    facebook_og_description: social.facebook.og_description,
	    facebook_og_site_name: social.facebook.og_site_name,
	    google_name: social.google.name,
	    google_description: social.google.description,
	    google_image: img
	}
	res.render(view, meta);
}

module.exports = {
	build: build
};