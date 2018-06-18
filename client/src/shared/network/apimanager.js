import axios from 'axios'
import fileDownload from 'downloadjs'

export default {
	install: (Vue, username, password) => {

		Vue.prototype.$APIManager = {

			HTTP: axios.create({ baseURL: process.env.API_URL }),
			/**
			 * Sets the credentials for the user.
			 *
			 * @param  {String]} username The username of the user.
			 * @param  {String]} password The password of the user.
			 */
			setCredentials: function (username, password) {
				this.HTTP = axios.create({
					baseURL: process.env.API_URL,
					auth: {
						username: username,
						password: password
					}
				});
			},
			/**
			 * Removes the credentials of the user from the axios object.
			 */
			clearCredentials: function () {
				this.http = axios.create({ baseURL: process.env.API_URL });
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
				this.HTTP.post('login', { username: username, password: password }).then(
					response => {
						if (response.data.status == 1) {
							this.HTTP = axios.create({
								baseURL: process.env.API_URL,
								auth: {
									username: username,
									password: password
								}
							});
						}

						if (typeof callback === 'function') callback(response.data);
					}
				).catch(e => {
					console.log("Error: ");
					console.log(e);
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
				this.HTTP.get('browser' + path).then(
					response => {
						if (typeof callback === 'function') callback(response.data);
					}
				).catch(e => {
					console.log("Error: ");
					console.log(e);
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
			 * Calls the /update/check endpoint
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
			}
		}
	}
}
