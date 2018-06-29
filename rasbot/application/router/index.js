'use strict'
const express = require('express');
const path = require('path');
const auth = require('../../helpers/auth/');

const browserController 	= require('../controllers/BrowserController');
const dashboardController = require('../controllers/DashboardController');
const systemController = require('../controllers/SystemController');

module.exports = app => {

	const auther = require('../../helpers/auth/')(app.get('databasePath'));
	const router = express.Router();

	// ------------------------------
  //      Unauthorized calls
  // ------------------------------

	router.get('/', function(req, res) {
		res.status(404).send({ success: false, error: { message: "Not found." } });
	});

	router.post('/login', (req, res) => {
		auther.authenticate(req).then(token => {
			res.json({ success: true, result: { token: token } });
		}).catch(error => {
			res.json({ success: false, error: { message: error.message } });
		});
	});

	router.post('/verify', (req, res) => {
		res.json({
			success: auther.verify(req)
		});
	});

	// ------------------------------
  //      Authorized calls
  // ------------------------------

	// Checks if call is authorized
  router.use(auther.isAuthorized);

	// ------------------------------
  //          /browse
  // ------------------------------
	router.route('/browse').get(browserController.browse);

	router.route('/browse/:path*')
    // Get directory listing
    .get(browserController.browse)
    // Delete folder
    .delete(browserController.remove);
	// ------------------------------
  //          /file
  // ------------------------------
  router.route('/file/:path*')
    // Get the requested file
    .get(browserController.viewFile)
    // Delete the requested file
    .delete(browserController.remove);
  // ------------------------------
  //          /folder
  // ------------------------------
  router.route('/folder/new')
    // Create a new folder
    .post(browserController.makeDirectory);
  // ------------------------------
  //          /download
  // ------------------------------
  router.route('/download/:path*')
    // Get the requested file
    .get(browserController.download);
	// ------------------------------
  //          /dashboard
  // ------------------------------
	router.route('/dashboard').get(dashboardController.systemInformation);
	// ------------------------------
  //          /checkForUpdate
  // ------------------------------
	router.route('/checkForUpdate').get(systemController.checkForUpdate);

  app.use(express.static(app.get('dist')));
  app.use('/api', router);
  // Catch all to handle direct routes
  app.get('*', function(req, res) {
    let file = path.join(app.get('dist'), '/index.html');
    res.sendFile(file);
  });

}
