var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var Lead = require('../../shared/models/lead');
var assetbase = require('../../shared/config/secrets.js').assetbase.url;

function registerUser(email, password, res) {
    Account.register(new Account({
            email: email
        }), password,
        function (err, account) {
            if (err) {
                res.redirect('/dashboard');
            }

            Account.update({
                email: email
            }, {
                $set: {
                    password: password
                }
            }, function (err) {
                if (err) throw new Error(err);

                res.redirect('/dashboard');
            });
        });
}

router.get('/', function (req, res, next) {
    Lead.find(function(err, leads) {
        if (err) throw new Error(err);
        leads.map(function (lead) {
            return {
                id: lead._id,
                email: lead.email,
                source: lead.source,
                domain: lead.domain
            };
        });
        res.render('dashboard', {
            leads: leads,
            assetbase: assetbase
        });
    });
});

router.post('/new/create', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    if (!email || !password) {
        return res.redirect('/dashboard');
    }

    Account.findOne({
        role: 'user',
        email: email
    }, function (err, user) {
        if (err) throw new Error(err);

        if (user) {
            res.redirect('/dashboard');
        } else {
            registerUser(email, password, res);
        }
    });
});

router.get('/update/:id', function (req, res, next) {
    Account.findById(req.params.id, function (err, user) {
        if (err) throw new Error(err);

        if (user) {
            res.render('update', {
                id: user._id,
                email: user.email,
                password: user.password,
                assetbase: assetbase
            });
        } else {
            res.redirect('/dashboard');
        }
    });
});

router.post('/update/:id', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var userId = req.params.id;

    if (!email || !password) {
        return res.redirect('/dashboard');
    }

    Account.findOne({
        email: email,
        _id: {
            $ne: userId
        }
    }, function (err, user) {
        if (err) throw new Error(err);

        if (user) {
            res.redirect('/dashboard');
        } else {
            Account.findByIdAndRemove(userId, function (err) {
                if (err) throw new Error(err);

                registerUser(email, password, res);
            });
        }
    });
});


router.post('/delete/:id', function (req, res, next) {
    Account.findByIdAndRemove(req.params.id, function (err) {
        if (err) throw new Error(err);

        res.redirect('/dashboard');
    });
});


router.get('/new', function (req, res, next) {
    res.render('new', {
            assetbase: assetbase
        });
});

module.exports = router;
