const db = require('../config/connection');
const { Task, Project } = require('../models');
const taskSeeds = require('./taskSeeds.json')

db.once('open', async () => {
  try {
    await Task.deleteMany({});
    console.log('----- Database Cleared -----');

    const tasks = await Task.create(taskSeeds);
    tasks.forEach(task => Project.findByIdAndUpdate(
        { _id: task.projectId },
        { $addToSet: { tasks: { _id: task._id } } },
        { new: true }
        )); 
    console.log('----- Database Seeded! ------');

    process.exit(0);
  } catch (err) {
    throw err;
  }
});
