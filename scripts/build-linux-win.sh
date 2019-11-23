#!/bin/bash

docker run --rm \
  -e ELECTRON_CACHE=$HOME/.cache/electron \
  -e ELECTRON_BUILDER_CACHE=$HOME/.cache/electron-builder \
  -e CI=$CI \
  -e GH_TOKEN=$GH_TOKEN \
  -v ${PWD}:/project \
  -v ~/.cache/electron:/root/.cache/electron \
  -v ~/.cache/electron-builder:/root/.cache/electron-builder \
  electronuserland/builder:wine \
  /bin/bash -c "\
    npm install && \
    npm run build -- --linux --win $*
  "
