const { execFile } = require('child_process');

module.exports = {

  do: function(command, callback) {
    let commands = {
      update:   ['make', ['update']],
      restart:  ['make', ['restart']],
      stop:     ['make', ['stop']]
    }

    runCommand(commands[command][0], commands[command][1], callback)
  },

}

function runCommand(command, arguments, callback) {
  execFile(command, arguments, (error, stdout, stderr) => {
    let response = {
      status: 0,
      data: (error) ? stderr : stdout
    }

    if (typeof callback === 'function') callback(response);
  });
}
