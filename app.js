var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var vhost = require('vhost');
var mongoose = require('mongoose');

var app = express();

var assets = require('./vhosts/assets/app.js');
var admin = require('./vhosts/admin/app.js');
var leads = require('./vhosts/leads/app.js');
var ebook = require('./vhosts/ebook/app.js');
var personal = require('./vhosts/personal/app.js');
var corporate = require('./vhosts/corporate/app.js');
var product = require('./vhosts/product/app.js');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(vhost('assets.nodelander.dev', assets));
app.use(vhost('admin.nodelander.dev', admin));
app.use(vhost('leads.nodelander.dev', leads));
app.use(vhost('ebook.nodelander.dev', ebook));
app.use(vhost('personal.nodelander.dev', personal));
app.use(vhost('nodelander.dev', corporate));
app.use(vhost('product.nodelander.dev', product));

mongoose.createConnection('mongodb://localhost/nodelander');

module.exports = app;
