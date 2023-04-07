const {
  getOrder,
  addToOrder,
  removeItem,
  database,
} = require('../../model/beans/orderModel');
const { getTotalSum, createETA } = require('../../utils');
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
    date: new Date().toLocaleString('sv-SE'),
    eta: createETA(),
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
  const eta = createETA();
  const date = new Date().toLocaleString('sv-SE');

  addToOrder({
    user_id,
    order_number: uuidv4(),
    title,
    price,
    date,
    eta,
  });

  const result = {
    success: true,
    signed_in: true,
    user_id,
    eta,
    date,
    order: { title, price },
  };
  res.status(200).json(result);
}

async function getOrderInformation(req, res) {
  const { order_number } = req.params;
  const findOrder = await database.find({ order_number: order_number });
  const result = {
    success: true,
    order_number: findOrder[0].order_number,
    eta: findOrder[0].eta,
    date: findOrder[0].date,
  };
  res.status(200).json(result);
}

module.exports = {
  get,
  add,
  remove,
  placeOrderAsLoginUser,
  getOrderInformation,
};
