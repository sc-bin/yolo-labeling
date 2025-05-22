#!/bin/bash

COMMANDS="
cd yolo-labeling
npm install
npm run start
"
source script_docker_exec.sh "$COMMANDS" 