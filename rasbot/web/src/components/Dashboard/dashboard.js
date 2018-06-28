'use strict'

exports.data = function() {
  return {
    ram: {},
    cpu: {},
    disk: 0,
    temperature: 0,
    intervalID: null,
    temperatureScale: undefined
  }
};

exports.created = function() {
  this.update();
  this.temperatureScale = this.$cookie.get('temperatureScale');

  let refreshRate = this.$cookie.get('refreshRate');
  if (refreshRate > 0) {
    this.intervalID = setInterval(this.update, refreshRate * 1000);
  }
};

exports.beforeDestroy = function() {
  if (this.intervalID != null) clearInterval(this.intervalID);
};

exports.methods = {
  /**
   * Converts the given bytes to a human readable format.
   *
   * This function uses the shared plugin function
   * `bytesToHumanReadable`.
   *
   * @param  {Int}    bytes   The bytes to convert.
   * @return {String}         The bytes converted.
   */
  convert: function (bytes) {
    return this.$shared.bytesToHumanReadable(bytes);
  },
  /**
   * Updates the dashboard.
   */
  update: function () {
    this.$APIManager.getSystemInformation(response => {
      if (response.success) {
        this.ram = response.result.ram;
        this.cpu = response.result.cpu;
        this.disk = response.result.disk;
        this.temperature = this.convertTemperature(response.result.temperature);
      } else {
        if (response.error.statusCode == 401) {
          this.$root.didReceiveAuthenticationError(this.$root._route.fullPath);
        }
      }
    });
  },
  /**
   * Conversts
   * @param  {[type]} temperature [description]
   * @return {[type]}             [description]
   */
  convertTemperature: function (temperature) {
    if (temperature == null || temperature == 'NaN') return 'N/A';
    if (this.temperatureScale == 'f') {
      return (temperature * (9/5) + 32).toFixed(2) + '°F';
    }

    return temperature + '°C';
  }
};
