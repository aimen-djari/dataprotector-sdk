#!/bin/bash

cd ~/dataprotector-sdk/packages/sdk/tests/ &&
./prepare_ipfs.sh &&
cd ../../sharing-smart-contract &&
npm run deploy &&
cd ../sdk &&
npm run refresh-abis &&
npm run codegen &&
npm run build &&
cd ../protected-data-delivery-dapp/deployment &&
npm run refresh-abis &&
cd src/ &&
tsx createAddOnlyAppWhitelistScript.ts &&
#tsx addAppToWhitelistScript.ts &&
cd /opt/Services &&
DIRS='wp-core wp-worker'
for DIR in $DIRS;do
        cd "$DIR" &&
        docker compose down &&
        docker compose up -d &&
        cd ..
done
./publish_wp_order.sh &&
cd requester &&
./publish_multiple_app_orders.sh &&
cd ~/dataprotector-sdk/packages/demo/usecase-demo &&
npm run dev
