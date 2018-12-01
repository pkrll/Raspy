'use strict'
import NoSleep from 'nosleep.js';

const noSleep = new NoSleep();

const Status = {
  WAITING: 0,
  RUNNING: 1,
  SUCCESS: 2,
  ERRORED: 3
};

export const data = function() {
  return {
    component: 'Spinner',
    heading: '',
    content: 'Checking for update...',
    logs: [],
    downloadStatus: Status.WAITING,
    installationStatus: Status.WAITING
  }
};

export const created = function() {
  this.$APIManager.checkForUpdate(this.didCheckForUpdate);
};

export const methods = {
  update: function() {
    this.component = 'Progress';
    this.content = 'Updating';

    this.downloadStatus = Status.RUNNING;

    noSleep.enable();

    this.$APIManager.updateRaspbot(response => {
      if (response.success) {
        this.logs.push(response.result);
        this.downloadStatus = Status.SUCCESS;
        this.content = "Installing"
        this.install();
      } else {
        if (response.result) this.logs.push(response.result);
        this.content = "Update could not finish"
        this.downloadStatus = Status.ERRORED;
        noSleep.disable();
      }
    });
  },

  install: function() {
    this.installationStatus = Status.RUNNING;
    this.$APIManager.installRaspbot(response => {
      if (response.success) {
        this.logs.push(response.result);
        this.installationStatus = Status.SUCCESS;
        this.content = "Update complete!"
        noSleep.disable();
      } else {
        if (response.result) this.logs.push(response.result);
        this.content = "Update could not finish"
        this.installationStatus = Status.ERRORED;
        noSleep.disable();
      }
    });
  },

  didCheckForUpdate: function(response) {
    if (response.success) {
      let version = response.result.version;
      let isNewer = response.result.isNewer;

      if (isNewer) {
        this.heading = 'Version ' + version + ' is available!'
        this.content = '\r\n'+response.result.changes;
        this.component = 'Changelog';
      } else {
        this.content = "Software is up to date.";
        this.component = 'Content';
      }
    } else if (response.error) {
      if (response.error.statusCode == 401) {
        this.$root.didReceiveAuthenticationError();
      } else if (response.error.message) {
        this.content = response.error.message;
        this.component = 'Content';
      }
    } else {
      this.content = "Something went wrong. Could not check for update."
      this.component = 'Content';
    }
  },

}
