const Job = require("../models/job");
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

const deleteFromStorage = (filename) => {
  bucket.file(filename).delete()
};

const check = (string) => {
  if(string === "") return "-"
  else return string
}

exports.addJob = async (req, res) => {
  let file1 = "#";
  if (req.files[0])
    await uploadToStorage(req.files[0]).then((url) => (file1 = url));
  let file2 = "#";
  if (req.files[1])
    await uploadToStorage(req.files[1]).then((url) => (file2 = url));

  const {
    title,
    type,
    category,
    tags,
    company,
    website,
    about,
    roles,
    skills,
    location,
    duration,
    pay,
    available,
    expireAt,
    url,
    portal,
  } = req.body;

  Job.create({
    title: check(title),
    type: check(type),
    category: check(category),
    tags: tags.split(","),
    company: check(company),
    website: check(website),
    about: check(about),
    roles: roles.split("."),
    skills: skills.split(","),
    location: check(location),
    duration: check(duration),
    pay: check(pay),
    available: check(available),
    expireAt: new Date(expireAt),
    url: check(url),
    logo: file1,
    notification: file2,
    portal: check(portal),
  })
    .then((job) => {
      res.status(200);
      res.json(job);
    })
    .catch((error) => {
      res.status(400);
      res.json({ error: error });
    });
};

exports.getAllJobs = (req, res) => {
  Job.find({})
    .then((jobs) => {
      res.status(200);
      res.json(jobs);
    })
    .catch((error) => {
      res.status(400);
      res.json({
        error: error,
      });
    });
};

exports.getJob = (req, res) => {
  Job.findById(req.params.id)
    .then((jobs) => {
      res.status(200);
      res.json(jobs);
    })
    .catch((error) => {
      res.status(400);
      res.json({
        error: error,
      });
    });
};

exports.deleteJob = (req, res) => {
  Job.findById(req.params.id)
  .then((job) => {    
    let logo = job.logo.split("/")[7].split("?")[0].replace("%2F", "/");
    let notification = job.notification.split("/")[7].split("?")[0].replace("%2F", "/");;
    deleteFromStorage(logo);
    deleteFromStorage(notification);
  });

  Job.findByIdAndDelete(req.params.id)
    .then((jobs) => {
      res.status(200);
      res.json(jobs);
    })
    .catch((error) => {
      res.status(400);
      res.json({
        error: error,
      });
    });
};
