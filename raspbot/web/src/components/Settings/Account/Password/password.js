'use strict'

exports.data = function() {
  return {
    password: '',
    message: ''
  }
};

exports.methods = {
  updatePassword: function() {
    if (this.password.length > 0) {
      this.$APIManager.updatePassword(this.password, response => {
        if (response.success) {
          this.message = 'Password changed!';
        } else {
          this.message = 'Could not change password'
        }
      });
    }
  }
};
