'use strict'
const CREDENTIALS_BASE_REGEXP = /^ *(basic) +([A-Za-z0-9._~+\/-]+=*) *$/;

module.exports = function(string) {
	let result = new RegExp(CREDENTIALS_BASE_REGEXP, 'i').exec(string);

	if (result) {
		let credentials = Buffer.from(result[2], 'base64').toString().split(':');
		return { username: credentials[0], token: credentials[1] };
	}

	return false;
}
