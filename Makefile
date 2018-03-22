all:
	export FLASK_APP=rpci.py && flask run --host=0.0.0.0

run:
	python rpci.py

clean:
	find . -name \*.pyc -delete
