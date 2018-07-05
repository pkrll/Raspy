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
        this.$root.didReceiveAuthenticationError();
      } else {
        this.textElement = response.error.message;
        this.middleComponent = 'Content';
      }
    }
  },

  downloadFile: function () {
    this.textElement = "Download disabled for demo";
    this.middleComponent = 'Content';
  },

  deleteFile: function (confirmation) {
    if (confirmation) {
      this.middleComponent = 'Content';
      this.textElement = 'Delete has been disabled for demo';
    } else {
      this.showConfirmation(false);
    }
  }

};
