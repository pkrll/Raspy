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
};

exports.watch = {
  '$route' (to, from) {
    this.middleComponent = 'Spinner';
    // Remove any old stuff before changing view
    this.didClickDelete = false;
    this.showAdvancedOptions = false;
    this.isFavorite = this.$root.getBookmark() == this.prettyPath;
    let path = (to.params.path != undefined) ? decodeURIComponent(to.params.path) : '/';
    this.$APIManager.browseDirectory(path, this.browseDirectory);
  },
  'didClickDelete' () {
    this.showConfirmation(this.didClickDelete);
  }
};

exports.computed = {

  prettyPath: function() {
    return decodeURIComponent(this.path);
  }

};

exports.methods = {

  showConfirmation: function (show) {
    this.didClickDelete = show;
    this.bottomComponent = (show) ? 'ConfirmButton' : '';
  },

  browseDirectory: function (response) {
    if (response.success) {
      this.files = response.result.files;
      this.directories = response.result.directories;
      this.middleComponent = 'Directory';
    } else {
      if (response.error.statusCode == 401) {
        this.$root.didReceiveAuthenticationError();
      } else {
        this.middleComponent = 'Content';
        this.errorMessage = response.error.message;
      }
    }
  },

  makeDirectory: function() {
    let folderName = prompt("Set folder name:");
    if (folderName != null && folderName != "") {
      let directory = this.prettyPath + '/' + folderName;

      this.$APIManager.createFolder(directory, response => {
        if (response.success) {
          this.$router.push({
            name: 'Directory',
            params: { path: encodeURIComponent(response.result.path) }
          });
        } else {
          alert(response.error);
        }
      });
    }
  },

  deleteDirectory: function (confirmation) {
    if (confirmation) {
      this.middleComponent = 'Content';
      this.errorMessage = 'Delete has been disabled for demo';
    }

    this.showConfirmation(false);
  },
  /**
   * Toggles the current path as the bookmarked path.
   */
  toggleFavorite: function () {
    if (this.isFavorite) {
      this.$root.clearBookmark();
    } else {
      this.$root.setBookmark(this.prettyPath);
    }

    this.isFavorite = !this.isFavorite;
  }

};

exports.created = function() {
  this.$APIManager.browseDirectory(this.prettyPath, this.browseDirectory);
};
