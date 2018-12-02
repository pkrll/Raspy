'use strict'
import * as Browser from '@/components/Browser/Main/main.js';

const data = function() {
  return {
    files: [],
    directories: [],
    middleComponent: 'Spinner',
    errorMessage: undefined
  };
};

const methods = {
  browseDirectory: Browser.methods.browseDirectory,
  makeDirectory: Browser.methods.makeDirectory,
  didClickSelect: function() {

  },
  didClickCancel: function() {

  }
};

const computed = {
  prettyPath: Browser.computed.prettyPath
};

const created = function () {
  this.$APIManager.browseDirectory(this.prettyPath, this.browseDirectory);
};

export { data, methods, computed, created };
