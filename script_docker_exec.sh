#!/bin/bash
NODE_VER="20.0.0"
COMMAND=$1
ADD_SETTING=$2

if [ -z "$COMMAND" ]; then
    docker run \
        --network host \
        -v /etc/hosts:/etc/hosts:ro \
        -v /etc/resolv.conf:/etc/resolv.conf:ro \
        -v /etc/localtime:/etc/localtime:ro \
        -v "$(pwd):$(pwd)" \
        -w "$(pwd)" \
        -it --rm node:${NODE_VER} /bin/bash
else
    docker run \
        --network host \
        -v /etc/hosts:/etc/hosts:ro \
        -v /etc/resolv.conf:/etc/resolv.conf:ro \
        -v /etc/localtime:/etc/localtime:ro \
        -v "$(pwd):$(pwd)" \
        -w "$(pwd)" \
        -it --rm node:${NODE_VER} /bin/bash -c "$COMMAND"
fi
