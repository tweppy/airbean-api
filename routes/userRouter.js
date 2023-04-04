const express = require('express');
const router = express.Router();

const {
  checkUsernameAndEmail,
  checkUserAndPassword,
  checkUserID,
} = require('../middleware/users/user');
const {
  signupUser,
  loginUser,
  userOrderHistory,
} = require('../controllers/users/user');

router.post('/signup', checkUsernameAndEmail, signupUser);
router.post('/login', checkUserAndPassword, loginUser);
router.get('/:user_id/order_history', checkUserID, userOrderHistory);

module.exports = router;
