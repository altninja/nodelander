var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var Lead = require('../../shared/models/lead');
var assetbase = require('../../shared/config/general.js').assetbase.url;

router.get('/',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res, next) {
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
            user: req.user,
            leads: leads,
            assetbase: assetbase
        });
    });
});

module.exports = router;
