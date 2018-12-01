'use strict'

exports.data = function() {
  return {
    component: 'ConfirmPage',
    textElement: 'Are you sure you want to quit Raspbot?',
    confirmButtonTitle: 'Shutdown',
    cancelButtonTitle: 'Cancel'
  }
};

exports.methods = {
  shutdown: function() {
    this.component = 'Spinner';
    this.textElement = 'Shutting down...';

    this.$APIManager.shutdownRaspbot(response => {
      this.component = 'Content';
      if (response.success) {
        let timer = setInterval(() => {
          clearInterval(timer);
          this.$root.endSession()
        }, 1500);
      } else {
        this.textElement = 'Could not shutdown';
      }
    });
  },

  cancel: function() {
    this.$shared.goBack(this);
  }
};
