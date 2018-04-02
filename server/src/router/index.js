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
  router.route('/browser/:path*').get(browserController.browse);
  router.route('/file/:path*').get(browserController.getFile);

  // Register the routes
  app.use(express.static(app.get('dist')));
  app.use('/api', router);

}
