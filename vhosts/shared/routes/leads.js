`use strict`;

var express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	mail = require('../../shared/helpers/mail.js'),
	secrets = require('../../shared/config/secrets.js'),
	email_response_template = require('../templates/email_response_template.js'),
	email_alert_template = require('../templates/email_alert_template.js'),
	Slack = require('slack-node'),
	Lead = require('../../shared/models/lead.js');

function newLead(email, source, domain, res) {
    Lead.create({
            email: email,
            source: source,
            domain: domain
        }, function (err, lead) {
            if (err) {
                console.log(err);
            }
        });
}

router.get('/', function(req, res, next){
	res.render('leads');
});

router.post('/', function(req,res) {
	var lead = req.body;
	var csvLead = JSON.stringify(req.body) + ',';
	var domain = req.headers['origin'];
	
	var responseMail = {
		from: secrets.response.from,
		subject: secrets.response.subject,
		to: req.body.email,
		html: email_response_template
	};
	
	var alertMail = {
		from: secrets.alert.from,
		subject: secrets.alert.subject,
		to: secrets.alert.to,
		html: email_alert_template
	};
	
	var slack = new Slack();
	slack.setWebhook(secrets.slack.uri);

	fs.appendFile("vhosts/shared/lists/emails.csv", csvLead, function(err) {
		if(err) {
			return console.log(err);
		}
		mail.sendMail(responseMail);
		mail.sendMail(alertMail);

		slack.webhook({
			channel: "#general",
			username: "Nodelander",
			icon_emoji: ":slack:",
			text: "Nodelander new email signup: " + req.body.email
		}, function(err, response) {
			console.log(response);
		});
		newLead(lead.email, lead.source, domain, res);
		res.redirect('/leads');
		console.log("Lead Added Successfully");
	});
});

module.exports = router;