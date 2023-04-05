const { getAllUsers } = require('../../model/users/user');

async function checkUsernameAndEmail(req, res, next) {
  const { username, email } = await req.body;
  const users = await getAllUsers();

  for (const user of users) {
    if (username === user.username || email === user.email) {
      const result = {
        status: false,
        message: `${
          user.username === username
            ? 'Username already exist'
            : 'Email already exists'
        }`,
      };
      return res.status(404).json(result);
    }
  }
  return next();
}

async function checkUserAndPassword(req, res, next) {
  const { username, email, password } = await req.body;
  const users = await getAllUsers();
  for (const user of users) {
    if (
      (username === user.username || email === user.email) &&
      password === user.password
    ) {
      return next();
    }
    const result = {
      status: false,
      message: 'User not found! ⛔️',
    };
    return res.status(400).json(result);
  }
}

async function checkUserID(req, res, next) {
  const user_id = await req.params.user_id;
  const users = await getAllUsers();
  const findUser = await users.find((user) => user.user_id === user_id);
  if (findUser) {
    next();
  } else {
    const result = {
      status: false,
      user: 'Denied',
      message: 'Invalid user-ID! ⛔️',
    };
    res.status(401).json(result);
  }
}
module.exports = { checkUsernameAndEmail, checkUserAndPassword, checkUserID };
