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
  convert: function (bytes) {
    return this.$shared.bytesToHumanReadable(bytes);
  },

  update: function () {
    this.$APIManager.getSystemInformation(this.didFinishRequest);
  },

  didFinishRequest: function (response) {
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
  },

  convertTemperature: function (temperature) {
    if (temperature == null || temperature == 'NaN') return 'N/A';
    if (this.temperatureScale == 'f') {
      return (temperature * (9/5) + 32).toFixed(2) + '°F';
    }

    return temperature + '°C';
  }
};
