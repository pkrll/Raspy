.PHONY: all install start stop server client devclient devserver major minor patch clean

ENV = production
SERVICE = null

all: install start

install: client/package.json server/package.json
	cd client && npm install && npm run build
	cd server && npm install && npm run setup

start:
	cd server && pm2 start process.json

stop:
	cd server && pm2 stop process.json

server:
ifeq ($(ENV), dev)
	cd server && NODE_ENV=development npm run dev
else
	cd server && NODE_ENV=production npm run dev
endif

devserver:
	make ENV=dev server

client:
ifeq ($(ENV), dev)
	cd client && npm run dev
else
	cd client && npm run build
endif

devclient:
	make ENV=dev client

major:
ifeq ($(SERVICE), client)
	cd client && npm run major
	git add client/package.json
	git commit -S -m "Incremented major version"
else ifeq ($(SERVICE), server)
	cd server && npm run major
	git add server/package.json
	git commit -S -m "Incremented major version"
else
	@echo "ERROR:\tCould not increment major version."
	@echo "USAGE:\tmake SERVICE=client/server major"
endif

minor:
ifeq ($(SERVICE), client)
	cd client && npm run minor
	git add client/package.json
	git commit -S -m "Incremented minor version"
else ifeq ($(SERVICE), server)
	cd server && npm run minor
	git add server/package.json
	git commit -S -m "Incremented minor version"
else
	@echo "ERROR:\tCould not increment minor version."
	@echo "USAGE:\tmake SERVICE=client/server minor"
endif

patch:
ifeq ($(SERVICE), client)
	cd client && npm run patch
	git add client/package.json
	git commit -S -m "Incremented patch version"
else ifeq ($(SERVICE), server)
	cd server && npm run patch
	git add server/package.json
	git commit -S -m "Incremented patch version"
else
	@echo "ERROR:\tCould not increment patch version."
	@echo "USAGE:\tmake SERVICE=client/server patch"
endif

clean:
	find . -name \*.pyc -delete
	rm -rf dist/*
