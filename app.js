const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

const beansRouter = require('./routes/beansRouter');
const userRouter = require('./routes/userRouter');
const menuData = require('./menu.json');
app.use(express.json());

app.use('/api/beans', beansRouter);

app.use('/api/user', userRouter);
app.use('/api/user', userRouter);
app.get('/api/user', userRouter);

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