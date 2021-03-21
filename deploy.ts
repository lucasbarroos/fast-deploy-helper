const ReactDeploy = require('./stacks/react');

interface ISetupConfig {
  workingSetup: string, // React, Nodejs, Nextjs, Angularjs
  workDir?: string, // default: /var/www
  isUsingNginx?: boolean,
  isUsingPM2?: boolean,
  isPrivateKey?: boolean,
  pm2Setup?: {
    appName?: string,
  },
};

async function run({ workingSetup, workDir, isUsingNginx, isUsingPM2, isPrivateKey }: ISetupConfig) {
  switch(workingSetup) {
    case 'REACT': {
      ReactDeploy({ workDir, isPrivateKey });
      break;
    }
    default:
      console.log('Select a valid working setup');
      break;
    }
};

module.exports = {
  run,
};
