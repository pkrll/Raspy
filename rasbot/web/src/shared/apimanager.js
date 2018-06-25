import axios from 'axios';
import fileDownload from 'downloadjs';

export default {

  install: (Vue, apiURL, timeout) => {
    Vue.prototype.$APIManager = {

      HTTP: axios.create({ baseURL: apiURL, timeout: timeout }),
      /**
       * Sets the session token for the user.
       *
       * @param  {String} token The token.
       */
      setToken: function(token) {
        this.HTTP.defaults.headers.common['Authorization'] = "bearer " + token;
      },
      /**
       * Authenticates the user.
       *
       * Calls the the /login endpoint.
       *
       * @param  {String}   username The username.
       * @param  {String}   password The password.
       * @param  {Function} callback The callback.
       */
      authenticate: function(username, password, callback) {
        this.HTTP.post('login', {}, {
          auth: {
            username: username,
            password: password
          }
        }).then(response => {
          console.log(response);
          if (typeof callback === 'function') callback(response.data);
        }).catch(error => {
          console.log(error);
        });
      },
      /**
			 * Browse the specified path.
			 *
			 * Calls the /browser endpoint.
			 *
			 * @param  {String} 	path 			The path to the directory list.
			 * @param  {Function} callback 	The callback to invoke on response.
			 */
			browseDirectory: function (path, callback) {
				this.HTTP.get('browse' + path).then(response => {
					if (typeof callback === 'function') callback(response.data);
				}).catch(error => {
					if (typeof callback === 'function') callback(handleError(error));
				});
			},
      /**
			 * Retrieves information on the specified file.
			 *
			 * * Calls the /file endpoint with GET.
			 *
			 * @param  {String}   path     The path to the file.
			 * @param  {Function} callback The callback to invoke on response.
			 */
			viewFile: function (path, callback) {
				this.HTTP.get('file' + path).then(response => {
					if (typeof callback === 'function') callback(response.data);
				}).catch(error => {
					if (typeof callback === 'function') callback(handleError(error));
				});
			},
      /**
       * Deletes the specified directory or file.
       *
       * Calls the /file endpoint with DELETE.
       *
       * @param  {String}   path     The path to the directory or file file.
       * @param  {Function} callback The callback to invoke on response.
       */
      deleteFile: function (path, callback) {
        this.HTTP.delete('file' + path).then(response => {
          if (typeof callback === 'function') callback(response.data);
        }).catch(error => {
          if (typeof callback === 'function') callback(handleError(error));
        });
      },
      /**
			 * Creates a new folder.
			 *
			 * Calls the /folder/new endpoint with POST.
			 *
			 * @param  {String}   path     The path of the new folder.
			 * @param  {Function} callback The callback to invoke on response.
			 */
			createFolder: function (path, callback) {
				this.HTTP.post('folder/new', { fullPath: path }).then(response => {
					if (typeof callback === 'function') callback(response.data);
				}).catch(error => {
					if (typeof callback === 'function') callback(handleError(error));
				});
			},
			/**
			 * Downloads the specified file.
			 *
			 * Calls the /download endpoint.
			 *
			 * @param  {String} path 				Path to the file on the server.
			 * @param  {String} saveAsName 	The name to save the file as.
			 * @param  {Function} callback The callback to invoke on response.
			 */
			downloadFile: function (path, saveAsName, callback) {
				let	fileName 	= (saveAsName != undefined) ? saveAsName : 'untitled';
				let baseURL 	= this.HTTP.defaults.baseURL;
				let tokenAuth	= this.HTTP.defaults.headers.common['Authorization'];

				axios({
					url: baseURL + 'download' + path,
					method: 'get',
					responseType: 'blob',
					headers: {
            'Authorization': tokenAuth
          }
				}).then(response => {
					fileDownload(response.data, fileName);
					if (typeof callback === 'function') callback({status: 1});
				}).catch(error => {
					if (typeof callback === 'function') callback(handleError(error));
				});
			}

    }

  }

}

function handleError(error) {

}
