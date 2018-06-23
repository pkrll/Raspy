.PHONY: all install build start stop server devserver client devclient updater major minor patch clean

ENV = production
SERVICE = null

all: install build start

install:
ifeq ($(SERVICE), client)
	npm run install_client
else ifeq ($(SERVICE), server)
	npm run install_server
else
	npm run install
endif

build:
ifeq ($(SERVICE), client)
	npm run build
else ifeq ($(SERVICE), server)
	npm run setup
else
	npm run build
	npm run setup
endif

start:
	pm2 start process.json --only Raspy --watch

restart:
	pm2 restart process.json --only Raspy

stop:
	pm2 stop process.json --only Raspy --watch 0

start_updater:
	pm2 start process.json --only Bootstrapper --watch

stop_updater:
	pm2 stop process.json --only Bootstrapper --watch 0

server:
ifeq ($(ENV), dev)
	NODE_ENV=development npm run dev_server
else
	NODE_ENV=production npm run dev_server
endif

devserver:
	make ENV=dev server

client:
ifeq ($(ENV), dev)
	npm run dev_client
else
	npm run build
endif

devclient:
	make ENV=dev client

update:
	git pull

major:
ifeq ($(SERVICE), $(filter $(SERVICE),client server))
	npm run major service=$(SERVICE)
	git add $(SERVICE)/package.json
	git commit -S -m "Incremented major version"
else ifeq ($(SERVICE), app)
	npm run major service=$(SERVICE)
	git add package.json
	git commit -S -m "Incremented major version"
else ifeq ($(SERVICE), all)
	npm run major
	git add package.json server/package.json client/package.json
	git commit -S -m "Incremented major version"
else
	@echo "ERROR:\tCould not increment major version."
	@echo "USAGE:\tmake SERVICE=[client|server|app|all] major"
endif

minor:
ifeq ($(SERVICE), $(filter $(SERVICE),client server))
	npm run minor service=$(SERVICE)
	git add $(SERVICE)/package.json
	git commit -S -m "Incremented minor version"
else ifeq ($(SERVICE), app)
	npm run minor service=$(SERVICE)
	git add package.json
	git commit -S -m "Incremented minor version"
else ifeq ($(SERVICE), all)
	npm run minor
	git add package.json server/package.json client/package.json
	git commit -S -m "Incremented minor version"
else
	@echo "ERROR:\tCould not increment minor version."
	@echo "USAGE:\tmake SERVICE=[client|server|app|all] minor"
endif

patch:
ifeq ($(SERVICE), $(filter $(SERVICE),client server))
	npm run patch service=$(SERVICE)
	git add $(SERVICE)/package.json
	git commit -S -m "Incremented patch version"
else ifeq ($(SERVICE), app)
	npm run patch service=$(SERVICE)
	git add package.json
	git commit -S -m "Incremented patch version"
else ifeq ($(SERVICE), all)
	npm run patch
	git add package.json server/package.json client/package.json
	git commit -S -m "Incremented patch version"
else
	@echo "ERROR:\tCould not increment patch version."
	@echo "USAGE:\tmake SERVICE=[client|server|app|all] patch"
endif

clean:
	find . -name \*.pyc -delete
	rm -rf dist/*
