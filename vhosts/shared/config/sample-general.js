'use strict';

var local = process.env.NODE_ENV === 'local',
    production = process.env.NODE_ENV === 'prod',
    obj = {};

if (local) {
    obj = {
        assetbase: {
            url: 'http://assets.nodelander.dev/'
        }
    }
} else if (production) {
    obj = {
        assetbase: {
            url: 'http://assets.yourdomain.com/'
        }
    }
}

module.exports = obj;
