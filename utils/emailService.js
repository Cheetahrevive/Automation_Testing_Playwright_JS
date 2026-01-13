const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ravikalagara3018@gmail.com',
        pass: process.env.EMAIL_PASS // Uses the app password
    }
});

module.exports = transporter;
