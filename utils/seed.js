var Account = require('../models/account');
var mongoose = require('mongoose');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.initialize();

var email = 'admin@nodelander.com';
var pswd = 'test123';

var connection = mongoose.connect('mongodb://localhost/nodelander', {}, function (err) {

    if (err) {
        console.log('ERROR connecting to Mongo: ' + err);

    } else {
        Account.findOneAndRemove({
            email: email
        }, function (err, res) {
            console.log('Admin deleted');

            if (err) throw new Error(err);

            Account.register(new Account({
                    email: email
                }), pswd,
                function (err) {
                    if (err) throw new Error(err);

                    Account.findOneAndUpdate({
                        email: email
                    }, {
                        $set: {
                            role: 'admin'
                        }
                    }, function (err, res) {
                        if (err) throw new Error(err);

                        console.log('Admin created');
                        process.exit(1);
                    });
                });
        });
    }
});