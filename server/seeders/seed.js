// Start of JS file
// Seed file to create collections in MongoDB,
// based off of models and <model>Seeds.json files.
const db = require('../config/connection');
const { User, Log } = require('../models');
const userSeeds = require('./userSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try{
  await cleanDB('Log', 'logs');

  await cleanDB('User', 'users');

  await User.create(userSeeds);

  for (let i = 0; i < logSeeds.length; i++) {
    const { _id, logAuthor } = await Log.create(logSeeds[i]);
    const user = await User.findOneAndUpdate(
      { username: logAuthor },
      {
        $addToSet: {
          logs: _id,
        },
      }
    );
  }
} catch (err) {
  console.error(err);
  process.exit(1);
}

  console.log('all done!');
  process.exit(0);
});
// End of JS file