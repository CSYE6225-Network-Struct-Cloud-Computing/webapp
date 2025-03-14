#!/bin/bash

# https://www.baeldung.com/linux/create-non-login-user
# sudo adduser csye6225 --shell /usr/sbin/nologin
# sudo su testuser1

sudo mkdir -p /home/csye6225

GROUP_NAME="csye6225"
USER_NAME="csye6225"
 
sudo groupadd $GROUP_NAME
sudo useradd -g $GROUP_NAME -s /usr/sbin/nologin -d /home/csye6225 $USER_NAME
