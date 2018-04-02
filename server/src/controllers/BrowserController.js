// BrowserController.js
const path = require('path');

exports.index = function(req, res) {
  res.json({error: 'NOT IMPLEMENTED!'});
};

exports.browse = function (req, res) {
  let endPoint = path.join(req.params.path, req.params[0]);
  res.json({error: 'NOT IMPLEMENTED!'});
};
