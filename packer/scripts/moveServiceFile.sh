#!/bin/bash

sudo mv /tmp/runApp.service /etc/systemd/system/runApp.service

# Verify the file has been moved
if [[ -f /etc/systemd/system/runApp.service ]]; then
    echo "Service file moved successfully."
else
    echo "Failed to move the service file."
    exit 1
fi