const Project = require("../models/project");

exports.addProject((req, res) => {
  const { title, ppt, description, contactName, contactEmail } = req.body;
  Project.create({ title, ppt, description, contactName, contactEmail })
    .then((project) => {
      res.statud(200);
      res.json(project);
    })
    .catch((err) => {
      res.status(400);
      res.json({ error: err });
    });
});

exports.getProject((req, res) => {
  Project.findById(req.params.id)
    .then((projects) => {
      res.status(200);
      res.json(projects);
    })
    .catch((err) => {
      res.status(400);
      res.json({
        error: err,
      });
    });
});

exports.getAllProjects((req, res) => {
  Project.find({})
    .then((projects) => {
      res.status(200);
      res.json(projects);
    })
    .catch((err) => {
      res.status(400);
      res.json({
        error: err,
      });
    });
});
