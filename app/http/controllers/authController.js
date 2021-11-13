const User = require("../../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

function authController() {
  return {
    login(req, res) {
      res.render("auth/login");
    },

    //Post Of Login
    postLogin(req, res, next) {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }
        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }
          return res.redirect("/");
        });
      })(req, res, next);
    },

    //Register
    register(req, res) {
      res.render("auth/register");
    },

    //Post Of Register
    async postRegister(req, res) {
      const { name, email, password } = req.body;

      //Validate request
      if (!name || !email || !password) {
        req.flash("error", "All field Are Required");
        return res.redirect("/register");
      }

      //Check if user exists ?
      User.exists({ email: email }, (err, result) => {
        if (result) {
          req.flash("error", "Email Already Taken");
          return res.redirect("/register");
        }
      });

      //Hash Password
      const hashedPassword = await bcrypt.hash(password, 10);

      //Create User
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      user
        .save()
        .then((user) => {
          // Auto Login page redirect
          return res.redirect("/login");
        })
        .catch((err) => {
          req.flash("error", "Something Went Wrong");
          return res.redirect("/register");
        });

      // console.log(req.body);
    },
  };
}

module.exports = authController;
