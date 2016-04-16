'use strict';

// *** Rename This File To secrets.js And Add Your Own Credentials ***
// *** You Will Need To Add This File Manually Since It Won't Be Tracked In Git

var local = process.env.NODE_ENV === 'local',
	production = process.env.NODE_ENV === 'prod',
	obj = {};

if (local) {
	obj = {
		mail: {
			host: 'smtp.gmail.com',
			user: 'you@you_email.com',
			pwd: 'YourPassword'
		},
		slack: {
			uri: 'YOUR SLACK URI'
		},
	      db: {
	        host: 'localhost',
	        user: '',
	        pass: '',
	        name: 'nodelander',
	        port: '27017'
	     }
	}
} else if (production) {
	obj = {
		mail: {
			host: 'smtp.gmail.com',
			user: 'you@your_email.com',
			pwd: 'YourPassword'
		},
		slack: {
			uri: 'YOUR SLACK URI'
		},
		,
	      db: {
	        host: 'localhost',
	        user: 'dbusername',
	        pass: 'dbpassword',
	        name: 'nodelander',
	        port: '27017'
	     }
	}
}

module.exports = obj;