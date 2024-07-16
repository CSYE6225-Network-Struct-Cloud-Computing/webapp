#!/bin/bash

sudo mv /tmp/runApp.service /etc/systemd/system/runApp.service

sudo chmod 644 /home/csye6225/app/.env
sudo chown csye6225:csye6225 /home/csye6225/app/.env

# Verify the file has been moved
if [[ -f /etc/systemd/system/runApp.service ]]; then
    echo "Service file moved successfully."
else
    echo "Failed to move the service file."
    exit 1
fi

# If SELinux is enforcing, set the correct SELinux context
if [ "$(getenforce)" = "Enforcing" ]; then
  sudo chcon -t systemd_unit_file_t /home/csye6225/app/.env
fi