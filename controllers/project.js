const Project = require("../models/project");
const User = require("../models/user");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  projectId: "website-833a3",
  keyFilename: "./firebase.json",
});

const bucket = storage.bucket("gs://website-833a3.appspot.com");


const uploadToStorage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file");
    }

    let newFileName = `files/${Date.now()}_${file.originalname}`;

    let fileUpload = bucket.file(`${newFileName}`);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (error) => {
      reject(error);
    });

    blobStream.on("finish", () => {
      // The public URL can be used to directly access the file via HTTP.
      let fileName = fileUpload.name.replace(/\//g, "%2F");
      const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileName}?alt=media`;

      resolve(url);
    });

    blobStream.end(file.buffer);
  });
};

exports.addProject = (req, res) => {
  const { title, ppt, description, contactName, contactEmail } = req.body;
  let image = '' 

  await uploadToStorage(req.files[0]).then((url) => (image = url));

  Project.create({ title, ppt, description, contactName, contactEmail, image })
    .then((project) => {
      res.status(200);
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
