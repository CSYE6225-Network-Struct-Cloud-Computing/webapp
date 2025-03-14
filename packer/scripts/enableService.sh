#!/bin/bash

# sudo chmod 644 /etc/systemd/system/runApp.service
sudo chown -R csye6225:csye6225 /etc/systemd/system/runApp.service

# Restore SELinux context
# sudo restorecon -v /etc/systemd/system/runApp.service

sudo systemctl daemon-reload
sudo systemctl enable runApp.service

# Start the service
# echo "Starting the service..."
# sudo systemctl start runApp.service

# # Restart the service
# echo "Restarting the service..."
# sudo systemctl restart runApp.service

# Debugging: Verify the .env file exists
# if [[ -f /home/csye6225/app/.env ]]; then
#     echo ".env file is present."
# else
#     echo ".env file is missing."
# fi

# Check the status of the service
# echo "Checking the status of the service..."
# sudo systemctl status runApp.service
