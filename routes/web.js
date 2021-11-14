const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const orderController = require("../app/http/controllers/customers/orderController");
const guest = require("../app/http/middlewares/guest");
const auth = require("../app/http/middlewares/auth");
const Admin = require("../app/http/middlewares/admin");
const adminOrderController = require("../app/http/controllers/admin/orderController");

function initRoutes(app) {
  //All Routes
  app.get("/", homeController().index);

  app.get("/login", guest, authController().login);

  app.post("/login", authController().postLogin);

  app.get("/register", guest, authController().register);

  app.post("/register", authController().postRegister);

  app.post("/logout", authController().logout);

  app.get("/cart", cartController().index);

  app.post("/update-cart", cartController().update);

  // Customers Routes
  app.post("/orders", auth, orderController().store);

  app.get("/customers/orders", auth, orderController().index);

  //Admin Routes
  app.get("/admin/orders", Admin, adminOrderController().index);
}

module.exports = initRoutes;
