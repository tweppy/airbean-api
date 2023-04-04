const nedb = require('nedb-promises');
const userDatabase = new nedb({
  filename: './database/users.db',
  autoload: true,
});

async function getAllUsers() {
  return await userDatabase.find({}); // Cursor {}
}

async function insertUserToDatabase(user) {
  return await userDatabase.insert(user);
}

module.exports = { getAllUsers, userDatabase, insertUserToDatabase };
