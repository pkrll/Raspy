'use strict'

exports.data = function() {
  return {
    files: [],
    directories: [],
    middleComponent: 'Spinner',
    bottomComponent: '',
    showHidden: this.$cookie.get('showHidden'),
    isFavorite: this.$root.getBookmark() == this.path,
    didClickDelete: false,
    showAdvancedOptions: false,
    toggleHiddenIcon: 'toggle-off',
    errorMessage: undefined
  }
}

exports.watch = {
  '$route' (to, from) {
    this.middleComponent = 'Spinner';
    // Remove any old stuff before changing view
    this.didClickDelete = false;
    this.showAdvancedOptions = false;
    this.isFavorite = this.$root.getBookmark() == this.prettyPath;
    let path = (to.params.path != undefined) ? decodeURIComponent(to.params.path) : '/';
    this.$APIManager.browseDirectory(path, this.browseDirectory);
  }
};

exports.computed = {

  prettyPath: function() {
    return decodeURIComponent(this.path);
  }

};

exports.methods = {

  browseDirectory: function (response) {
    if (response.success) {
      this.files = response.result.files;
      this.directories = response.result.directories;
      this.middleComponent = 'Directory';
    } else {
      this.errorMessage = response.error;
    }
  },

  makeDirectory: function() {

  },

  deleteDirectory: function() {

  }

}

exports.created = function() {
  this.$APIManager.browseDirectory(this.prettyPath, this.browseDirectory);
}
