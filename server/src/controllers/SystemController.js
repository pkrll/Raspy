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

  loadConsoleHistory: function (req, res) {
    let response = logger.read("update");
    res.json({status: 1, history: response});
  },

  updateRaspy: function (req, res) {
    logger.write("update", "$ update");
    system.updateRaspy().then(function (response) {
      logger.write("update", response);
      res.json({status: 1, data: response});
    }).catch(function (error) {
      logger.write("update", error);
      console.log(error)
      res.json({status: 0, error: error});
    });
  },

  stopRaspy: function (req, res) {
    logger.write("update", "$ stop");
    system.stopRaspy().then(function (response) {
      logger.write("update", "Stopping Raspy...");
      logger.write("update", response);
      res.json({status: 1, data: response});
    }).catch(function (error) {
      logger.write("update", error);
      console.log(error)
      res.json({status: 0, error: error});
    });
  },

  restartRaspy: function (req, res) {
    logger.write("update", "$ restart");
    system.restartRaspy().then(function (response) {
      logger.write("update", "Restarting Raspy...");
      logger.write("update", response);
      res.json({status: 1, data: response});
    }).catch(function (error) {
      logger.write("update", error);
      console.log(error)
      res.json({status: 0, error: error});
    });
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
