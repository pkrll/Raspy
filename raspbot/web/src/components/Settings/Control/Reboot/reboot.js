'use strict'

exports.data = function() {
  return {
    didConfirm: false,
    textElement: ''
  }
};

exports.methods = {
  reboot: function() {
    this.didConfirm = true;
    this.component = 'Spinner';
    this.textElement = 'Rebooting...';

    this.$APIManager.rebootRaspbot(response => {
      this.component = 'Content';
      if (response.success) {
        let timer = setInterval(() => {
          this.$root.endSession();
          clearInterval(timer);
        }, 1500);
      } else {
        this.textElement = 'Could not reboot';
      }
    });
  },

  cancel: function() {
    this.$shared.goBack(this);
  }
};
