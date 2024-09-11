#!/bin/bash

# Source nvm script to make nvm command available
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm use 20 &&
docker stop $(docker ps -a -q) &&
docker container prune -f &&
docker volume rm $(docker volume ls -q --filter dangling=true) &&
#docker volume prune -f &&
cd packages/sharing-smart-contract &&
npm run compile &&
cd ../subgraph &&
npm run refresh-abis &&
cd ../sdk/tests &&
node prepare-test-env.js &&
docker compose up -d &&
./prepare_ipfs.sh &&
cd ../../kvs &&
docker compose up -d
