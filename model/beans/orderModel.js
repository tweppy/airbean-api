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

// async function updateDeliveryETA() {
//   const allOrders = await getOrder();
//   const orderBeenDelivered = 0;

//   for (const order of allOrders) {
//     const countdownETAOneMinute = order.eta - 1;
//     if (countdownETAOneMinute > orderBeenDelivered) {
//       await database.update(
//         { order_number: order.order_number },
//         { $set: { eta: countdownETAOneMinute } },
//         {}
//       );
//     }
//     if (countdownETAOneMinute === orderBeenDelivered) {
//       await database.update(
//         { order_number: order.order_number },
//         { $set: { eta: 'Delivered' } },
//         {}
//       );
//     }
//   }
// }
// setInterval(updateDeliveryETA, ONE_MINUTE); // update status of ETA every one minute

// ! TEST

async function ETA_stamp(orderDatePlaced, ETA) {
  const allOrders = await getOrder();
  const etaFromOrder = ETA * 1000 * 60; // convert it from minutes to milliseconds
  const order_date_milliseconds = new Date(orderDatePlaced).getTime(); // returns the timestamp in milliseconds from the order
  const currentTimeInMilliseconds = Date.now(); // current timestamp in milliseconds
  const timestampFromOrderPlacedToCurrentTime = Math.floor(
    order_date_milliseconds + etaFromOrder - currentTimeInMilliseconds
  );

  console.log('eta from placed order', ETA);
  console.log('placed', order_date_milliseconds);
  console.log('now   ', currentTimeInMilliseconds);
  console.log('diffrence in millisec', timestampFromOrderPlacedToCurrentTime);

  // convert milliseconds to minutes
  let gapInMinutes = Math.floor(
    timestampFromOrderPlacedToCurrentTime / (1000 * 60)
  );
  console.log('gapInMinutes', gapInMinutes);

  // for (const order of allOrders) {
  //   if (ETA > gapInMinutes) {
  //     console.log('gapInMinutes > ETA', gapInMinutes);
  //     await database.update(
  //       { order_number: order.order_number },
  //       { $set: { eta: gapInMinutes } },
  //       {}
  //     );
  //   }
  //   if (gapInMinutes <= 0) {
  //     console.log('gapInMinutes <= 0', gapInMinutes);
  //     await database.update(
  //       { order_number: order.order_number },
  //       { $set: { eta: 'Delivered' } },
  //       {}
  //     );
  //   }
  // }
}

module.exports = {
  getOrder,
  addToOrder,
  removeItem,
  database,
  ETA_stamp, // ! test
};
