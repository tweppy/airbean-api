const express = require("express");
const router = express.Router();
const menuData = require("../menu.json");
const { checkUserID } = require("../middleware/users/user");
const {
  get,
  add,
  remove,
  placeOrderAsLoggedInUser,
  getOrderInformation,
} = require("../controllers/beans/orderController");
const {
  checkBody,
  checkValidItem,
  checkOrderNumber,
} = require("../middleware/order/order");

router.get("/", (req, res) => {
  res.json({ success: true, menu: menuData });
});
router.get("/order", get);
router.post("/order", checkBody, checkValidItem, add);
router.post("/order/checkout", checkUserID, checkValidItem, placeOrderAsLoggedInUser);
router.get(
  "/order/status/:order_number",
  checkOrderNumber,
  getOrderInformation
);

router.delete("/order/:id", remove);

module.exports = router;
