'use strict'
const BASIC_AUTH_REGEXP = /^ *(basic) +([A-Za-z0-9._~+\/-]+=*) *$/;
const TOKEN_AUTH_REGEXP = /^ *(bearer) +([A-Za-z0-9._~+\/-]+=*) *$/;

exports.basicAuth = string => {
	let result = parse(string, BASIC_AUTH_REGEXP);

	if (result) {
		let credentials = result.split(':');
		return {
			username: credentials[0],
			password: credentials[1]
		};
	}

	return null;
}

exports.tokenAuth = string => {
	let result = new RegExp(TOKEN_AUTH_REGEXP, 'i').exec(string);
	return result[2];
}

function parse(string, regularExpression) {
	let result = new RegExp(regularExpression, 'i').exec(string);

	if (!result) return null;

	return Buffer.from(result[2], 'base64').toString();
}
