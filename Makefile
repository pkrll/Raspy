.PHONY: all install build start stop server devserver client devclient updater major minor patch clean

ENV = production
SERVICE = null

all: install build start

install:
ifeq ($(SERVICE), bootstrapper)
	npm run install:bootstrapper
else
	npm run install
endif

build:
ifeq ($(SERVICE), bootstrapper)
	npm run build:bootstrapper
else
	npm run setup
endif

start:
	pm2 start process.json --only Raspbot --watch

restart:
	pm2 restart process.json --only Raspbot

stop:
	pm2 stop process.json --only Raspbot --watch 0

start_boostrapper:
	pm2 start process.json --only Bootstrapper --watch

stop_boostrapper:
	pm2 stop process.json --only Bootstrapper --watch 0

server:
ifeq ($(ENV), dev)
	NODE_ENV=development npm run dev:server
else
	NODE_ENV=production npm run dev:server
endif

devserver:
	make ENV=dev server

client:
ifeq ($(ENV), dev)
	npm run dev:client
else
	npm run build
endif

devclient:
	make ENV=dev client

update:
	git pull

major:
ifeq ($(SERVICE), $(filter $(SERVICE),raspbot bootstrapper))
	npm run major --file=$(SERVICE)/package.json
	git add $(SERVICE)/package.json
	git commit -S -m "Incremented major version"
else
	@echo "ERROR:\tCould not increment major version."
	@echo "USAGE:\tmake SERVICE=[client|server|app|all] major"
endif

minor:
ifeq ($(SERVICE), $(filter $(SERVICE),raspbot bootstrapper))
	npm run minor --file=$(SERVICE)/package.json
	git add $(SERVICE)/package.json
	git commit -S -m "Incremented minor version"
else
	@echo "ERROR:\tCould not increment minor version."
	@echo "USAGE:\tmake SERVICE=[client|server|app|all] minor"
endif

patch:
ifeq ($(SERVICE), $(filter $(SERVICE),raspbot bootstrapper))
	npm run patch service=$(SERVICE)/package.json
	git add $(SERVICE)/package.json
	git commit -S -m "Incremented patch version"
else
	@echo "ERROR:\tCould not increment patch version."
	@echo "USAGE:\tmake SERVICE=[client|server|app|all] patch"
endif

clean:
	find . -name \*.pyc -delete
	rm -rf raspbot/dist/*
