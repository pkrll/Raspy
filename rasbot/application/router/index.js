'use strict'
const express = require('express');
const path = require('path');
const auth = require('../../helpers/auth/');

module.exports = app => {

	const auther = require('../../helpers/auth/')(app.get('databasePath'));
	const router = express.Router();

	// ------------------------------
  //      Unauthorized calls
  // ------------------------------

	router.get('/', function(req, res) {
		res.status(404).send({ status: 0, error: { message: "Not found." } });
	});

	router.post('/login', (req, res) => {
		auther.authenticate(req).then(token => {
			res.json({ success: true, result: { token: token } });
		}).catch(error => {
			res.json({ success: false, error: { message: error.message } });
		});
	});

	// ------------------------------
  //      Authorized calls
  // ------------------------------

	// Checks if call is authorized
  router.use(auther.isAuthorized);

	// Register the routes
  app.use(express.static(app.get('dist')));
  app.use('/api', router);
  // Catch all to handle direct routes
  app.get('*', function(req, res) {
    let file = path.join(app.get('dist'), '/index.html');
    res.sendFile(file);
  });

}
