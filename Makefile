.PHONY: all install server client devclient clean major minor patch

ENV = prod

all: client server

install:
	cd client && npm install

server:
	cd server && export FLASK_APP=rpci.py && flask run --host=0.0.0.0

client:
ifeq ($(ENV), dev)
	cd client && npm run dev
else
	cd client && npm run build
endif

devclient:
	make ENV=dev client

major:
	cd client && npm run major
	git add client/package.json
	git commit -S -m "Incremented major version"

minor:
	cd client && npm run minor
	git add client/package.json
	git commit -S -m "Incremented minor version"

patch:
	cd client && npm run patch
	git add client/package.json
	git commit -S -m "Incremented patch version"

clean:
	find . -name \*.pyc -delete
	rm -rf dist/*
