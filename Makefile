.PHONY: all install install_client install_server build start stop server devserver client devclient updater major minor patch clean

ENV = production
SERVICE = null

all: install build start

install:
ifeq ($(SERVICE), client)
	make install_client
else ifeq ($(SERVICE), server)
	make install_server
else
	make install_client
	make install_server
endif

install_client:
	cd raspbot/web && npm install

install_server:
	cd raspbot && npm install
	cd raspbot && npm run setup

build:
	npm run build

start:
	pm2 start process.json --only Raspbot --watch

restart:
	pm2 restart process.json --only Raspbot

stop:
	pm2 stop process.json --only Raspbot --watch 0

server:
ifeq ($(ENV), dev)
	cd raspbot && NODE_ENV=development npm run dev
else
	cd raspbot && NODE_ENV=production npm run dev
endif

devserver:
	make ENV=dev server

client:
ifeq ($(ENV), dev)
	cd raspbot && npm run dev:client
else
	cd raspbot && npm run build
endif

devclient:
	make ENV=dev client

update:
	git pull

major:
ifeq ($(SERVICE), $(filter $(SERVICE),raspbot))
	node .scripts/increment-version.js --version=major --skip-build --reset-minor --reset-patch --file=$(SERVICE)/package.json
else
	@echo "ERROR:\tCould not increment major version."
	@echo "USAGE:\tmake SERVICE=[raspbot] major"
endif

minor:
ifeq ($(SERVICE), $(filter $(SERVICE),raspbot))
	node .scripts/increment-version.js --version=minor --skip-build --reset-patch --file=$(SERVICE)/package.json
else
	@echo "ERROR:\tCould not increment minor version."
	@echo "USAGE:\tmake SERVICE=[raspbot] minor"
endif

patch:
ifeq ($(SERVICE), $(filter $(SERVICE),raspbot))
	node .scripts/increment-version.js --version=patch --skip-build --file=$(SERVICE)/package.json
else
	@echo "ERROR:\tCould not increment patch version."
	@echo "USAGE:\tmake SERVICE=[raspbot] patch"
endif

clean:
	find . -name \*.pyc -delete
	rm -rf raspbot/node_modules/ raspbot/web/node_modules
