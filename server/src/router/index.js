const path    = require('path');
const express = require('express');

const browserController = require('../controllers/BrowserController');


module.exports = function (app) {

  const router = express.Router();

  // Routes for the API
  router.get('/', function(req, res) {
    res.json({ message: 'Raspy server'});
  });

  router.route('/browser').get(browserController.index);

  router.route('/browser/:path*')
    // Get directory listing
    .get(browserController.browse)
    // Delete folder
    .delete(browserController.remove);

  router.route('/file/:path*')
    // Get the requested file
    .get(browserController.getFile)
    // Delete the requested file
    .delete(browserController.remove);

  // Register the routes
  app.use(express.static(app.get('dist')));
  app.use('/api', router);

}
