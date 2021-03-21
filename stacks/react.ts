const fs = require('fs');
const path = require('path');
const {NodeSSH} = require('node-ssh');
const ssh = new NodeSSH();
const { exec } = require('child_process');

require('dotenv').config();

async function index() {
  console.log('Deploying React Application');
    // Generating the build files
    const pathToApp = path.join(__dirname, '../../');
    exec(`npm --prefix ${pathToApp} run build`, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        console.log('Error generating the build', err);
        return;
      }
    
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
    

    //  Connecting to the server to put the current build files
    // ssh.connect({
    //     host: process.env.SERVER_HOST,
    //     username: process.env.SERVER_USER,
    //     privateKey: `${path.join(__dirname, '..',`${process.env.SERVER_KEYFILE_NAME}.pem`)}`,
    //   })
    //   .then(() => {
    //     console.log('Connected');
    //     ssh.execCommand('pm2 list').then((result) => {
    //       console.log('STDOUT: ' + result.stdout);
    //     // console.log('STDERR: ' + result.stderr);
    //     });
    //   });
};

module.exports = index;