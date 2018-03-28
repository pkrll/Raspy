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
	git commit -S -am "Incremented major version"

minor:
	cd client && npm run minor
	git commit -S -am "Incremented minor version"

patch:
	cd client && npm run patch
	git commit -S -am "Incremented patch version"

clean:
	find . -name \*.pyc -delete
	rm -rf dist/*
