#!/bin/bash

# Start Docker container and execute commands inside it
docker exec tests-ipfs-1 sh -c '
  ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '"'"'["*"]'"'"' &&
  ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '"'"'["GET", "POST", "PUT"]'"'"' &&
  ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '"'"'["Authorization"]'"'"' &&
  ipfs shutdown
'
