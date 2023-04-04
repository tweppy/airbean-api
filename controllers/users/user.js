const { insertUserToDatabase, getAllUsers } = require('../../model/users/user');

const { v4: uuidv4 } = require('uuid');

function signupUser(req, res) {
  const { username, email, password } = req.body;
  if (username && email && password) {
    const result = {
      status: true,
      message: 'User successfully created! ✅',
    };
    insertUserToDatabase({
      username,
      email,
      password,
      user_id: uuidv4(),
      order_history: [],
    });
    res.status(200).json(result);
  } else {
    const result = {
      status: false,
      message: 'Something went wrong!',
    };
    res.status(400).json(result);
  }
}

async function loginUser(req, res) {
  const { username, email, password } = req.body;
  const users = await getAllUsers();
  for (const user of users) {
    if (
      (username === user.username || email === user.email) &&
      password === user.password
    ) {
      const result = {
        status: true,
        user_id: user.user_id,
        // order_history: user.order_history,
      };
      return res.status(200).json(result);
    }
  }
  const result = {
    status: false,
    message: 'Please try again',
  };
  return res.status(200).json(result);
}
async function userOrderHistory(req, res) {
  const user_id = await req.params.user_id;
  const users = await getAllUsers();
  const findUser = await users.find((user) => user.user_id === user_id);
  if (findUser) {
    const result = {
      status: true,
      user_id: findUser?.user_id,
      order_history: findUser?.order_history,
    };
    res.status(200).json(result);
  } else {
    const result = {
      status: false,
      message: 'User authentication failed! ⛔️',
    };
    res.status(400).json(result);
  }
}
module.exports = { signupUser, loginUser, userOrderHistory };
