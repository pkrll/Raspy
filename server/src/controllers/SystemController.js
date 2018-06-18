// SystemController.js
const system = require('../models/System');

module.exports = {

  index: function (req, res) {
    system.index().then(function (response) {
      res.json(response);
    }).catch(function (error) {
      res.json({status: 0});
    });
  },

  checkForUpdate: function (req, res) {
    system.checkForUpdate().then(function (response) {
      res.json({status: 1, version: response})
    }).catch(function (error) {
      res.json({status: 0});
    })
  },

  launchUpdater: function (req, res) {
    system.launchUpdater().then(function (response) {
      res.json(response);
    }).catch(function (error) {
      console.log("======== Error: launchUpdater ========");
      console.log(error)
      res.json({status: 0, error: error});
    });
  }

};
