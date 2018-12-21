'use strict'
const data = function() {
  return {
    files: [],
    directories: [],
    middleComponent: 'Directory',
    errorMessage: undefined,
    currentPath: '/',
  };
};

const methods = {
  makeDirectory: function() {

  },
  browse: function(path) {
    this.$APIManager.browseDirectory(decodeURIComponent(path), (response) => {
      if (response.success) {
        this.currentPath = path;
        this.directories = response.result.directories;
      }
    });
  },
};

const computed = {

  prettyPath: function() {
    return decodeURIComponent(this.currentPath);
  }

};

const created = function() {
    this.browse('/');
};

export { data, methods, computed, created };
