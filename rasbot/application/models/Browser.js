const fs = require('fs');
const path = require('path');

const parseContent = (parent, file, list) => {
	const fullPath = path.join(parent, file);
	let fileObject = { name: file, path: fullPath };

	try {
		let stat = fs.statSync(fullPath);
		if (stat.isDirectory()) {
			list.directories.push(fileObject);
		} else {
			list.files.push(fileObject);
		}
	} catch (error) {
		// temp fix for libuv bug
		list.files.push(fileObject);
	}
};

exports.getDirectory = directoryPath => {
	return new Promise((resolve, reject) => {
		try {
			let result = {
				directories: [],
				files: []
			};
			fs.readdirSync(directoryPath).forEach(file => parseContent(directoryPath, file, result));
			resolve(result);
		} catch (error) {
			reject(error);
		}
	})
};

exports.viewFile = filePath => {
	let result = {
		filename: path.basename(filePath),
		metadata: { size: 0, accessed: 0, created: 0, modified: 0}
	};

	return new Promise((resolve, reject) => {
		try {
			let stats = fs.statSync(path);
			result.metadata.size = stats.size;
			result.metadata.accessed = stats.atimeMs;
			result.metadata.created = stats.birthtimeMs;
			result.metadata.modified = stats.mtimeMs;
			resolve(result);
		} catch (error) {
			console.log("Error: Browser.viewFile:");
			console.log(error);
			reject(error);
		}
	});
};

exports.makeDirectory = _path => {
	return new Promise((resolve, reject) => {
		try {
			fs.mkdirSync(_path);
			resolve({ path: _path });
		} catch (error) {
			reject(error);
		}
	});
};

exports.remove = _path => {
	return new Promise((resolve, reject) => {
		try {
			let stats = fs.statSync(_path);

			if (stats.isDirectory()) {
				require('rimraf')(_path, error => {
					if (error) reject(error);
					resolve(null);
				});
			} else {
				fs.unlink(_path, error => {
					if (error) reject(error);
					resolve(null);
				});
			}
		} catch (error) {
			console.log("Error: Browser.remove:");
			console.log(error);
			reject(error);
		}
	});
};
