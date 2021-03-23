const fs = require('fs');
const path = require('path');
const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();
const { exec } = require('child_process');

require('dotenv').config();

interface IAngularJSSetupConfig {
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
}

export const runAngularJS = async ({ workDir, serverKeyfileName, serverPassword, isPrivateKey }) => {
  console.log('Deploying AngularJS Application...🚚');
  // Generating the build files
  const pathToApp = path.join(__dirname, '../../');
  console.log('Generating the AngularJS Build...🏗️');

  exec(`npm --prefix ${pathToApp} run build`, (err, stdout, stderr) => {
    if (err) {
      console.log('Error generating the build 💢', err);
      return;
    }

    console.log('AngularJS Build is done! 🤩');

    console.log('Connecting the server...⏱️');
    let connectionOptions: IConnection = {
      host: process.env.SERVER_HOST,
      username: process.env.SERVER_USER,
    };

    if (isPrivateKey) {
      connectionOptions.privateKey = `${path.join(__dirname, '..', `${serverKeyfileName}.pem`)}`;
    } else {
      connectionOptions.password = serverPassword;
    }

    ssh.connect(connectionOptions)
      .then(() => {
        console.log('Server Connected! 🖥️');

        const failed = []
        const successful = []
        ssh.putDirectory(`${pathToApp}public`, workDir, {
          recursive: true,
          validate: function () {
            return true;
          },
          tick: function (localPath, remotePath, error) {
            if (error) {
              console.log('Error to transfer 💢', error);
              failed.push(localPath)
            } else {
              successful.push(localPath)
            }
          }
        }).then(function (status) {
          console.log('The directory transfer was', status ? 'successful' : 'unsuccessful')
          console.log('Failed transfers: ', failed.join(', '))
          console.log('Successful transfers: ', successful.join(', '))

          console.log('\p\pDEPLOY FINISHED! 🚚');
          ssh.dispose();
        }).catch(function (err) {
          console.log('Err 💢', err);
        });
      });
  });
};
