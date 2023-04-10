let { database } = require("./model/beans/orderModel");

async function getTotalSum() {
  const order = await database.find({ price: { $gt: 1 } });

  if (order.length > 0) {
    const sum = order
      .map((item) => item.price)
      .reduce((prev, next) => prev + next);
    return sum;
  }
}

function createETA() {
  const deliveryMinTime = 2;
  const deliveryMaxTime = 10;

  // random number between 2 - 10 min
  let generateRandomDeliveryTime = Math.floor(
    Math.random() * (deliveryMaxTime - deliveryMinTime + 1) + deliveryMinTime
  );
  return generateRandomDeliveryTime;
}

module.exports = { getTotalSum, createETA };
