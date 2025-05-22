#!/bin/bash

COMMANDS="
cd yolo-labeling
npm install $1
"
source script_docker_exec.sh "$COMMANDS" 