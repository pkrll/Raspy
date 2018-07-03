'use strict'

exports.data = function() {
  return {
    didConfirm: false,
    textElement: ''
  }
};

exports.methods = {
  shutdown: function() {
    this.didConfirm = true;
    this.component = 'Spinner';
    this.textElement = 'Shutting down...';

    this.$APIManager.shutdownRaspbot(response => {
      this.component = 'Content';
      if (response.success) {
        this.textElement = 'Raspbot has shutdown.';
      } else {
        this.textElement = 'Could not shutdown';
      }
    });
  },

  cancel: function() {
    this.$shared.goBack(this);
  }
};
