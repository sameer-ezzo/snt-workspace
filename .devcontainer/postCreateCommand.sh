#!/bin/sh

sudo chown -R node:node node_modules dist
git config --global --add safe.directory /home/node/workspace
