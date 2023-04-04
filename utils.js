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

module.exports = getTotalSum;
