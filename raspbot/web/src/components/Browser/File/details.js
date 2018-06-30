'use strict'

exports.computed = {
  icon: function () {
    return this.$shared.iconForFile(this.file.filename);
  }
};

exports.methods = {
  /**
   * Converts milliseconds to a human readable format.
   *
   * @param  {Int} 		timestamp Time in milliseconds
   * @return {String}						The date in a human readable format.
   */
  convertDate: function (timestamp) {
    return this.$dateFormatter.unixtimeToString(timestamp, true);
  },

  convertSize: function (bytes) {
    return this.$shared.bytesToHumanReadable(bytes);
  }
};
