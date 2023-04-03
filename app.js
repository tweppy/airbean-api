const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const menuData = require("./menu.json");
app.use(express.json());

app.get("/api/beans", (req, res) => {
  res.json(menuData);
});

app.listen(PORT, () => {
  console.log("Server started");
});

/*
beans
/api/beans/                         - GET menu
/api/beans/order                    - POST lägg till order
/api/beans/order/status/:orderNr    - GET pågående beställning inloggad eller gäst

user
/api/user/signup         - POST skapa konto
/api/user/login          - POST logga in
/api/user/history        - GET inloggad orderhistorik
*/