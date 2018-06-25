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
          if (typeof callback === 'function') callback(response.data);
        }).catch(error => {
          console.log(error);
        });
      },

      test: function (callback) {
        this.HTTP.get('test').then(response => {
          callback(response);
        }).catch(error => {
          console.log(error.response);
        })
      }

    }

  }

}
