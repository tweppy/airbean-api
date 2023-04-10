const {
  getOrder,
  addToOrder,
  removeItem,
  database,
  updateDeliveryETA,
} = require('../../model/beans/orderModel');
const { getTotalSum, createETA } = require('../../utils');

const { v4: uuidv4 } = require('uuid');

//get
async function get(req, res) {
  const order = await getOrder();
  const total = await getTotalSum();
  await updateDeliveryETA();
  res.json({ success: true, order: order, total: total });
}

//add
async function add(req, res) {
  const { title, price } = req.body;
  const order_date = new Date().toLocaleString('sv-SE');
  const eta = createETA();
  const eta_left = eta;

  await addToOrder({
    ...req.body,
    user_id: 'Guest',
    order_number: uuidv4(),
    order_date,
    eta: eta,
    eta_left,
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
  const order_date = new Date().toLocaleString('sv-SE');
  const eta = createETA();
  const eta_left = eta;

  addToOrder({
    user_id,
    order_number: uuidv4(),
    title,
    price,
    order_date,
    eta,
    eta_left,
  });

  const result = {
    success: true,
    signed_in: true,
    user_id,
    eta,
    order_date,
    order: { title, price },
  };
  res.status(200).json(result);
}

async function getOrderInformation(req, res) {
  await updateDeliveryETA();
  const { order_number } = req.params;
  const findOrder = await database.find({ order_number: order_number });
  const result = {
    success: true,
    order_number: findOrder[0].order_number,
    eta: findOrder[0].eta_left,
    order_date: findOrder[0].order_date,
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
