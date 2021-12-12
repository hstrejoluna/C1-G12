#!/bin/bash

    pssw=$1
    dbname=$2
    dbuser=$3
    dbpass=$4
    echo "$pssw $dbname $dbuser $dbpass"
    # Postgres Commands
    echo "DROP DATABASE IF EXISTS $dbname;" > /tmp/postgres.sql
    echo "CREATE DATABASE $dbname;" >> /tmp/postgres.sql
    echo "GRANT ALL PRIVILEGES ON DATABASE $dbname TO $dbuser;" >> /tmp/postgres.sql
    # Postgres Commands
    sudo su - postgres
    psql -f /tmp/postgres.sql

exit 0