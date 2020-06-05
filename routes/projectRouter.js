var express = require("express");
var projectRouter = express.Router();
const { isSignedIn, isAdmin } = require("../controllers/auth");
const { addProject, getProject, getAllProjects } = require("../controllers/project");

projectRouter.post("/addProject", isSignedIn, isAdmin, addProject);

projectRouter.get('/:id', getProject)

projectRouter.get('/allProjects', getAllProjects)
