const Order = require("../../../models/order");
function orderController() {
  return {
    //Orders Route
    store(req, res) {
      const { phone, address, products } = req.body;
      if (!phone || !address) {
        req.flash("error", "Please fill all the fields");
        return res.redirect("/cart");
      }

      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone,
        address,
      });

      order
        .save()
        .then((order) => {
          req.flash("success", "Order placed successfully");
          res.redirect("/customer/orders");
        })
        .catch((err) => {
          res.flash("error", "Something went wrong");
          res.redirect("/cart");
        });
    },
    //Custommer Orders Route
    async index(req, res) {
      const orders = await Order.find({ customerId: req.user._id });
      console.log(orders);
    },
  };
}

module.exports = orderController;
