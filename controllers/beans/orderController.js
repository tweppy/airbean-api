const { getOrder, addToOrder, removeItem } = require("../../model/beans/orderModel");
const getTotalSum = require("../../utils");

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
  await addToOrder(title, price);
  
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

module.exports = { get, add, remove };
