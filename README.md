# Raspy
<img src="docs/logo.png" data-canonical-src="docs/logo.png"/>

Raspy is a lightweight REST API server, designed for the **Raspberry Pi**, as well as a client web app.

## Prerequisites

* Node Package Manager (__recommended version 5.7.1+__)
* NodeJS (__recommended version 9.2.1+__)
* Python (__developed for version 2.7.10__)
  * psutil library (__developed using version 5.4.3__)

## Installation

Clone this repository on your Raspberry Pi:

```bash
$ git clone https://github.com/pkrll/RPCI
```

And run ``make install`` in the project root folder:

```bash
$ cd RPCI
$ make install
```

This might take a while, so grab a snack and wait for the installation, build and setup processes to finish.

## Running the server

After installing all dependencies, building the client and setting up the server, you can run the server with ``make server`` in the root folder.

### With a process manager

To daemonize the application, you can use [``PM2``](https://github.com/Unitech/pm2), which is a process manager for NodeJS applications. If you do not have ``PM2`` already, install it:

```bash
$ sudo npm install -g pm2
```

Use ``pm2 start`` to run the server in the background. Make sure to set ``NODE_ENV`` to "production" before proceeding.

```bash
$ cd RPCI
$ pm2 start server/server.js

[PM2] Applying action restartProcessId on app [server](ids: 0)
[PM2] [server](0) ✓
[PM2] Process successfully started
┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────┬───────────┬───────┬──────────┐
│ App name │ id │ mode │ pid   │ status │ restart │ uptime │ cpu │ mem       │ user  │ watching │
├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────┼───────────┼───────┼──────────┤
│ server   │ 0  │ fork │ 13141 │ online │ 0       │ 0s     │ 66% │ 13.9 MB   │ pkrll │ disabled │
└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────┴───────────┴───────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app

```

To make sure ``PM2`` will run on boot you can run the ``startup`` command:

```bash
$ pm2 startup systemd
```

For more information on how to use PM2, check out **[the official documentation](http://pm2.keymetrics.io/docs/usage/cluster-mode/)** or **[this quickstart guide](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04#manage-application-with-pm2)**.

## Usage

By default, Raspy runs on port 5000 and can be accessed by ``http://ip-to-your-pi:5000``.

## Configuration

Current configuration options:

```js
// server/config/index.js
dev: {
  port: 5000,
  databasePath: 'db.json'
},
prod: {
  port: 5000,
  databasePath: 'db.json'
}
```

## Work in progress

Raspy is still a work in progress.

## Author

Raspy was created by **Ardalan Samimi**.
