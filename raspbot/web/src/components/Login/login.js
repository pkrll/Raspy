'use strict'

exports.data = function () {
  return {
    username: '',
    password: ''
  }
}

exports.methods = {
  _signIn: function () {
    this.$emit('signIn', this.username, this.password);
  }
}

exports.mounted = function () {

}
