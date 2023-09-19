const db = require('../config/connection');
const { User, Project, Task, Team } = require('../models');
const userSeeds = require('./userSeeds.json');
const projectSeeds = require('./projectSeeds.json');



db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
    await Team.deleteMany({});
    console.log('----- Database Cleared -----');

    await User.create(userSeeds);
    await Project.create(projectSeeds);
    console.log('----- Database Seeded! ------');

    process.exit(0);
  } catch (err) {
    throw err;
  }
});
