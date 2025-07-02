// Start of JS file
// Seed file to create collections in MongoDB,
// based off of models and <model>Seeds.json files.
const db = require('../config/connection');
const { User, Log, Geolocation } = require('../models');
const userSeeds = require('./userSeeds.json');
const logSeeds = require('./logSeeds.json');
const geoSeeds = require('./geoSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    // Clean existing data
    await cleanDB('Geolocation', 'geolocations');
    await cleanDB('Log', 'logs');
    await cleanDB('User', 'users');

    // Create users
    await User.create(userSeeds);
    
    // Create geolocations
    await Geolocation.create(geoSeeds);
    console.log('Geolocations seeded!');
    
    // Create logs and associate with users
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

  console.log('All seeding completed successfully!');
  process.exit(0);
});
// End of JS file