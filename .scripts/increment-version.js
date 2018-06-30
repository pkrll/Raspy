'use strict'
let terminal = require('./colors.js')();

let semindex 	= 2;
let incrBuild = true;
let rsetBuild = false;
let rsetPatch = false;
let rsetMinor = false;
let jsonfile  = null;

let argv = process.argv.slice(2);
if (argv.length > 0 && argv.includes('-h')) {
  terminal.print("Usage: node " + process.argv[1] + " [arguments]", terminal.colors.cyan);
  terminal.print("\nCommands:", terminal.colors.yellow, terminal.styles.bright);
  terminal.print("  --file            The package.json file", terminal.colors.green);
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

  if (value.includes("file=")) {
    value = value.split("=");
    if (value.length < 2) { throw Err("No service chosen."); }
    jsonfile = value[1];
  } else if (value.includes("--version=")) {
    value = value.split("=");
    if (value.length > 1) {
      if 			(value[1] == 'major') semindex = 0;
      else if (value[1] == 'minor') semindex = 1;
      else if (value[1] == 'patch') semindex = 2;
      else if (value[1] == 'build') semindex = -1;
    }
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

if (jsonfile) incrementBuild(jsonfile);

function incrementBuild(filePath) {
  fs.readFile(filePath, function(err, data) {
  	if (err) throw err;

  	let content = JSON.parse(data);
  	let version = content.version;
    let build   = content.build;

  	if (version) {
  		let semver = version.split('.');

  		if (semindex >= 0) {
  			if (semindex != 2 && rsetPatch) {
  				semver[2] = 0;
  			}
        if (semindex != 1 && rsetMinor) {
  				semver[1] = 0;
  			}

        terminal.print(filePath + ": Incrementing version number ...", terminal.colors.magenta, terminal.styles.dim);
  			semver[semindex] = parseInt(semver[semindex]) + 1;
  			version = semver.join('.');
  		}

  		if (incrBuild && build) {
  			terminal.print(filePath + ": Incrementing build number ...", terminal.colors.magenta, terminal.styles.dim);
  			build = (parseInt("0x"+build) + 1).toString(16);
  		} else if (rsetBuild) {
  			build = 0;
  		}
  	}

  	if (version)  content.version = version;
    if (build)    content.build = build;

    fs.writeFile(filePath, JSON.stringify(content, null, 2), function(err) {
  		if(err) throw err;
  		terminal.print(filePath + ": Version set to " + content.version, terminal.colors.green, terminal.styles.bright);
  	})
  });
}
