FROM postgres:15.2

COPY ./docker/script/init.sql /docker-entrypoint-initdb.d