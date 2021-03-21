const fs = require('fs');
const path = require('path');
const {NodeSSH} = require('node-ssh');
const ssh = new NodeSSH();
require('dotenv').config();

interface ISetupConfig {
  workingSetup: string, // React, Nodejs, Angularjs
  workDir?: string, // default: /var/www
  isUsingNginx?: boolean,
  isUsingPM2?: boolean,
  isPrivateKey?: boolean,
};

async function run({ workingSetup, workDir, isUsingNginx, isUsingPM2, isPrivateKey }: ISetupConfig) {
  if (workingSetup === 'React') {
    console.log('Deploying the React application');
    // Connecting to the server to put the current build files
    // ssh.connect({
    //     host: process.env.SERVER_HOST,
    //     username: process.env.SERVER_USER,
    //     privateKey: `${path.join(__dirname, `${process.env.SERVER_KEYFILE_NAME}.pem`)}`,
    //   })
    //   .then(() => {

    //     console.log('Connected');
    //     ssh.execCommand('pm2 list').then((result) => {
    //       console.log('STDOUT: ' + result.stdout);
    //       // console.log('STDERR: ' + result.stderr);
    //     });
    //   });
  }
};

module.exports = {
  run,
};
