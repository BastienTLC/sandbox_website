#!/bin/bash

git pull
ng build --configuration production
cp -r ./dist/sandbox_website/* ../server/frontend/
pm2 restart index