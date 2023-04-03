const express = require("express");
const router = express.Router();

const menuData = require("../menu.json");
const { checkBody, checkValidItem, order } = require("../middleware/order");
const getTotalSum = require("../utils");

router.get("/", (req, res) => {
  res.json({ success: true, menu: menuData });
});

router.get("/order", (req, res) => {
  res.json({ success: true, order: order, total: getTotalSum() });
});

router.post("/order", checkBody, checkValidItem, (req, res) => {
  const { title, price } = req.body;

  const orderItem = {
    title: title,
    price: price,
  };

  order.push(orderItem);

  const result = {
    success: true,
    msg: `${title} added to order`,
    order: order,
  };

  res.json(result);
});

module.exports = router;
