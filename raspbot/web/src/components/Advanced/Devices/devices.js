
exports.data = function() {
  return {
    device: null,
    component: 'Spinner',
    devices: [],
    errorMessage: ''
  }
};

exports.methods = {

  showDetails: function(device) {
    this.device = device;
    this.component = 'Details';
  },

  getDisks: function(response) {
    if (response.success) {
      this.devices = response.result;
      this.component = 'List';
    } else {
      this.errorMessage = response.error.message;
      this.component = 'Content';
    }
  }
}

exports.created = function() {
  this.$APIManager.getDevices(this.getDisks);
}
