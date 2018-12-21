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

      testConnection: function(callback) {
        this.HTTP.get('health').then(response => {
          if (typeof callback === 'function') callback(response.data);
        }).catch(error => {
          if (error.message && error.message == 'Network Error') {
            if (typeof callback === 'function') callback({success: false});
          } else {
            if (typeof callback === 'function') callback(handleError(error));
          }
        });
      },

      verifyToken: function(token, callback) {
        this.HTTP.post('verify', {}, {
          headers: {
            'Authorization': "bearer " + token
          }
        }).then(response => {
          if (typeof callback === 'function') callback(response.data);
        }).catch(error => {
          console.log(error);
        });
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
          if (typeof callback === 'function') callback(response.data);
        }).catch(error => {
          if (typeof callback === 'function') callback(handleError(error));
        });
      },
      /**
       * Ends a session. Removes the auth header.
       */
      endSession: function() {
        this.HTTP = axios.create({ baseURL: apiURL, timeout: timeout });
      },
      /**
       * Browse the specified path.
       *
       * Calls the /browser endpoint.
       *
       * @param  {String} 	path 			The path to the directory list.
       * @param  {Function} callback 	The callback to invoke on response.
       */
      browseDirectory: function(path, callback) {
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
      viewFile: function(path, callback) {
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
      deleteFile: function(path, callback) {
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
      createFolder: function(path, callback) {
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
      downloadFile: function(path, saveAsName, callback) {
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
          if (typeof callback === 'function') callback({success: true});
        }).catch(error => {
          if (typeof callback === 'function') callback(handleError(error));
        });
      },
      /**
       * Retrieves system information.
       *
       * Calls the /dashboard endpoint.
       *
       * @param  {Function} callback The callback to invoke on response.
       */
      getSystemInformation: function(callback) {
        this.HTTP.get('dashboard').then(response => {
          if (typeof callback === 'function') callback(response.data);
        }).catch(error => {
          if (typeof callback === 'function') callback(handleError(error));
        });
      },
      /**
       * Changes the current users password.
       *
       * Calls the /account/password endpoint.
       *
       * @param  {String}   password The new password.
       * @param  {Function} callback The callback to invoke on response.
       */
      updatePassword: function(password, callback) {
        this.HTTP.post('account/password', { password: password }).then(response => {
          if (typeof callback === 'function') callback(response.data);
        }).catch(error => {
          if (typeof callback === 'function') callback(handleError(error));
        });
      },
      /**
       * Checks for system update.
       *
       * Calls the /raspbot/update/check endpoint
       *
       * @param  {Function} callback The callback to invoke on response.
       */
      checkForUpdate: function(callback) {
        this.HTTP.get('raspbot/update/check').then(response => {
          if (typeof callback === 'function') callback(response.data);
        }).catch(error => {
          if (typeof callback === 'function') callback(handleError(error));
        });
      },

      updateRaspbot: function(callback) {
        this.HTTP.get('raspbot/update').then(response => {
          if (typeof callback === 'function') callback(response.data);
        }).catch(error => {
          console.log(error);
          if (typeof callback === 'function') callback(handleError(error));
        });
      },

      installRaspbot: function(callback) {
        this.HTTP.get('raspbot/install').then(response => {
          if (typeof callback === 'function') callback(response.data);
        }).catch(error => {
          if (typeof callback === 'function') callback(handleError(error));
        });
      },
      /**
       * Reboots the application.
       *
       * Calls the raspbot/reboot endpoint.
       *
       * @param  {Function} callback The callback to invoke on response.
       */
      rebootRaspbot: function(callback) {
        this.HTTP.get('raspbot/reboot').then(response => {
          if (typeof callback === 'function') callback(response.data);
        }).catch(error => {
          if (error.message && error.message == 'Network Error') {
            callback({success: true});
          }
        });
      },
      /**
       * shuts down the application.
       *
       * Calls the raspbot/shutdown endpoint.
       *
       * @param  {Function} callback The callback to invoke on response.
       */
      shutdownRaspbot: function(callback) {
        this.HTTP.get('raspbot/shutdown').then(response => {
          if (typeof callback === 'function') callback(response.data);
        }).catch(error => {
          if (error.message && error.message == 'Network Error') {
            callback({success: true});
          }
        });
      },
      /**
       * Reboots the system.
       *
       * Calls the system/reboot endpoint.
       *
       * @param  {Function} callback The callback to invoke on response.
       */
      rebootSystem: function(callback) {
        this.HTTP.get('system/reboot').then(response => {
          if (typeof callback === 'function') callback(response.data);
        }).catch(error => {
          if (error.message && error.message == 'Network Error') {
            if (typeof callback === 'function') callback({success: true});
          } else {
            if (typeof callback === 'function') callback(handleError(error));
          }
        });
      },
      /**
       * Shuts down the system.
       *
       * Calls the system/shutdown endpoint.
       *
       * @param  {Function} callback The callback to invoke on response.
       */
      shutdownSystem: function(callback) {
        this.HTTP.get('system/shutdown').then(response => {
          if (typeof callback === 'function') callback(response.data);
        }).catch(error => {
          if (typeof callback === 'function') callback(handleError(error));
        });
      },
      /**
       * Retrives a list of block devices, mounted or unmounted.
       *
       * @param  {Function} callback The callback to invoke on response.
       */
      getDevices: function(callback) {
        this.HTTP.get('disks').then(response => {
          if (typeof callback === 'function') callback(response.data);
        }).catch(error => {
          if (typeof callback === 'function') callback(handleError(error));
        });
      },
      /**
       * Mounts device at mountpoint.
       *
       * @param  {String}   device     The device to mount
       * @param  {String}   mountpoint The path to mount the device at
       * @param  {Function} callback   The callback to invoke on response.
       */
      mount: function(device, mountpoint, callback) {
        this.HTTP.post('mount', {
          device: device,
          mountpoint: mountpoint
        }).then(response => {
          if (typeof callback === 'function') callback(response.data);
        }).catch(error => {
          if (typeof callback === 'function') callback(handleError(error));
        });
      },
      /**
       * Unmounts a device
       *
       * @param  {String}   mountpoint The mountpoint
       * @param  {Function} callback   The callback to invoke on response.
       */
      umount: function(mountpoint, callback) {
        this.HTTP.post('umount', { mountpoint: mountpoint }).then(response => {
          if (typeof callback === 'function') callback(response.data);
        }).catch(error => {
          if (typeof callback === 'function') callback(handleError(error));
        });
      }

    }

  }

}

function handleError(error) {
  let response = {
    success: false,
    error: { statusCode: 0, statusText: '' },
    result: (error.result) ? error.result : {}
  };

  if (error.response && error.response.data) {
    response.error = handleRequestError(error.response);
  } else if (error.code) {
    response.error = { code: error.code, message: error.message };
  } else if (error.message) {
    response.error = error.message;
  }

  return response;
}

function handleRequestError(error) {
  let response = { statusCode: error.status };

  switch (error.status) {
    case 500:
    response.message = handleInternalError(error.data.error);
    break;
    default:
    response.message = error.statusText;
    break;
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
    if (error.message) return error.message;
    break;
  }

  return error;
}
