const nedb = require('nedb-promises');
const database = new nedb({ filename: './database/order.db', autoload: true });
const ONE_MINUTE = 60000; // 60000 milliseconds = 1 min

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
  const orderBeenDelivered = 0;

  for (const order of allOrders) {
    const countdownETAOneMinute = order.eta - 1;
    if (countdownETAOneMinute > orderBeenDelivered) {
      await database.update(
        { order_number: order.order_number },
        { $set: { eta: countdownETAOneMinute } },
        {}
      );
    }
    if (countdownETAOneMinute === orderBeenDelivered) {
      await database.update(
        { order_number: order.order_number },
        { $set: { eta: 'Delivered' } },
        {}
      );
    }
  }
}
setInterval(updateDeliveryETA, ONE_MINUTE); // update status of ETA every one minute

module.exports = {
  getOrder,
  addToOrder,
  removeItem,
  database,
};
