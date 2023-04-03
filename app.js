const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const menuData = require("./menu.json");
app.use(express.json());

app.get("/api/menu", (req, res) => {
  res.json(menuData);
});

app.listen(PORT, () => {
  console.log("Server started");
});
