'use strict';

var general = require('../../shared/config/sample-general.js');

var obj = {};

obj = {
    index: {
        title: 'Nodelander | Fast Deploying NodeJS Landing Page and Lead Capture',
        img: general.assetbase.url + 'images/1.jpg'
    },
    about: {
        view: 'about',
        title: 'About Us - Nodelander | Fast Deploying NodeJS Landing Page and Lead Capture',
        img: general.assetbase.url + 'images/2.jpg'
    },
    contact: {
        view: 'contact',
        title: 'Contact Us - Nodelander | Fast Deploying NodeJS Landing Page and Lead Capture',
        img: general.assetbase.url + 'images/3.jpg'
    }
}

module.exports = obj;
