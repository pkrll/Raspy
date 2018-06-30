'use strict'

exports.data = function() {
  const temp = this.$cookie.get('temperatureScale');
  const rate = this.$cookie.get('refreshRate');

  return {
    refreshRate:      (rate) ? rate : 0,
    temperatureScale: (temp) ? temp : 'c'
  }
};

exports.created = function() {

};

exports.methods = {
  /**
   * Toggles the temperature scale between Celsius and Fahrenheit.
   */
  switchTemperatureScale: function () {
    if (this.temperatureScale == 'c') {
      this.temperatureScale =	'f';
    } else {
      this.temperatureScale = 'c';
    }
  }
};

exports.filters = {
  /**
   * Replaces f with Fahrenheit, and everything else with Celsius
   *
   * @param  {String} value The value to replace.
   * @return {String}       Fahrenheit if the value is f, otherwise Celsius.
   */
  temperatureLabel: function (value) {
    return (value == 'f') ? 'Fahrenheit' : 'Celsius';
  }
};

exports.watch = {
  'refreshRate' () {
    this.$cookie.set('refreshRate', this.refreshRate, { expires: '1Y' });
  },

  'temperatureScale' () {
    this.$cookie.set('temperatureScale', this.temperatureScale, { expires: '1Y' });
  }
}
