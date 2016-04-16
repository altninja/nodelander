'use strict';

var mongoose = require('mongoose');
mongoose.Promise = Promise;
var autoIncrement = require('mongoose-auto-increment');
var fs = require('fs');
var path = require('path');
var config = require('./config');

var mongoConfig = config.mongo;
var mongoOptions = {
    db: {
        safe: true
    }
};

if (mongoConfig.user) {
  mongoOptions.user = mongoConfig.user,
  mongoOptions.pass = mongoConfig.pass
}
autoIncrement.initialize(mongoose.connection);
mongoose.set('debug', true);

console.log('Mongoose connecting...');
var connection = mongoose.connect(mongoConfig.host, mongoOptions);

mongoose.connection.on('connected', function () {
    console.log('Mongoose successfully connected to: ' + mongoConfig.host);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose ERROR connecting to: ' + mongoConfig.host + '. ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose.connection;