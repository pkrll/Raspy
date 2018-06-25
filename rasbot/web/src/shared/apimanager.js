import axios from 'axios'

export default {

  install: (Vue, apiURL, timeout) => {
    Vue.prototype.$APIManager = {

      HTTP: axios.create({ baseURL: apiURL, timeout: timeout }),

      setToken: function(token) {
        this.HTTP.defaults.headers.common['Authorization'] = "bearer " + token;
      },

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

    }

  }

}

function handleError(error) {

}
