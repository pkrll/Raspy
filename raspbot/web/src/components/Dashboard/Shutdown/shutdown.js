'use strict'

exports.data = function() {
  return {
    component: 'ConfirmPage',
    textElement: 'Are you sure you want to power off the system?',
    confirmButtonTitle: 'Shutdown',
    cancelButtonTitle: 'Cancel'
  }
};

exports.methods = {

  shutdown: function() {
    this.component = 'Spinner';
    this.textElement = 'Shutting down...';

    this.$APIManager.shutdownSystem(response => {
      this.component = 'Content';
      if (response.success) {
        this.textElement = 'System has shut down.';
      } else {
        this.textElement = 'Could not shutdown the system.';
      }
    });
  },

  cancel: function() {
    this.$shared.goBack(this);
  }
};
