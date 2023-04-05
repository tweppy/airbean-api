const express = require('express');
const router = express.Router();

const {
  checkUsernameAndEmail,
  checkUserAndPassword,
  checkValidUserID,
} = require('../middleware/users/user');
const {
  signupUser,
  loginUser,
  userOrderHistory,
} = require('../controllers/users/user');

router.post('/signup', checkUsernameAndEmail, signupUser);
router.post('/login', checkUserAndPassword, loginUser);
router.get('/:user_id/order_history', checkValidUserID, userOrderHistory);

module.exports = router;
