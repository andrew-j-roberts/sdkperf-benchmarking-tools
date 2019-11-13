# config

This directory will be mounted into the terraform ansible control node's container. If you follow the instructions below, your control node container will be able to provision resources on your behalf. That means this container can potentially do whatever your ssh key lets it do, so double check how many instances you select to spin up in the GUI, etc... you've been warned!

## Instructions:

1. Copy the ssh key that you'd like to be attached to your compute instances in this directory (/config)
2. Update `config.EDIT-ME.yml` with your credentials. Be sure the name of the ssh key you copied into this directory exactly matches the ssh key name you provide in this config file.
3. Rename `config.EDIT-ME.yml` to `config.yml`. If you forget to change the name of this file, you may accidentially commit your credentials to Github (i.e. `config.EDIT-ME.yml` is not .gitignored).
