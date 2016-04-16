var util = require('util');

var secrets = require('../config/secrets.js');

var config = {
    mongo: {
        db: secrets.db.name || 'nodelander',
        host: secrets.db.host || 'localhost',
        user: secrets.db.user || '',
        pass: secrets.db.pass || '',
        port: secrets.db.port || 27017
    }
};

module.exports = config;
