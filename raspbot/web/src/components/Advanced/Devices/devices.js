
exports.data = function() {
  return {
    device: null,
    component: 'List',
    devices: [{"name":"sda","type":"disk","size":"14.4G","mountpoint":null},{"name":"sda1","type":"part","size":"200M","mountpoint":null},{"name":"sda2","type":"part","size":"14.1G","mountpoint":null},{"name":"mmcblk0","type":"disk","size":"14.9G","mountpoint":null},{"name":"mmcblk0p1","type":"part","size":"43.2M","mountpoint":"/boot"},{"name":"mmcblk0p2","type":"part","size":"14.8G","mountpoint":"/"}]
  }
};

exports.methods = {

  showDetails: function(device) {
    this.device = device;
    this.component = 'Details';
  },

  getDisks: function(response) {
    if (response) {
      let result = response.result;
      this.devices = response.result;
    }
  }
}
