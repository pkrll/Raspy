
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
  },

  unmount: function() {
    this.$APIManager.umount(this.device.mountpoint, (response) => {
      if (response.success) {
        this.device.mountpoint = undefined;
        this.component = 'Details';
      } else {
        this.errorMessage = response.error.message;
        this.component = 'Content';
      }
    });
  },

  mount: function() {
    this.component = 'Select';
  },

  didClickSelect: function(mountpoint) {
    this.$APIManager.mount(this.device.name, mountpoint, (response) => {
      if (response.success) {
        this.device.mountpoint = mountpoint;
        this.component = 'Details';
      } else {
        this.errorMessage = response.error.message;
        this.component = 'Content';
      }
    });
  },

  didClickCancel: function(a) {
    this.component = 'Details';
  }
}

exports.created = function() {
  this.$APIManager.getDevices(this.getDisks);
}
