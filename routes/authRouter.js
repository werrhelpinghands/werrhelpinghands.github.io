const authRouter = require("express").Router();
const {
  signup,
  signin,
  OAuth,
  signout,
  isOldUser,
  recoverAccount,
  resetPassword,
} = require("../controllers/auth");

authRouter.post("/signup", signup);

authRouter.post("/signin", signin);

authRouter.post("/OAuth", OAuth);

authRouter.get("/signout", signout);

authRouter.get("/isOldUser/:email", isOldUser);

authRouter.post("/recoverAccount", recoverAccount);

authRouter.post("/resetPassword", resetPassword);

module.exports = authRouter;
