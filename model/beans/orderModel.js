const nedb = require("nedb-promises");
const database = new nedb({ filename: "./database/order.db", autoload: true });

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
      msg: `Item with id: ${id} removed from order`,
      order: order,
    };
  } else {
    return {
      success: false,
      msg: "Item not found",
    };
  }
}

async function updateDeliveryETA() {
  const allOrders = await getOrder();
  const orderBeenDelivered = 0;

  for (const order of allOrders) {
    const currentTimestamp = Date.now(); // todays date and time converted to => timestamp in milliseconds
    const orderETATimestamp = order.eta * 1000 * 60; // example eta: 5 => 300000 milliseconds
    const orderDateTimestamp = new Date(order.order_date).getTime(); // returns the order_date timestamp in milliseconds, order example: (2023-04-10 10:25:25 => 1681115125000)

    // Return the current gap/remaining time from the original timestamp of orderDateTimestamp and original orderETATimestamp together. Then subtract the currentTimestamp to get the new remaining time.
    const gapFromOrderPlacedToCurrentTimestamp = Math.floor(
      orderDateTimestamp + orderETATimestamp - currentTimestamp
    );

    // Convert the milliseconds timestamp to minutes. ( 1 second = 1000 milliseconds | 1 min = 60 seconds | (1000 * 60) = 60000 milliseconds )
    let gapInMinutes = Math.floor(
      gapFromOrderPlacedToCurrentTimestamp / (1000 * 60)
    );

    // When the gapInMinutes (currentTimestamp) gets bigger it will get closer to the order_date + eta.
    if (gapInMinutes > orderBeenDelivered) {
      await database.update(
        { order_number: order.order_number },
        { $set: { eta_left: gapInMinutes } }, // update the eta_left based on the original eta
        {}
      );
    }
    if (gapInMinutes <= orderBeenDelivered) {
      await database.update(
        { order_number: order.order_number },
        { $set: { eta_left: "Delivered" } },
        {}
      );
    }
  }
}

module.exports = {
  getOrder,
  addToOrder,
  removeItem,
  database,
  updateDeliveryETA,
};
