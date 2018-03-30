import axios from 'axios'
import fileDownload from 'downloadjs'

export default {
	install: (Vue, username, password) => {

		Vue.prototype.$APIManager = {

			HTTP: axios.create({ baseURL: process.env.API_URL }),

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
			 * Logins to the server.
			 *
			 * @param  {String}   username The username.
			 * @param  {String}   password The password.
			 * @param  {Function} callback The callback to invoke on response.
			 */
			login: function (username, password, callback) {
				this.HTTP.post('user/login', { username: username, password: password }).then(
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
					console.log("Error " + e);
				});
			},
			/**
			 * Browse the specified path.
			 *
			 * @param  {String} 	path 			The path to the directory list.
			 * @param  {Function} callback 	The callback to invoke on response.
			 */
			listDirectory: function (path, callback) {
				this.HTTP.get('filesystem/list' + path).then(
					response => {
						if (typeof callback === 'function') callback(response.data);
					}
				).catch(e => {
					console.log("ERROR " + e);
				});
			},
			/**
			 * Retrieves information on the specified file.
			 *
			 * @param  {String}   path     The path to the file.
			 * @param  {Function} callback The callback to invoke on response.
			 */
			viewFile: function (path, callback) {
				this.HTTP.get('filesystem/file' + path).then(
					response => {
						if (typeof callback === 'function') callback(response.data);
					}
				).catch(e => {
					console.log("ERROR " + e);
				});
			},
			/**
			 * Deletes the specified directory or file.
			 *
			 * @param  {String}   path     The path to the directory or file file.
			 * @param  {Function} callback The callback to invoke on response.
			 */
			deleteFile: function (path, callback) {
				this.HTTP.delete('filesystem/file' + path).then(
					response => {
						if (typeof callback === 'function')  callback(response.data);
					}
				).catch(e => {
					console.log("ERROR " + e);
				});
			},
			/**
			 * Downloads the specified file.
			 *
			 * @param  {String} path Path to the file on the server.
			 */
			downloadFile: function (path, saveAsName) {
				let	fileName 	= (saveAsName != undefined) ? saveAsName : 'untitled';
				let baseURL 	= this.HTTP.defaults.baseURL;
				let usrAuth 	= this.HTTP.defaults.auth;

				axios({
					url: baseURL + 'filesystem/download' + path,
					method: 'get',
					responseType: 'blob',
					auth: usrAuth
				}).then(function (response) {
					fileDownload(response.data, fileName);
				}).catch(e => {
					console.log("ERROR " + e);
				});
			},

			getSystemInformation: function (callback) {
				this.HTTP.get('system').then(
					response => {
						if (typeof callback === 'function') callback(response.data);
					}
				).catch(e => {
					console.log("ERROR " + e);
				});
			}
		}
	}
}
