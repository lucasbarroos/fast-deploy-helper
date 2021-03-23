const ReactDeploy = require('./stacks/react');
const NodeDeploy = require('./stacks/node');
const AngularDeploy = require('./stacks/angular');

interface ISetupConfig {
  workingSetup: string, // React, Nodejs, Nextjs, Angularjs
  workDir?: string, // default: /var/www
  serverKeyfileName?: string,
  serverPassword?: string,
  isUsingNginx?: boolean,
  isUsingPM2?: boolean,
  isPrivateKey?: boolean,
  pm2Setup?: {
    appName?: string,
  },
};

async function run({ workingSetup, workDir, serverKeyfileName, serverPassword, isUsingNginx, isUsingPM2, isPrivateKey }: ISetupConfig) {
  switch (workingSetup.toUpperCase()) {
    case 'REACT': {
      ReactDeploy.runReact({ workDir, serverKeyfileName, serverPassword, isPrivateKey });
      break;
    }
    case 'NODE': {
      NodeDeploy.runNode({ workDir, serverKeyfileName, serverPassword, isPrivateKey });
      break;
    }
    case 'ANGULARJS': {
      AngularDeploy.runAngularJS({ workDir, serverKeyfileName, serverPassword, isPrivateKey });
      break;
    }
    case 'NEXT': {
      console.log('Under construction... 🧑‍💻');
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
