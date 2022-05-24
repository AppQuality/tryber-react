#!/bin/bash
set -euo pipefail

REGION="eu-west-1"
APP_NAME="crowd-react"

# enable and start docker service
systemctl enable docker.service
systemctl start docker.service

# login to ecr
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin 163482350712.dkr.ecr.eu-west-1.amazonaws.com

# read docker image version from manifest
DOCKER_IMAGE=$(cat "/home/ec2-user/$APP_NAME/docker-image.txt")
DOCKER_COMPOSE_FILE="/home/ec2-user/$APPLICATION_NAME/docker-compose.yml"
INSTANCE_ID=$(wget -q -O - http://169.254.169.254/latest/meta-data/instance-id)
ENVIRONMENT=$(aws ec2 describe-tags --filters "Name=resource-id,Values=$INSTANCE_ID" "Name=key,Values=environment" --region $REGION --output=text | cut -f5)

# pull docker image from ecr
docker pull 163482350712.dkr.ecr.eu-west-1.amazonaws.com/$DOCKER_IMAGE

# get env variables from parameter store
mkdir -p /home/ec2-user/$APPLICATION_NAME

if test -f "$DOCKER_COMPOSE_FILE"; then
    set +e
    IS_RUNNING=$(docker ps -a | grep $DOCKER_IMAGE| wc -l)
    set -e
    if [ "$IS_RUNNING" -eq "1" ]; then
        docker-compose -f $DOCKER_COMPOSE_FILE down
    fi
fi

echo "
version: '3'
services:
  app:
    image: 163482350712.dkr.ecr.eu-west-1.amazonaws.com/$DOCKER_IMAGE
    restart: always
    ports:
      - '80:80'
    environment:
      PORT: 80
      NODE_ENV: ${ENVIRONMENT}
    logging:
      driver: awslogs
      options:
        awslogs-region: eu-west-1
        awslogs-group: "${APPLICATION_NAME}-${DEPLOYMENT_GROUP_NAME}"
        awslogs-stream: ${INSTANCE_ID}
        awslogs-create-group: 'true'
" > $DOCKER_COMPOSE_FILE


docker-compose -f $DOCKER_COMPOSE_FILE up -d
