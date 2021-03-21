const fs = require('fs');
const path = require('path');
const {NodeSSH} = require('node-ssh');
const ssh = new NodeSSH();
const { exec } = require('child_process');

require('dotenv').config();

interface IReactSetupConfig {
  workDir?: string, // default: /var/www
  isPrivateKey?: boolean, // If the server uses a private key to connects
};

async function index({ workDir = '/var/www', isPrivateKey = false }: IReactSetupConfig) {
  console.log('Deploying React Application...🚚');
    // Generating the build files
    const pathToApp = path.join(__dirname, '../../');
    console.log('Generating the React Build...🏗️');

    exec(`npm --prefix ${pathToApp} run build`, (err, stdout, stderr) => {
      if (err) {
        console.log('Error generating the build 💢', err);
        return;
      }

      console.log('React Build is done! 🤩');

      console.log('Connecting the server...⏱️');
      ssh.connect({
          host: process.env.SERVER_HOST,
          username: process.env.SERVER_USER,
          password: process.env.SERVER_USE_PRIVATE_KEY ? undefined : process.env.SERVER_PASSWORD,
          privateKey: process.env.SERVER_USE_PRIVATE_KEY ? `${path.join(__dirname, '..',`${process.env.SERVER_KEYFILE_NAME}.pem`)}` : undefined,
        })
        .then(() => {
          console.log('Server Connected! 🖥️');

          const failed = []
          const successful = []
          ssh.putDirectory(`${pathToApp}build`, process.env.APP_WORK_DIR, {
            recursive: true,
            validate: function() {
              return true;
            },
            tick: function(localPath, remotePath, error) {
              if (error) {
                failed.push(localPath)
              } else {
                successful.push(localPath)
              }
            }
          }).then(function(status) {
            console.log('The directory transfer was', status ? 'successful' : 'unsuccessful')
            console.log('Failed transfers', failed.join(', '))
            console.log('Successful transfers', successful.join(', '))

            console.log('\p\pDEPLOY FINISHED! 🚚');
          }).catch(function(err) {
            console.log('Err 💢', err);
          });
        });
    });
};

module.exports = index;