const User = require('./models/User');

const seedUsers = async () => {
  const existingUsers = await User.find();
  if (existingUsers.length > 0) {
    console.log('Users already exist. Skipping seeding.');
    return;
  }

  const userNames = ['Rahul', 'Kamal', 'Sanak', 'Pooja', 'Amit', 'Nina', 'Raj', 'Anjali', 'Vikas', 'Meera'];

  const users = userNames.map(name => ({ name }));
  await User.insertMany(users);

  console.log('Seeded 10 users successfully.');
};

module.exports = seedUsers;
