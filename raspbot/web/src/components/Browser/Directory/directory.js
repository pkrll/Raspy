'use strict';

exports.computed = {
  /**
   * Returns the parent path of the current path, or itself if the path is the root folder.
   *
   * @return {String} The parent path of the current path.
   */
  parentPath: function () {
    let _path = this.prettyPath;
    let index = _path.lastIndexOf('/');

    if (index > 0)  return _path.substring(0, index);
    if (index == 0) return '/';

    return _path;
  }
};

exports.methods = {
  /**
   * Returns the correct icon for the file.
   *
   * @param {String} filename The file name.
   */
  icon: function (filename) {
    return this.$shared.iconForFile(filename);
  }
};

exports.created = function() {

}
