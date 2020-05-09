const functions = require("firebase-functions");
var express = require('express');
var contactRouter = express.Router();
var nodemailer = require('nodemailer');
var multer = require('multer')
var form = multer()

var Messages = require('../models/contact-message')

contactRouter.route('/')
    .post(form.none(), (req, res) => {
        console.log('post request');
        

        // Store in Database
        Messages.create(req.body)
            .then((Message) => {
                console.log('Messages stored in database');
                res.statusCode = 200;
                res.redirect('/contact')
                res.end()
            })
            .catch((err) => {
                console.error(err);
                res.statusCode = 304
                res.end()
            })

        // Send Email
        let formData = req.body;

        var mailer = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PASSWORD,
            },
        })

        mailer.verify((err, success) => {
            if (err) console.log(err);
            else console.log('Signed into email');
        })

        var mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: process.env.RECIPIENT_EMAIL,
            subject: `${formData.name}`,
            text: `Email: ${formData.email}\nPhone: ${formData.phone}\n${formData.message}`,
        }

        mailer.sendMail(mailOptions)
            .then((mail) => {
                console.log('Mail Sent');
            })
            .catch((err) => {
                console.log('Mail Failed');
            })

    })

module.exports = contactRouter;
