#!/bin/bash

# Create: lun 06 dic 2021 14:16:59 EST 
# author: jjwizard

	# Install venv
	python3.8 -m venv .ENV/medicalenv
	# Active venv
	source .ENV/medicalenv/bin/activate
	# Install all dependecies
	#pip3 install Django graphene-django django-graphql-jwt django-graphql-auth psycopg2-binary django-environ
	pip3 install -r ./backend/medicalbackend/requirements.txt
	# Export all dependecies
	#python -m pip freeze > ./backend/medicalbackend/requirements.txt

exit 0
