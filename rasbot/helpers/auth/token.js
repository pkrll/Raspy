'use strict'
const Memory = require('lowdb/adapters/Memory');
const lowdb  = require('lowdb')(new Memory());

lowdb.defaults({ tokens: [] }).write();

exports.generate = callback => {
	require('crypto').randomBytes(24, (error, buffer) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, buffer.toString('hex'));
		}
	});
}

exports.save = token => {
	lowdb.get('tokens').push({ token: token }).write();
	console.log(lowdb.get('tokens').size().value());
}

exports.check = token => {
	if (lowdb.get('tokens').find({ token: token }).value()) {
		return true;
	}

	return false;
}
