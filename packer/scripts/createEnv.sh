#!/bin/bash

touch /tmp/.env 
echo "PORT=$PORT" >> /tmp/.env 
echo "MYSQL_USERNAME=$MYSQL_USERNAME" >> /tmp/.env 
echo "MYSQL_PASSWORD=$MYSQL_PASSWORD" >> /tmp/.env 
echo "MYSQL_DB_NAME=$MYSQL_DB_NAME" >> /tmp/.env 
echo "TEST_MYSQL_DB_NAME=$TEST_MYSQL_DB_NAME" >> /tmp/.env 
echo "NODE_ENV=production" >> /tmp/.env
echo "MYSQL_HOST=localhost" >> /tmp/.env
sudo mv /tmp/.env /home/csye6225/app/.env

sudo chmod 644 /home/csye6225/app/.env
sudo chown csye6225:csye6225 /home/csye6225/app/.env

# if [ "$(getenforce)" = "Enforcing" ]; then
#   sudo chcon -t systemd_unit_file_t /home/csye6225/app/.env
# fi