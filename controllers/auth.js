const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((user) => {
      console.log(user);
      res.status(200);
      res.json(user);
    })
    .catch((err) => {
      res.status(400);
      console.log(err);
      res.json({
        error: err,
      });
    });
};

exports.signin = (req, res) => {
  const { email, plainPassword } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user.authenticate(plainPassword)) {
        res.status(401);
        res.json({
          error: "Email and Password do not match",
        });
        return;
      }

      const token = jwt.sign(
        { _id: user._id, admin: user.admin },
        "helpinghands"
      );

      res.cookie("token", token, {
        domain: ".werhelpinghands.tk",
      });
      const { _id, firstName, email, admin } = user;
      res.status(200);
      res.json({
        token,
        user: { _id, firstName, email, admin },
      });
    })
    .catch((err) => {
      res.status(400);
      res.json({
        error: "User not found",
      });
    });
};

exports.OAuth = (req, res) => {
  const { email } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user === null) {
        res.status(400);
        res.json({
          error: "User not found",
        });
        return;
      }
      console.log(user);
      const token = jwt.sign(
        { _id: user._id, admin: user.admin },
        "helpinghands"
      );

      res.cookie("token", token, {
        sameSite: true,
      });
      const { _id, firstName, email, admin } = user;
      res.status(200);
      res.json({
        token,
        user: { _id, firstName, email, admin },
      });
    })
    .catch((err) => {
      res.status(400);
      res.json({
        error: "User not found",
      });
    });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfull",
  });
};

exports.isOldUser = (req, res) => {
  let email = req.params.email;
  User.findOne({ email })

    .then((user) => {
      if (user === null) {
        res.status(200);
        res.json({
          exist: false,
        });
        return;
      }

      res.status(200);
      res.json({
        exist: true,
      });
    })
    .catch((err) => {
      res.status(200);
      res.json({
        exist: false,
      });
    });
};

// Protected Routes
exports.isSignedIn = expressJwt({
  secret: "helpinghands",
  requestProperty: "user",
});

// Custom Middlewares
exports.isAdmin = (req, res, next) => {
  if (!req.user.admin) {
    res.status(403);
    res.json({
      error: "ACCESS DENIED, You are not Admin",
    });
    return;
  }
  next();
};
