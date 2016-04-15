var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Lead = new Schema({
    email: {type: String, unique: true},
    source: {
        type: String
    },
    domain: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Lead', Lead);