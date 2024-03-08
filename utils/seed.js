const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { userData } = require('./userData');
const { thoughtData } = require('./thoughtData');

connection.on('error', (err) => err);


connection.once('open', async () => {
    console.log('connected');
    // Delete the collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }
  
    const users = userData;
    const thoughts = thoughtData
  
    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);
  

    for (const thought of thoughts) {
      const user = await User.findOneAndUpdate(
          { username: thought.username},
          { $addToSet: { thoughts: thought } },
          { new: true }
      );
  }

    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
  });
  