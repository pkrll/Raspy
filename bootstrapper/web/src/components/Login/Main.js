'use strict'

exports.data = function () {
  return {
    username: '',
    password: ''
  }
};

exports.methods = {
  signIn: function () {
    let message = {
      params: { username: this.username, password: this.password }
    };
    this.$socket.emit('client:login', message);
  }
};

exports.created = function () {
  this.$socket.on('login', response => {
    this.$emit('handleLoginResponse', response);
  });
};
