
exports.data = function() {
  return {
    favoritFolder: 'None',
    showHidden: false
  }
};

exports.created = function() {
  const faveFolder = this.$root.getBookmark();
  const showHidden = this.$cookie.get('showHidden');
  if (faveFolder != null) this.favoritFolder = decodeURIComponent(faveFolder);
  if (showHidden != null) this.showHidden = showHidden;
};

exports.methods = {
  /**
   * Removes the current bookmark.
   */
  clearBookmark: function () {
    if (this.favoritFolder != 'None') {
      this.$root.clearBookmark();
      this.favoritFolder = 'None';
    }
  },
  /**
   * Toggle show hidden files.
   */
  toggleHiddenFiles: function () {
    this.showHidden = !this.showHidden;

    if (this.showHidden) {
      this.$cookie.set('showHidden', true, {expires: '1Y'});
    } else {
      this.$cookie.delete('showHidden');
    }
  }
};

exports.filters = {
  /**
   * Replaces true with on and false with off.
   *
   * @param  {Boolean} value 	The boolean value to replace.
   * @return {String}       	'On' if value is true, otherwise 'off'.
   */
  showHiddenLabel: function (value) {
    return (value) ? 'On' : 'Off';
  }
};
