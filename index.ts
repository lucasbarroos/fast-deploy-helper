const  deploy = require('./deploy');

require('dotenv').config();

deploy.run({
  workDir: process.env.APP_WORK_DIR,
  workingSetup: process.env.APP_WORKING_SETUP,
  serverKeyfileName: process.env.SERVER_KEYFILE_NAME,
  serverPassword: process.env.SERVER_PASSWORD,
  isPrivateKey: process.env.SERVER_USE_PRIVATE_KEY,
 });