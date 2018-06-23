// SystemController.js
const system = require('../models/System');
const logger = require('../shared/logger.js');

module.exports = {

  index: function (req, res) {
    system.index().then(function (response) {
      res.json(response);
    }).catch(function (error) {
      res.json(error);
    });
  },

  checkForUpdate: function (req, res) {
    system.checkForUpdate().then(function (response) {
      res.json(response)
    }).catch(function (error) {
      res.json(error);
    })
  },

  launchUpdater: function (req, res) {
    system.launchUpdater().then(function (response) {
      res.json({status: 1, data: response});
    }).catch(function (error) {
      console.log(error)
      res.json({status: 0, error: error});
    });
  }

};
