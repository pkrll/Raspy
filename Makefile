.PHONY: run server client clean

all: client server

install:
	cd client && npm install

server:
	cd server && export FLASK_APP=rpci.py && flask run --host=0.0.0.0

client:
	cd client && npm run build

clean:
	find . -name \*.pyc -delete
	rm -rf dist/*
