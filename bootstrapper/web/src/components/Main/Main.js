'use strict'

exports.methods = {
  go: function () {
    this.component = 'Login';
  }
}

exports.created = function () {

  this.$socket.on('authentication:required', response => {
    console.log(response);
  })

}
