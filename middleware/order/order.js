const menuData = require('../../menu.json');
const { database } = require('../../model/beans/orderModel');
const menu = menuData.menu;

function checkBody(req, res, next) {
  const body = req.body;

  if (body?.title && body?.price) {
    next();
  } else {
    const result = {
      success: false,
      error: 'Invalid body input',
      hasTitle: body.hasOwnProperty('title'),
      hasPrice: body.hasOwnProperty('price'),
    };

    res.status(400).json(result);
  }
}

function checkValidItem(req, res, next) {
  const body = req.body;
  const productExists = menu.some((product) => product.title === body.title);
  const validPrice = menu.some(
    (product) => product.title === body.title && product.price === body.price
  );

  if (productExists && validPrice) {
    next();
  } else {
    const result = {
      success: false,
      error: 'Invalid order',
      productExists: productExists,
      validPrice: validPrice,
    };

    res.status(400).json(result);
  }
}

//not working
function validateID(req, res, next) {
  // const id = req.body._id;
  const id = req.params.id;

  if (id) {
    next();
  } else {
    console.log('err');
    res.status(400).json({ success: false, msg: 'Invalid ID input' });
  }
}

async function checkOrderNumber(req, res, next) {
  const { order_number } = req.params;
  const findOrderNumber = await database.findOne({
    order_number: order_number,
  });

  if (findOrderNumber) {
    next();
  } else {
    const result = {
      success: false,
      message: 'Order does not exist',
    };
    res.status(401).json(result);
  }
}
module.exports = { checkBody, checkValidItem, validateID, checkOrderNumber };
