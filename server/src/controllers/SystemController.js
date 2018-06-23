// SystemController.js
const system = require('../models/System');

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

  launchBootstrapper: function (req, res) {
    system.launchBootstrapper().then(function (response) {
      res.json({status: 1, data: response});
    }).catch(function (error) {
      res.json({status: 0, error: error});
    });
  }

};
