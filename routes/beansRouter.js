const express = require('express');
const router = express.Router();
const menuData = require('../menu.json');
const { checkUserID } = require('../middleware/users/user');
const {
  get,
  add,
  remove,
  placeOrderAsLoginUser,
} = require('../controllers/beans/orderController');
const {
  checkBody,
  checkValidItem,
  validateID,
} = require('../middleware/order/order');
router.get('/', (req, res) => {
  res.json({ success: true, menu: menuData });
});
router.get('/order', get);
router.post('/order', checkBody, checkValidItem, add);
router.post('/:user_id/order', checkUserID, placeOrderAsLoginUser);
//validateID not working when no param
router.delete('/order/:id', validateID, remove);

module.exports = router;
