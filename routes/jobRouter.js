var express = require('express');
var jobRouter = express.Router();
const {isSignedIn, isAdmin} = require('../controllers/auth')
const { addJob, getAllJobs, getJob } = require('../controllers/job')
const Multer = require("multer");

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 8mb, you can change as needed.
    },
  });

jobRouter.post('/addJob', isSignedIn, isAdmin, multer.array('file', 2), addJob)

jobRouter.get('/', getAllJobs)

jobRouter.get('/:id', getJob)

module.exports = jobRouter