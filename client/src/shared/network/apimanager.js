import axios from 'axios'

export default {
	install: (Vue) => {

		Vue.prototype.$APIManager = {

			HTTP: axios.create({ baseURL: process.env.API_URL }),
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

						if (typeof callback === 'function') callback(response.data.status);
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
			}

		}

	}
}
