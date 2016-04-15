var express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	localStrategy = require('passport-local').Strategy,
	index = require('./routes/index'),
	dashboard = require('./routes/dashboard'),
	ConnectRoles = require('connect-roles');

var app = express();

var user = new ConnectRoles({
    failureHandler: function (req, res, action) {
        res.redirect('/');
    }
});

user.use(function (req, action) {
    if (!req.user) {
        return false;
    }
});

user.use('access private page', function (req) {
    if (req.user.role === 'user') {
        return true;
    }
});

//admin users can access all pages
user.use(function (req) {
    if (req.user.role === 'admin') {
        return true;
    }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
    secret: 'NodelanderSecret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(user.middleware());

app.use(express.static(path.join(__dirname, 'public')));

function Authenticate(req, res, next) {
    req.isAuthenticated()
        ? next()
        : res.redirect('/');
}

app.all('/admin', Authenticate);
app.all('/admin/*', Authenticate);

app.use('/', index);
app.use('/dashboard', user.can('access admin page'), dashboard);
app.use('/dashboard/new', user.can('access admin page'), dashboard);
app.use('/dashboard/new/create', user.can('access admin page'), dashboard);
app.use('/dashboard/update/:id', user.can('access admin page'), dashboard);
app.use('/dashboard/delete/:id', user.can('access admin page'), dashboard);
app.use('/dashboard/edit', user.can('access admin page'), dashboard);

var Account = require('./models/account');
passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

mongoose.createConnection('mongodb://localhost/nodelander');

app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
next(err);
});

if (app.get('env') === 'local') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
