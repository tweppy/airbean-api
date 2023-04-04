const express = require("express");
const router = express.Router();
const menuData = require("../menu.json");
const { get, add, remove } = require("../controllers/beans/orderController");
const {
  checkBody,
  checkValidItem,
  validateID,
} = require("../middleware/order/order");

router.get("/", (req, res) => {
  res.json({ success: true, menu: menuData });
});

router.get("/order", get);

router.post("/order", checkBody, checkValidItem, add);

//validateID not working when no param
router.delete("/order/:id", validateID, remove);

module.exports = router;
