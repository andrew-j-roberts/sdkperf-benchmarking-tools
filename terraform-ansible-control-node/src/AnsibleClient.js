import solace from "../../terraform-service/src/node_modules/solclientjs";
import { spawn } from "child_process";

function AnsibleClient() {
  let client = {
    // variables
    playbooks: {},
    // functions
    execute: null
  };

  client.execute = function execute() {
    console.log("EXECUTE TRIGGERED");
    // form options
    let cmdOptions = "";
    // form command
    let ansibleCmd = `ansible ${cmdOptions}`;
    // execute ansible command
    const child = spawn("ansible", ["-lh", "/usr"]);
    // ansible-playbook -i ansible/inventory/sdkperf-nodes.inventory ansible/start-producer-sdkperf.yml
    child.stdout.on("data", data => {
      console.log(`stdout: ${data}`);
    });
    child.stderr.on("data", data => {
      console.error(`stderr: ${data}`);
    });
    child.on("close", code => {
      console.log(`child process exited with code ${code}`);
    });

    // use child.stdout.setEncoding('utf8'); if you want text chunks
    child.stdout.on("data", chunk => {
      // data from standard output is here as buffers
    });

    // since these are streams, you can pipe them elsewhere
    child.stderr.pipe(dest);

    child.on("close", code => {
      console.log(`child process exited with code ${code}`);
    });
  };

  return client;
}

export default AnsibleClient;
