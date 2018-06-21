import axios from 'axios'
import fileDownload from 'downloadjs'

export default {
	install: (Vue, username, password) => {

		Vue.prototype.$APIManager = {

			HTTP: axios.create({ baseURL: process.env.API_URL, timeout: 60000 }),
			/**
			 * Sets the credentials for the user.
			 *
			 * @param  {String]} username The username of the user.
			 * @param  {String]} password The password of the user.
			 */
			setCredentials: function (username, password, callback) {
				this.HTTP = axios.create({
					baseURL: process.env.API_URL,
					timeout: 60000,
					auth: {
						username: username,
						password: password
					}
				});
			},
			/**
			 * Checks the credentials saved in cookie.
			 *
			 * @param  {Function} callback The callback to invoke on response.
			 */
			testCredentials: function (callback) {
				let credentials = this.HTTP.defaults.auth;
				this.HTTP.post('login', {
					username: credentials.username,
					password: credentials.password
				}).then(response => {
					if (typeof callback === 'function') callback(response.data);
				}).catch(error => {
					if (typeof callback === 'function') callback(handleError(error));
				});
			},
			/**
			 * Removes the credentials of the user from the axios object.
			 */
			clearCredentials: function () {
				this.HTTP = axios.create({ baseURL: process.env.API_URL, timeout: 60000 });
			},
			/**
			 * Logins to the server.
			 *
			 * * Calls the user/login endpoint.
			 *
			 * @param  {String}   username The username.
			 * @param  {String}   password The password.
			 * @param  {Function} callback The callback to invoke on response.
			 */
			login: function (username, password, callback) {
				this.HTTP.post('login', {
					username: username,
					password: password
				}).then(response => {
					if (response.data.status == 1) {
						this.HTTP = axios.create({
							baseURL: process.env.API_URL,
							timeout: 60000,
							auth: {
								username: username,
								password: password
							}
						});
					}

					if (typeof callback === 'function') callback(response.data);
				}).catch(error => {
					if (typeof callback === 'function') callback(handleError(error));
				});
			},
			/**
			 * Browse the specified path.
			 *
			 * Calls the filesystem/list endpoint.
			 *
			 * @param  {String} 	path 			The path to the directory list.
			 * @param  {Function} callback 	The callback to invoke on response.
			 */
			listDirectory: function (path, callback) {
				this.HTTP.get('browser' + path).then(response => {
					if (typeof callback === 'function') callback(response.data);
				}).catch(error => {
					if (typeof callback === 'function') callback(handleError(error));
				});
			},
			/**
			 * Retrieves information on the specified file.
			 *
			 * * Calls the filesystem/file endpoint with GET.
			 *
			 * @param  {String}   path     The path to the file.
			 * @param  {Function} callback The callback to invoke on response.
			 */
			viewFile: function (path, callback) {
				this.HTTP.get('file' + path).then(
					response => {
						if (typeof callback === 'function') callback(response.data);
					}
				).catch(e => {
					console.log("Error: ");
					console.log(e);
				});
			},
			/**
			 * Deletes the specified directory or file.
			 *
			 * Calls the filesystem/file endpoint with DELETE.
			 *
			 * @param  {String}   path     The path to the directory or file file.
			 * @param  {Function} callback The callback to invoke on response.
			 */
			deleteFile: function (path, callback) {
				this.HTTP.delete('file' + path).then(
					response => {
						if (typeof callback === 'function')  callback(response.data);
					}
				).catch(e => {
					console.log("Error: ");
					console.log(e);
				});
			},
			/**
			 * Creates a new folder.
			 *
			 * Calls the filesystem/folder/new endpoint with POST.
			 *
			 * @param  {String}   path     The path of the new folder.
			 * @param  {Function} callback The callback to invoke on response.
			 */
			createFolder: function (path, callback) {
				this.HTTP.post('folder/new', { fullPath: path }).then(
					response => {
						if (typeof callback === 'function') callback(response.data);
					}
				).catch(e => {
					console.log("Error: ");
					console.log(e);
				});
			},
			/**
			 * Downloads the specified file.
			 *
			 * Calls the filesystem/download endpoint.
			 *
			 * @param  {String} path 				Path to the file on the server.
			 * @param  {String} saveAsName 	The name to save the file as.
			 * @param  {Function} callback The callback to invoke on response.
			 */
			downloadFile: function (path, saveAsName, callback) {
				let	fileName 	= (saveAsName != undefined) ? saveAsName : 'untitled';
				let baseURL 	= this.HTTP.defaults.baseURL;
				let usrAuth 	= this.HTTP.defaults.auth;

				axios({
					url: baseURL + 'download' + path,
					method: 'get',
					responseType: 'blob',
					auth: usrAuth
				}).then(function (response) {
					fileDownload(response.data, fileName);
					if (typeof callback === 'function')  callback();
				}).catch(e => {
					console.log("Error: ");
					console.log(e);
				});
			},
			/**
			 * Retrieves system information.
			 *
			 * Calls the /system endpoint.
			 *
			 * @param  {Function} callback The callback to invoke on response.
			 */
			getSystemInformation: function (callback) {
				this.HTTP.get('system').then(
					response => {
						if (typeof callback === 'function') callback(response.data);
					}
				).catch(e => {
					console.log("Error: ");
					console.log(e);
				});
			},
			/**
			 * Checks for system update.
			 *
			 * Calls the /system/checkForUpdate endpoint
			 *
			 * @param  {Function} callback The callback to invoke on response.
			 */
			checkForUpdate: function (callback) {
				this.HTTP.get('system/checkForUpdate').then(
					response => {
						if (typeof callback === 'function') callback(response.data);
					}
				).catch(e => {
					console.log("Error: ");
					console.log(e);
				});
			},
			/**
			 * Updates the software
			 *
			 * Calls the /system/update endpoint
			 *
			 * @param  {Function} callback The callback to invoke on response.
			 */
			updateRaspy: function (callback) {
				this.HTTP.get('system/update').then(
					response => {
						if (typeof callback === 'function') callback(response.data);
					}
				).catch(e => {
					console.log("Error: ");
					console.log(e);
				});
			},
			/**
			 * Restarts the software
			 *
			 * Calls the /system/restart endpoint
			 *
			 * @param  {Function} callback The callback to invoke on response.
			 */
			restartRaspy: function (callback) {
				this.HTTP.get('system/restart').then(
					response => {
						if (typeof callback === 'function') callback(response.data);
					}
				).catch(e => {
					console.log("Error: ");
					console.log(e);
				});
			},
			/**
			 * Stops the software
			 *
			 * Calls the /system/stop endpoint
			 *
			 * @param  {Function} callback The callback to invoke on response.
			 */
			stopRaspy: function (callback) {
				this.HTTP.get('system/stop').then(
					response => {
						if (typeof callback === 'function') callback(response.data);
					}
				).catch(e => {
					console.log("Error: ");
					console.log(e);
				});
			},

			loadConsoleHistory: function (callback) {
				this.HTTP.get('system/logs/update').then(
					response => {
						if (typeof callback === 'function') callback(response.data);
					}
				).catch(e => {
					console.log("Error: ");
					console.log(e);
				});
			}
		}
	}
}

function handleError(error) {
	let response = { status: 0, error: "Unknown error!" };

	if (error.response) {
		let status = error.response.status;

		switch (status) {
			case 404:
				response.error = "Server not found."
				break;
			case 401:
				response.error = "Unauthorized request."
				break;
			case 408:
				response.error = "Request timed out."
				break;
			case 500:
				response.error = handleInternalError(error.response.data.error);
				break;
			default:
				break;
		}
	} else if (error.message) {
		response.error = error.message;
	}

	return response;
}

function handleInternalError(error) {
	switch (error.code) {
		case "ENOENT":
			return "No such file or directory: " + error.path;
		case "ENOTDIR":
			return "Not a directory";
		case "ENOTEMPTY":
			return "Directory not empty";
		case "EEXIST":
			return "File exists";
		case "EACCES":
			return "Permission denied";
		default:
			break;
	}

	return "Internal server error.";
}
