#!/bin/bash
sudo setsebool httpd_can_network_connect 1
/usr/bin/node /home/csye6225/app/server.js
