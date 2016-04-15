'use strict';

var nodemailer = require('nodemailer');
var config = require('../config/secrets.js').mail;

var transporter = nodemailer.createTransport('smtps://' + config.user + ':' + config.pwd + '@' + config.host);

module.exports = transporter;