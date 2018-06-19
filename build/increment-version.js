'use strict'
let terminal = require('./colors.js')();

let semindex 	= 2;
let incrBuild = true;
let rsetBuild = false;
let rsetPatch = false;
let rsetMinor = false;

let service = {
  default: "package.json",
  server: "server/package.json",
  client: "client/package.json"
};
console.log(process.argv);
process.exit(0);
let argv = process.argv.slice(2);
if (argv.length > 0 && argv.includes('-h')) {
  terminal.print("Usage: node " + process.argv[1] + " [arguments]", terminal.colors.cyan);
  terminal.print("\nCommands:", terminal.colors.yellow, terminal.styles.bright);
  terminal.print("  service         The service: [ client | server ]", terminal.colors.green);
  terminal.print("\nOptions:", terminal.colors.yellow, terminal.styles.bright);
  terminal.print("  --version         The version number to increment [ major | minor | patch | build ]", terminal.colors.green);
  terminal.print("  --skip-build      Do not increment the build number", terminal.colors.green);
  terminal.print("  --reset-build     Reset the build version number", terminal.colors.green);
  terminal.print("  --reset-patch     Reset the patch version number", terminal.colors.green);
  terminal.print("  --reset-minor     Reset the minor version number", terminal.colors.green);
  process.exit(0);
}

var fs = require('fs');

for (let index in argv) {
  let value = argv[index];

  if (value.includes("service=")) {
    value = value.split("=");

    if (value.length < 2) { continue; }

    switch (value[1]) {
      case 'server':
        delete service.default;
        delete service.client;
        break;
      case 'client':
        delete service.default;
        delete service.server;
        break;
      case 'app':
        delete service.server;
        delete service.client;
        break;
      default:
        break;
    }
  } else if (value.includes("--version=")) {
    value = value.split("=");
    if (value.length > 1) {
      if 			(value[1] == 'major') semindex = 0;
      else if (value[1] == 'minor') semindex = 1;
      else if (value[1] == 'patch') semindex = 2;
      else if (value[1] == 'build') semindex = -1;
    } else if (value == '--skip-build') {
			incrBuild = false;
		} else if (value == '--reset-build') {
			rsetBuild = true;
		} else if (value == '--reset-patch') {
			rsetPatch = true;
		} else if (value == '--reset-minor') {
			rsetMinor = true;
		}
  }
}

for (let key in service) {
  incrementBuild(service[key]);
}

function incrementBuild(filePath) {
  fs.readFile(filePath, function(err, data) {
  	if (err) throw err;

  	let content = JSON.parse(data);
  	let version = content.version.split('+');

  	if (version.length > 0) {
  		let semver = version[0].split('.');

  		if (semindex >= 0) {
  			if (semindex != 2 && rsetPatch) {
  				semver[2] = 0;
  			} else if (semindex != 1 && rsetMinor) {
  				semver[1] = 0;
  			}

        terminal.print(filePath + ": Incrementing version number ...", terminal.colors.magenta, terminal.styles.dim);
  			semver[semindex] = parseInt(semver[semindex]) + 1;
  			version[0] = semver.join('.');
  		}

  		if (incrBuild) {
  			terminal.print(filePath + ": Incrementing build number ...", terminal.colors.magenta, terminal.styles.dim);
  			version[1] = (parseInt("0x"+version[1]) + 1).toString(16);
  		} else if (rsetBuild) {
  			version[1] = 0;
  		}
  	}

  	content.version = version.join('+');

    fs.writeFile(filePath, JSON.stringify(content, null, 2), function(err) {
  		if(err) throw err;
  		terminal.print(filePath + ": Version set to " + content.version, terminal.colors.green, terminal.styles.bright);
  	})
  });
}
