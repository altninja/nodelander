'use strict';

var assetbase = require('./general.js').assetbase.url;

// See FB OG Docs for more info - https://developers.facebook.com/docs/reference/opengraph/

var obj = {};

obj = {
    seo: {
        author: 'Nodelander',
        description: 'Default meta description for your nodelander pages',
        canonical: "http://nodelander.com"
    },
    twitter: {
        card: 'summary_large_image',
        site: '@nodelander',
        creator: 'Nodelander',
        title: "Nodelander",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper nulla nec sapien sollicitudin, id vestibulum ex luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image_src: assetbase + "images/1.jpg"
    },
    facebook: {
        og_url: "http://nodelander.com",
        og_type: "business.business",
        og_title: "Nodelander",
        og_image: assetbase + "images/1.jpg",
        og_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper nulla nec sapien sollicitudin, id vestibulum ex luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        og_site_name: "Nodelander"
    },
    google: {
        name: "Nodelander",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper nulla nec sapien sollicitudin, id vestibulum ex luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: assetbase + "images/1.jpg"
    }

}

module.exports = obj;
