const fs = require('fs');
const path = require('path');
const {NodeSSH} = require('node-ssh');
const ssh = new NodeSSH();
const { exec } = require('child_process');

require('dotenv').config();

interface INodeSetupConfig {
  workDir?: string, // default: /var/www
  serverKeyfileName?: string,
  serverPassword?: string,
  isPrivateKey?: boolean, // If the server uses a private key to connects
};

interface IConnection {
  host: string,
  username: string,
  password?: string,
  privateKey?: Buffer | string,
  tryKeyboard?: boolean,
}

export const runNode = async ({ workDir, serverKeyfileName, serverPassword, isPrivateKey }) => {
  console.log('Deploying Node Application...🚚\p');
  console.log('Connecting the server...⏱️\p');
    
    let connectionOptions : IConnection = {
      host: process.env.SERVER_HOST,
      username: process.env.SERVER_USER,
      tryKeyboard: true,
    };

    if (isPrivateKey) {
      connectionOptions.privateKey = `${path.join(__dirname, '..',`${serverKeyfileName}.pem`)}`;
    } else {
      connectionOptions.password = serverPassword;
    }

    ssh.connect(connectionOptions)
      .then(() => {
        console.log('Server Connected! 🖥️\p');
        ssh.exec('git pull && lucasbarroos', [], {
          cwd: workDir,
          onStdout(chunk) {
            console.log('stdoutChunk', chunk.toString('utf8'))
            console.log('\p\pDEPLOY FINISHED! 🚚');
            ssh.dispose();
          },
          onStderr(chunk) {
            console.log('stderrChunk', chunk.toString('utf8'))
            console.log('Err 💢');
            ssh.dispose();
          },
        })
    }).catch((err) => {
      console.log('Err 💢', err);
      ssh.dispose();
    });
};