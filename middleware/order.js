const menuData = require("../menu.json");
const menu = menuData.menu;
let order = [];

function checkBody(req, res, next) {
  const body = req.body;

  if (body?.title && body?.price) {
    next();
  } else {
    const result = {
      success: false,
      error: "Invalid body input",
      hasTitle: body.hasOwnProperty("title"),
      hasPrice: body.hasOwnProperty("price"),
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
      error: "Invalid order",
      productExists: productExists,
      validPrice: validPrice,
    };

    res.status(400).json(result);
  }
}

//delete item:

module.exports = { checkBody, checkValidItem, order };
