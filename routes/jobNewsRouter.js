var express = require("express");
var jobNewsRouter = express.Router();
const { isSignedIn, isAdmin } = require("../controllers/auth");
const { addNews, getAllNews, deleteNews } = require("../controllers/jobNews");

jobNewsRouter.get("/", getAllNews);

jobNewsRouter.post("/", isSignedIn, isAdmin, addNews);

jobNewsRouter.delete("/:id", isSignedIn, isAdmin, deleteNews);

module.exports = jobNewsRouter;
