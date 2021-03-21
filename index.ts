const  deploy = require('./deploy');

require('dotenv').config();

deploy.run({
  workDir: process.env.APP_WORK_DIR,
  workingSetup: process.env.APP_WORKING_SETUP,
  isPrivateKey: process.env.SERVER_USE_PRIVATE_KEY,
 });