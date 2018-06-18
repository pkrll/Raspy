const express = require('express');
const path    = require('path');

const browserController = require('../controllers/BrowserController');
const systemController  = require('../controllers/SystemController');

module.exports = function (app) {

  const router  = express.Router();
  const auth    = require('./auth.js')(app.get('databasePath'));

  // Routes for the API
  router.get('/', function(req, res) {
    res.json({ message: 'Raspy server'});
  });

  router.post('/login', function (req, res) {
    let user = {
      username: req.body.username,
      password: req.body.password
    }

    if (auth.checkCredentials(user)) {
      res.json({status: 1});
    } else {
      res.json({status: 0, message: 'Wrong username or password!'});
    }
  });

  // Authentication
  router.use(auth.checkAuthentication);

  // ------------------------------
  //          /browser
  // ------------------------------
  router.route('/browser').get(browserController.browse);

  router.route('/browser/:path*')
    // Get directory listing
    .get(browserController.browse)
    // Delete folder
    .delete(browserController.remove);
  // ------------------------------
  //          /file
  // ------------------------------
  router.route('/file/:path*')
    // Get the requested file
    .get(browserController.getFile)
    // Delete the requested file
    .delete(browserController.remove);
  // ------------------------------
  //          /folder
  // ------------------------------
  router.route('/folder/new')
    // Create a new folder
    .post(browserController.create);
  // ------------------------------
  //          /download
  // ------------------------------
  router.route('/download/:path*')
    // Get the requested file
    .get(browserController.download);
  // ------------------------------
  //          /system
  // ------------------------------
  router.route('/system')
    // Get system information
    .get(systemController.index);

  router.route('/system/checkForUpdate')
    .get(systemController.checkForUpdate);

  router.route('/system/launchUpdater')
    .get(systemController.launchUpdater);

  // Register the routes
  app.use(express.static(app.get('dist')));
  app.use('/api', router);
  // Catch all to handle direct routes
  app.get('*', function(req, res) {
    let file = path.join(app.get('dist'), '/index.html');
    res.sendFile(file);
  });

}
