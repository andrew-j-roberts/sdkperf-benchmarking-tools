/**
 * Server.js
 * Listen for and respond to Ansible commands
 * @author Andrew Roberts
 */

// load regenerator-runtime and env variables before anything else
import "regenerator-runtime";
import dotenv from "dotenv";
let result = dotenv.config();
if (result.error) {
  throw result.error;
}

import yaml from "js-yaml";
import fs from "fs";
import SolaceClient from "./SolaceClient";
import TerraformClient from "./TerraformClient";
import { spawn, exec } from "child_process";

async function start() {
  // load in config file
  let config;
  try {
    config = yaml.safeLoad(fs.readFileSync("/config/config.yml", "utf8"));
  } catch (e) {
    console.log(e);
  }

  // initialize Solace client
  let solaceClient = SolaceClient(function onError() {
    process.exit(1);
  });
  // connect to Solace event broker
  try {
    await solaceClient.connect();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  let terraformClient = TerraformClient(config["credentials"]);

  solaceClient.subscribe(
    "terraform/template/CREATE",
    function formTemplateHandler() {
      terraformClient.formTemplate();
    }
  );
  // solaceClient.subscribe(
  //   "terraform/template/DELETE",
  //   function formTemplateHandler() {
  //     terraformClient.formTemplate();
  //   }
  // );

  solaceClient.subscribe("terraform/init", function initCommandEventHandler() {
    terraformClient.runCommand("apply");
  });
  solaceClient.subscribe(
    "terraform/apply",
    function applyCommandEventHandler() {
      terraformClient.runCommand("init");
    }
  );
  solaceClient.subscribe(
    "terraform/destroy",
    function destroyCommandEventHandler() {
      terraformClient.runCommand("destroy");
    }
  );

  // run server until told to exit
  console.log("Press Ctrl-C to exit");
  process.stdin.resume();
  process.on("SIGINT", function() {
    process.exit(0);
  });
}

start();
