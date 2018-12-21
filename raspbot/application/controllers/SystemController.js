const system = require('../models/System.js');

exports.checkForUpdate = (req, res) => {
	system.checkForUpdate().then(response => {
		res.json({success: true, result: response});
	}).catch(error => {
		res.status(500).json({success: false, error: error.message});
	});
};

exports.reboot = (req, res) => {
	console.log("Reboot requested.");
	system.reboot().then(response => {
		res.json({success: true});
	}).catch(error => {
		console.log(error);
		res.json({status: false, error: {message: error}});
	})
};

exports.shutdown = (req, res) => {
	console.log("Shutdown requested.");
	system.shutdown().then(response => {
		res.json({success: true});
	}).catch(error => {
		console.log(error);
		res.json({status: false, error: {message: error}});
	})
};

exports.getDisks = (req, res) => {
	system.getDisks().then(response => {
		res.json({success: true, result: response});
	}).catch(error => {
		res.status(500).json({success: false, error: error});
	});
}

exports.mount = (req, res) => {
	const device = req.body.device;
	const mpoint = req.body.mountpoint;
	system.mount(device, mpoint).then(response => {
		res.json({success: true});
	}).catch(error => {
		console.log(error);
		res.json({status: false, error: {message: error}});
	});
}

exports.umount = (req, res) => {
	const mountpoint = req.body.mountpoint;
	system.umount(mountpoint).then(response => {
		res.json({success: true});
	}).catch(error => {
		console.log(error);
		res.json({status: false, error: {message: error}});
	});
}
