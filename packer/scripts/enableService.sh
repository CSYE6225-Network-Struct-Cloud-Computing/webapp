#!/bin/bash

# Reload systemd manager configuration
echo "Reloading systemd manager configuration..."
sudo systemctl daemon-reload

# Check if the service file exists after reloading
if [[ -f /etc/systemd/system/runApp.service ]]; then
    echo "Service file exists after reload."
else
    echo "Service file does not exist after reload."
    exit 1
fi

# Ensure correct permissions and ownership
sudo chmod 644 /etc/systemd/system/runApp.service
sudo chown root:root /etc/systemd/system/runApp.service

# Restore SELinux context
sudo restorecon -v /etc/systemd/system/runApp.service

# Enable the service to start on boot
echo "Enabling the service..."
sudo systemctl enable runApp.service

# Start the service
echo "Starting the service..."
sudo systemctl start runApp.service

# Restart the service
echo "Restarting the service..."
sudo systemctl restart runApp.service

# Debugging: Verify the .env file exists
if [[ -f /home/csye6225/app/.env ]]; then
    echo ".env file is present."
else
    echo ".env file is missing."
fi

# Check the status of the service
echo "Checking the status of the service..."
sudo systemctl status runApp.service
