var express = require("express");
var jobNewsRouter = express.Router();
const { isSignedIn, isAdmin } = require("../controllers/auth");
const { addNews, getAllNews } = require("../controllers/jobNews");

jobRouter.get("/", getAllNews);

jobRouter.post("/", isSignedIn, isAdmin, addNews);

jobRouter.delete("/:id", isSignedIn, isAdmin, deleteNews);

module.exports = jobNewsRouter;
