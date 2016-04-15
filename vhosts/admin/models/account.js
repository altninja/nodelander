var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    email: {type: String, unique: true},
    password: String,
    sessions: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

Account.plugin(passportLocalMongoose, {
    usernameField: 'email',
    passwordField: 'password'
});

module.exports = mongoose.model('Account', Account);