const nedb = require('nedb-promises');
const database = new nedb({ filename: './database/order.db', autoload: true });
async function getOrder() {
  return await database.find({});
}

async function addToOrder(order) {
  return await database.insert(order);
}

async function removeItem(id) {
  const itemToRemove = await database.remove({ _id: id });
  const order = await getOrder();

  if (itemToRemove) {
    return {
      success: true,
      msg: `Item with id: "${id}" removed from order`,
      order: order,
    };
  } else {
    return {
      success: false,
      msg: 'Item not found',
    };
  }
}

module.exports = {
  getOrder,
  addToOrder,
  removeItem,
  database,
};
