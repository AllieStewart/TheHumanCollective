// Start of JS file
// Seed file to create collections in MongoDB,
// based off of models and <model>Seeds.json files.
const db = require('../config/connection');
const { User } = require('../models');
const userSeeds = require('./userSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    await cleanDB('User', 'users');

    await User.create(userSeeds);

    // try, catch at start
    // connect User to log/comment?

  console.log('all done!');
  process.exit(0);
});
// End of JS file