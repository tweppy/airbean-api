const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

const beansRouter = require('./routes/beansRouter');

app.use(express.json());

app.use('/api/beans', beansRouter);

const { getAllUsers, userDatabase } = require('./model/users/user');
const menuData = require('./menu.json');
const {
  checkUsernameAndEmail,
  checkUserAndPassword,
} = require('./middleware/users/user');
const { signupUser, loginUser } = require('./controllers/users/user');

// app.get('/api/beans', (req, res) => {
//   res.json(menuData);
// });

app.post('/api/user/signup', checkUsernameAndEmail, signupUser);
app.post('/api/user/login', checkUserAndPassword, loginUser);

app.get('/api/:user_id/order_history', async (req, res) => {
  const user_id = await req.params.user_id;
  console.log(typeof user_id);
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
});

app.listen(PORT, () => {
  console.log('Server started');
});

/*
beans
/api/beans/                         x GET menu
/api/beans/order                    x GET + POST lägg till order
/api/beans/order/status/:orderNr    - GET pågående beställning inloggad eller gäst

user
/api/user/signup         - POST skapa konto
/api/user/login          - POST logga in
/api/user/history        - GET inloggad orderhistorik
*/
