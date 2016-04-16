`use strict`;

var express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	mail = require('../../shared/helpers/mail.js'),
	secrets = require('../../shared/config/secrets.js'),
	email = require('../../shared/config/email.js'),
	email_response_template = require('../templates/email_response_template.js'),
	email_alert_template = require('../templates/email_alert_template.js'),
	Slack = require('slack-node'),
	Lead = require('../../shared/models/lead.js'),
	general = require('../../shared/config/general.js');

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
	res.render('leads', {
        assetbase: general.assetbase.url
    });
});

router.post('/', function(req,res) {
	var lead = req.body;
	var domain = req.headers['origin'];
	var csvEmail = JSON.stringify(req.body.email);
	var csvSource = JSON.stringify(req.body.source);
	var csvOut = csvEmail + ',' + csvSource + ',"' + domain + '",\r\n';
		console.log(lead.email + 'leademail')
	if (lead.email !== '' || null || undefined) {
		console.log(lead.email + 'leademail')
		newLead(lead.email, lead.source, domain, res);
		
		if (general.toggle.email_response === true) {
			var responseMail = {
				from: email.response.from,
				subject: email.response.subject,
				to: lead.email,
				html: email_response_template
			};
			mail.sendMail(responseMail);
		} else if (general.toggle.email_alert === true) {
			var alertMail = {
				from: email.alert.from,
				subject: email.alert.subject,
				to: email.alert.to,
				html: email_alert_template
			};
			mail.sendMail(alertMail);
		} else if (general.toggle.slack_alert === true) {
			var slack = new Slack();
			slack.setWebhook(secrets.slack.uri);
			slack.webhook({
				channel: "#general",
				username: "Nodelander",
				icon_emoji: ":slack:",
				text: "Nodelander new email signup: " + req.body.email + "from:" + domain
			}, function(err, response) {
				console.log(response);
			});
		}

		
	}
	fs.appendFile("vhosts/shared/lists/emails.csv", csvOut);
	res.redirect('/leads');
});

	


module.exports = router;