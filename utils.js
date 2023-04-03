let { order } = require("./middleware/order");

function getTotalSum() {
  if (order.length > 0) {
    const sum = order
      .map((item) => item.price)
      .reduce((prev, next) => prev + next);
    return sum;
  }
}

module.exports = getTotalSum;
