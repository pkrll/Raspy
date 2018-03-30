# Raspy
<img src="docs/logo.png" data-canonical-src="docs/logo.png"/>

Raspy is a lightweight REST API server, designed for the **Raspberry Pi**, as well as a client web app.

### Requirements

To run Raspy you need the following:

* NPM (__recommended version 5.7.1+__)
* Node (__recommended version 9.2.1+__)
* Python (__developed for version 2.7.10__)
  * psutil library (__developed using version 5.4.3__)
* Flask (__developed for version 0.12.2__)

### Installation

Clone this repository on your Raspberry Pi:

```bash
$ git clone https://github.com/pkrll/RPCI
```

And run ``make install`` in the project root folder:

```bash
$ cd RPCI
$ make install
```

Before usage, you need to build the client application. In the project root folder, type:

```bash
$ make client
```

To start the server, run the command:

```bash
$ make server
```

Make sure that the client application has been built into a bundle in the ``dist`` folder before running the server.

You can do both at the same time with just the following command:

```bash
$ make
```

### Work in progress

Raspy is still a work in progress.

### Author

Raspy was created by Ardalan Samimi
