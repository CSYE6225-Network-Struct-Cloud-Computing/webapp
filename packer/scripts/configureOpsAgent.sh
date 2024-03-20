#!/bin/bash

LOG_FILE_PATH="/home/csye6225/app/logs-app/app.log"

touch $LOG_FILE_PATH

cat << EOF | sudo tee /etc/google-cloud-ops-agent/config.yaml > /dev/null
logging:
  receivers:
    my-app-receiver:
      type: files
      include_paths:
        - $LOG_FILE_PATH
      record_log_file_path: true
  processors:
    my-app-processor:
      type: parse_json
      time_key: timestamp
      time_format: "%Y-%m-%dT%H:%M:%S.%LZ"
  service:
    pipelines:
      default_pipeline:
        receivers: [my-app-receiver]
        processors: [my-app-processor]
EOF

sudo systemctl restart google-cloud-ops-agent