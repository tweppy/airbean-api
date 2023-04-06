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

async function updateDeliveryETA() {
  const allOrders = await getOrder();
  const orderHasBeenDelivered = 0;

  for (const order of allOrders) {
    const countdownETAOneMinute = order.eta - 1;
    if (countdownETAOneMinute > orderHasBeenDelivered) {
      await database.update(
        { order_number: order.order_number },
        { $set: { eta: countdownETAOneMinute } },
        {}
      );
    }
    if (countdownETAOneMinute === orderHasBeenDelivered) {
      await database.update(
        { order_number: order.order_number },
        { $set: { eta: 'Delivered' } },
        {}
      );
    }
  }
}
setInterval(updateDeliveryETA, 60000);

module.exports = {
  getOrder,
  addToOrder,
  removeItem,
  database,
};
