'use strict'
const Memory = require('lowdb/adapters/Memory');
const lowdb  = require('lowdb')(new Memory());
const cronjob = require('cron').CronJob;

lowdb.defaults({ tokens: [] }).write();
// Clean up tokens older than 24 hours every day
const job = new cronjob('* 00 00 * * *', function() {
	console.log("Cleaning up old tokens...");
	const dateLimit = 24 * 60 * 60 * 1000; // 24 hours
	lowdb.get('tokens').remove(data => {
		const date = ((new Date()) - data.loggedIn);
		return (date > dateLimit);
	}).write();
}, null, true);

exports.generate = callback => {
	require('crypto').randomBytes(24, (error, buffer) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, buffer.toString('hex'));
		}
	});
};

exports.save = (token, clientIP, username) => {
	lowdb.get('tokens').push({
		token: token,
		clientIP: clientIP,
		username: username,
		loggedIn: new Date()
	}).write();
};

exports.check = (token, clientIP) => {
	const credentials = lowdb.get('tokens').find({ token: token }).value();
	if (credentials && credentials.clientIP == clientIP) {
		return true;
	}

	return false;
};

exports.getUsernameFromToken = token => {
	const credentials = lowdb.get('tokens').find({ token: token }).value();
	if (credentials && credentials.username) {
		return credentials.username;
	}

	return null;
};
