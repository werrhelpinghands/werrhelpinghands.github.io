const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { v1: uuidv1 } = require("uuid");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const sendRecoveryEmail = (email, name, code) => {
  const mailer = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: `Helpinh Hands Account Recovery`,
    html: `<h3>Hi ${name}</h3> 
          <p>You recently requested to reset your password for your account. Use the button below to reset it.</p>
          <a style="padding: 5px;" href="https://www.werhelpinghands.tk/recover.html?code=${code}">Reset Password</a>`,
  };

  mailer
    .sendMail(mailOptions)
    .then((mail) => {
      console.log("Recovery Mail Sent to " + email);
    })
    .catch((err) => {
      console.log("Recovery Mail Failed");
    });
};

const securePassword = (plainpassword, salt) => {
  if (!plainpassword) return "";
  try {
    return crypto
      .createHmac("sha256", salt)
      .update(plainpassword)
      .digest("hex");
  } catch (err) {
    return "";
  }
};

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

exports.recoverAccount = (req, res) => {
  const { email } = req.body;
  const recoverCode = uuidv1();

  User.findOneAndUpdate({ email }, { recover: recoverCode })
    .then((user) => {
      if (user) {
        res.end(200)
        sendRecoveryEmail(email, user.firstName, recoverCode);
      } else {
        res.status(400);
        res.json({
          error: "User not found",
        });
      }
    })
    .catch((err) => {
      res.status(400);
      res.json({
        error: err,
      });
    });
};

exports.resetPassword = (req, res) => {
  const { code, newPassword } = req.body;
  const newSalt = uuidv1();
  const ecryPassword = securePassword(newPassword, newSalt);

  User.findOneAndUpdate(
    { recover: code },
    { salt: newSalt, password: ecryPassword }
  ).then((user) => {
    if (user) {
      res.status(200);
      res.json({
        status: "success",
        message: "Password Change successfull",
      });
    } else {
      res.status(400);
      res.json({
        error: "User not found",
      });
    }
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
