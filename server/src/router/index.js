const path    = require('path');
const express = require('express');

const browserController = require('../controllers/BrowserController');
const systemController  = require('../controllers/SystemController');

module.exports = function (app) {

  const router = express.Router();

  // Routes for the API
  router.get('/', function(req, res) {
    res.json({ message: 'Raspy server'});
  });
  // ------------------------------
  //          /browser
  // ------------------------------
  router.route('/browser').get(browserController.index);

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
  //          /system
  // ------------------------------
  router.route('/system')
    // Get system information
    .get(systemController.index);

  // Register the routes
  app.use(express.static(app.get('dist')));
  app.use('/api', router);

}
