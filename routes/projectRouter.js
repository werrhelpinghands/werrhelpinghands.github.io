var express = require("express");
var projectRouter = express.Router();
const { isSignedIn, isAdmin } = require("../controllers/auth");
const Multer = require("multer");
const {
  addProject,
  getProject,
  getAllProjects,
  addComment,
  addLike
} = require("../controllers/project");

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
  });


projectRouter.post("/addProject", isSignedIn, isAdmin, addProject);

projectRouter.get("/:id", getProject);

projectRouter.get("/", getAllProjects);

projectRouter.post("/addComment/:id", isSignedIn, addComment);

projectRouter.get("/addLike/:id", isSignedIn, multer.single('file'), addLike)

module.exports = projectRouter;
