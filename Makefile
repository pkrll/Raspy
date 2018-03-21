all:
	export FLASK_APP=rpci.py && flask run

clean:
	find . -name \*.pyc -delete
