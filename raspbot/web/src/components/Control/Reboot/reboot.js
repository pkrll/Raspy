'use strict'

exports.data = function() {
  return {
    component: 'ConfirmPage',
    textElement: 'Are you sure you want to reboot Raspbot?',
    confirmButtonTitle: 'Reboot',
    cancelButtonTitle: 'Cancel'
  }
};

exports.methods = {
  reboot: function() {
    this.component = 'Spinner';
    this.textElement = 'Rebooting...';

    this.$APIManager.rebootRaspbot(response => {
      this.component = 'Content';
      if (response.success) {
        let timer = setInterval(() => {
          this.$APIManager.testConnection(response => {
            if (response.success) {
              clearInterval(timer);
              this.$root.endSession()
            }
          });
        }, 2000);
      } else {
        this.textElement = 'Could not reboot';
      }
    });
  },

  cancel: function() {
    this.$shared.goBack(this);
  }
};
