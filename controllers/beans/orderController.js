const {
  getOrder,
  addToOrder,
  removeItem,
} = require('../../model/beans/orderModel');
const getTotalSum = require('../../utils');

//get
async function get(req, res) {
  const order = await getOrder();
  const total = await getTotalSum();
  res.json({ success: true, order: order, total: total });
}

//add
async function add(req, res) {
  const { title, price } = req.body;
  const fullOrder = await getOrder();
  await addToOrder(req.body);

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
  const user_id = req.params.user_id;
  const { title, price } = req.body;

  addToOrder({ user_id, title, price });

  const result = {
    success: true,
    signed_in: true,
    user_id: user_id,
    title,
    price,
  };
  res.status(200).json(result);
}

module.exports = { get, add, remove, placeOrderAsLoginUser };
