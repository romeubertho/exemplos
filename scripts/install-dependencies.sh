#!/usr/bin/env bash

sudo sh ./scripts/create_hosts.sh
docker image build -t install_dependencies scripts
docker container run --rm --user $(id -u):$(id -g) -v ${PWD}:/exemplos -w /exemplos install_dependencies:latest
