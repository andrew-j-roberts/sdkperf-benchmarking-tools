FROM ubuntu:latest

LABEL maintainer="Andrew.Roberts@solace.com"

# file system
RUN mkdir -p /config
RUN mkdir -p /app/src
RUN mkdir -p /app/dest
RUN mkdir -p /ansible
RUN mkdir -p /terraform

# source
ADD .env /app/
ADD package*.json /app/
ADD src /app/src/

WORKDIR /app

# image dependencies = {
RUN apt-get update -y \
  # curl:
  && apt-get install -y curl \
  # sudo:
  && apt-get install -y sudo \
  # unzip:
  && apt-get install -y unzip \
  # wget:
  && apt-get install -y wget 
# Node.js:
RUN curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
RUN sudo apt-get install -y nodejs
# Terraform:
RUN wget https://releases.hashicorp.com/terraform/0.12.13/terraform_0.12.13_linux_arm.zip
RUN unzip terraform_0.12.13_linux_arm.zip
# Ansible:

# }

# install app dependencies, build app, and then remove dev packages
RUN npm install
RUN npm run build
RUN npm prune --production

# start the app
CMD [ "npm", "run", "start"]