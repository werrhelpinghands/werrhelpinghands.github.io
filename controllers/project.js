const Project = require("../models/project");
const User = require("../models/user");

exports.addProject = (req, res) => {
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
};

exports.getProject = (req, res) => {
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
};

exports.getAllProjects = (req, res) => {
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
};

exports.addComment = (req, res) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      let newComment = {
        user: user.firstName,
        comment: req.body.comment,
      };
      Project.updateOne(
        { _id: req.params.id },
        { $push: { comments: newComment } },
        { new: true }
      )
        .then((project) => {
          res.status(200);
          res.json(project);
        })
        .catch((err) => {
          res.status(400);
          res.json({
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(400);
      res.json({
        error: err,
      });
    });
};

exports.addLike = (req, res) => {
  Project.updateOne(
    { _id: req.params.id },
    { $inc: { likes: 1 } },
    { new: true }
  )
    .then((project) => {
      res.status(200);
      res.json(project);
    })
    .catch((err) => {
      res.status(400);
      res.json({
        error: err,
      });
    });
};
