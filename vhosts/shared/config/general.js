'use strict';

var local = process.env.NODE_ENV === 'local',
    production = process.env.NODE_ENV === 'prod',
    obj = {};

if (local) {
    obj = {
        default: {
            title: 'Nodelander Dev Environment'
        },
        assetbase: {
            url: 'http://assets.nodelander.dev/'
        },
        toggle: {
            email_response: false,
            email_alert: true,
            slack_alert: true
        }
    }
} else if (production) {
    obj = {
        default: {
            title: 'Nodelander'
        },
        assetbase: {
            url: 'http://assets.yourdomain.com/'
        }
    }
}

module.exports = obj;
