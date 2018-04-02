const path    = require('path');
const express = require('express');

module.exports = function (app) {

  const router = express.Router();

  router.get('/', function(req, res) {
    res.json({ message: 'Raspy server'});
  });

  app.use(express.static(app.get('dist')));
  app.use('/api', router);

}
