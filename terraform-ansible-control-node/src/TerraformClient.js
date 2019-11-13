import solace from "solclientjs";
import { spawn, exec } from "child_process";
import fs from "fs";

function TerraformClient(credentials) {
  let client = {
    // processes
    // processes: {}, maybe store the PIDs of the child processes to manage
    // functions
    runCommand: null
  };

  client.runCommand = function runCommand(command) {
    const child = spawn(`/app/./terraform`, [command]);
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
      console.log(chunk);
    });
    child.on("close", code => {
      console.log(`child process exited with code ${code}`);
    });
  };

  client.formTemplate = function formTemplate() {
    let options = {
      resource_group_id: "sdkperf-node-group-1",
      count: 1,
      ami: "ami-04b9e92b5572fa0d1",
      instance_type: "m5.large",
      vpc_security_group_id: "sg-0305946e4e38f52e4",
      subnet_id: "subnet-8c7d16e9",
      owner: "Andrew Roberts",
      ssh_user: "ubuntu"
    };

    let template = `resource "aws_instance" "${options["resource_group_id"]}" {

      count = ${options["count"]}
    
      ami                    = "${options["ami"]}" # Ubuntu
      instance_type          = "${options["instance_type"]}"
      vpc_security_group_ids = ["${
        options["vpc_security_group_id"]
      }"] # wide open
      subnet_id              = "${options["subnet_id"]}"
    
      tags = {
        Name    = "sdkperf-benchmarking-broker-node-\${count.index}"
        Owner   = "${options["owner"]}"
        Purpose = "Benchmarking"
        Days    = "1"
      }
    
      key_name               = "\${var.aws_ssh_key_name}"

      provisioner "remote-exec" {
        inline = ["echo 'SSH ready to rock'"]
    
        connection {
          host        = "\${self.public_ip}"
          type        = "ssh"
          user        = "${options["ssh_user"]}"
          private_key = "\${file("\${var.private_key_path}")}"
        }
      }
      
      provisioner "local-exec" {
        command = "ansible-playbook -i \${self.public_ip}, --private-key \${var.private_key_path} ../ansible/solace-broker-nodes.yml"
      }
    }
    `;
    console.log(template);
    // write to a new file named 2pac.txt
    fs.writeFile(
      `/terraform/${options["resource_group_id"]}.tf`,
      template,
      err => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        console.log(`${options["resource_group_id"]}.tf written.`);
      }
    );
  };

  return client;
}

export default TerraformClient;
