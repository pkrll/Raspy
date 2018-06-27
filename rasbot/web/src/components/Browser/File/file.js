'use strict'

exports.data = function () {
  return {
    didClickDelete: false,
    middleComponent: 'Spinner',
    bottomComponent: '',
    textElement: 'Loading...',
    file: undefined
  }
};

exports.created = function () {
  this.$APIManager.viewFile(this.prettyPath, this.viewFile);
};

exports.watch = {
  'didClickDelete' () {
    this.showConfirmation(this.didClickDelete);
  }
};

exports.computed = {

  prettyPath: function () {
    return this.$shared.prettyPath(this.path);
  }

};

exports.methods = {

  goBack: function () {
    this.$shared.goBack(this);
  },

  showConfirmation: function (show) {
    this.didClickDelete = show;
    this.bottomComponent = (show) ? 'ConfirmButton' : '';
  },

  viewFile: function (response) {
    if (response.success) {
      this.file = {
        filename: response.result.filename,
        metadata: response.result.metadata
      };

      this.middleComponent = 'Details';
    } else {
      if (response.error.statusCode == 401) {
        this.$root.didReceiveAuthenticationError(this.$root._route.fullPath);
      } else {
        this.textElement = response.error.message;
        this.middleComponent = 'Content';
      }
    }
  },

  downloadFile: function () {
    this.middleComponent = 'Spinner';

    this.$APIManager.downloadFile(this.prettyPath, this.file.filename, response => {
      if (response.success) {
        this.middleComponent = 'Details';
      } else {
        this.textElement = "Could not download file."
        this.middleComponent = 'Content';
      }
    });
  },

  deleteFile: function (confirmation) {
    if (confirmation) {
      this.middleComponent = 'Spinner';

      this.$APIManager.deleteFile(this.prettyPath, response => {
        if (response.success) {
          this.$shared.goBack(this);
        } else {
          this.textElement = response.error.message;
          this.middleComponent = 'Content';
        }
      });
    } else {
      this.showConfirmation(false);
    }
  }

};
