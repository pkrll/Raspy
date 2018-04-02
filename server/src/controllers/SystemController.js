// SystemController.js
const system = require('../models/System');

module.exports = {

  index: function (req, res) {
    system.index().then(function (response) {
      res.json(response);
    }).catch(function (error) {
      res.json({status: 0});
    });
  }

};
