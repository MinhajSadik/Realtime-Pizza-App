const Order = require("../../../models/order");
const Noty = require("noty");
const moment = require("moment");

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
        .then((result) => {
          req.flash("success", "Order placed successfully");
          delete req.session.cart;
          return res.redirect("customers/orders");
        })
        .catch((err) => {
          req.flash("error", "Something went wrong");

          res.redirect("/cart");
        });
    },

    //Custommer Orders Route
    async index(req, res) {
      const orders = await Order.find({ customerId: req.user._id }, null, {
        sort: { createdAt: -1 },
      });
      res.header("Cache-Control", "no-store");
      res.render("customers/orders", { orders: orders, moment: moment });
    },
  };
}

module.exports = orderController;
