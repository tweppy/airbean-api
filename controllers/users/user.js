const { database } = require('../../model/beans/orderModel');
const { v4: uuidv4 } = require('uuid');
const { insertUserToDatabase, getAllUsers } = require('../../model/users/user');

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
        user: 'Approved',
        user_id: user.user_id,
      };
      return res.status(200).json(result);
    }
  }
  const result = {
    status: false,
    message: 'Please try again',
  };
  return res.status(400).json(result);
}

async function userOrderHistory(req, res) {
  const { user_id } = await req.params;
  const users = await getAllUsers();
  const findUser = await users.find((user) => user.user_id === user_id);
  const findOrderHistory = await database.find({ user_id: user_id });
  const totalSpending = findOrderHistory.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0
  );

  if (findUser) {
    const result = {
      status: true,
      user_id: findUser?.user_id,
      // user_id: findUser[0]?.user_id,
      total_orders: findOrderHistory.length,
      total_spending: totalSpending,
      order_history: findOrderHistory,
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
