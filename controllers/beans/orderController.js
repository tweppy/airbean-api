const {
  getOrder,
  addToOrder,
  removeItem,
} = require('../../model/beans/orderModel');
const getTotalSum = require('../../utils');
const { v4: uuidv4 } = require('uuid');

//get
async function get(req, res) {
  const order = await getOrder();
  const total = await getTotalSum();
  res.json({ success: true, order: order, total: total });
}

//add
async function add(req, res) {
  const { title, price } = req.body;
  await addToOrder({
    ...req.body,
    order_number: uuidv4(),
    date: new Date().toISOString(), // ! TEST
  });
  const fullOrder = await getOrder();

  const result = {
    success: true,
    order: fullOrder,
    msg: `${title} added to order`,
  };

  res.json(result);
}

//remove
async function remove(req, res) {
  const id = req.params.id;
  const result = await removeItem(id);
  res.json(result);
}

function placeOrderAsLoginUser(req, res) {
  const { user_id, title, price } = req.body;

  addToOrder({ user_id, order_number: uuidv4(), title, price });

  const result = {
    success: true,
    signed_in: true,
    user_id,
    title,
    price,
  };
  res.status(200).json(result);
}

function getETA(req, res) {
  res.status(200).json({ success: true });
}

module.exports = { get, add, remove, placeOrderAsLoginUser, getETA };
