'use strict'
const path = require('path');
const browser = require('../models/Browser');

const buildPath = (params) => {
	let request = '/';

	if (params.path != undefined) {
    request = path.join(request, params.path, params[0]);
  }

	return request;
}

exports.browse = (req, res) => {
	let request = buildPath(req.params);
	browser.getDirectory(request).then(response => {
    res.json({ success: true, result: response });
  }).catch(error => {
    res.status(500).json({ success: false, error: error.message });
  });
};

exports.viewFile = (req, res) => {
	let request = buildPath(req.params);
	browser.viewFile(request).then(response => {
		res.json({ success: true, result: response});
	}).catch(error => {
		res.status(500).json({ success: false, error: error.message });
	});
};

exports.makeDirectory = (req, res) => {
	let request = req.body.fullPath;
	browser.makeDirectory(request).then(response => {
		res.json({ success: true, result: response});
	}).catch(error => {
		res.status(500).json({ success: false, error: error.message });
	});
};

exports.remove = (req, res) => {
	let request = buildPath(req.params);
	browser.remove(request).then(response => {
		res.json({ success: true, result: response });
	}).catch(error => {
		res.status(500).json({ success: false, error: error.message });
	});
};

exports.download = (req, res) => {
	let request = buildPath(req.params);
	res.download(request, path.basename(request), error => {
		if (error) {
			if (error.statusCode) {
				res.status(error.statusCode).json({ success: false, error: error.message });
			} else {
				res.status(500).json(error.message);
			}

			console.log("Error: BrowserController.download:");
			console.log(error);
		}
	});
};
