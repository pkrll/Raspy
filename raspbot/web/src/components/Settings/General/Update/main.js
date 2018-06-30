'use strict'

exports.data = function() {
  return {
    middleComponent: 'Spinner',
    heading: '',
    content: 'Checking for update...'
  }
};

exports.created = function () {
  this.$APIManager.checkForUpdate(this.didCheckForUpdate);
};

exports.methods = {

  didCheckForUpdate: function (response) {
    if (response.success) {
      let version = response.result.version;
      let isNewer = response.result.isNewer;

      if (isNewer) {
        this.heading = 'Version ' + version + ' is available!'
        this.content = '\r\n'+response.result.changes;
        this.middleComponent = 'Changelog';
      } else {
        this.content = "Software is up to date.";
        this.middleComponent = 'Content';
      }
    } else if (response.error) {
      if (response.error.statusCode == 401) {
        this.$root.didReceiveAuthenticationError();
      } else if (response.error.message) {
        this.content = response.error.message;
        this.middleComponent = 'Content';
      }
    } else {
      this.content = "Something went wrong. Could not check for update."
      this.middleComponent = 'Content';
    }
  }

}
