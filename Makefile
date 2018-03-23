.PHONY: run server client clean

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

clean:
	find . -name \*.pyc -delete
	rm -rf dist/*
