const menuData = require('../../menu.json');
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

module.exports = { checkBody, checkValidItem, validateID };
