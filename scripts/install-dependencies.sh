#!/usr/bin/env bash

docker image build -t install_dependencies scripts
docker container run --rm --user $(id -u):$(id -g) -v ${PWD}:/monorepo-react-node-postgres-ts -w /monorepo-react-node-postgres-ts install_dependencies:latest
