// utils/Notifier.js
const nodemailer = require('nodemailer');

async function sendAlert(subject, message, screenshotPath = null) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: '"Health Check Bot" <your-email@gmail.com>',
        to: "admin@yourcompany.com",
        subject: `🚨 ALERT: ${subject}`,
        html: `<p>${message.replace(/\n/g, '<br>')}</p>`,
        attachments: []
    };

    if (screenshotPath) {
        mailOptions.attachments.push({
            filename: 'error-screenshot.png',
            path: screenshotPath
        });
        // Optional: Embed the image directly in the email body
        mailOptions.html += `<br><img src="cid:uniqueFailureImg"/>`;
        mailOptions.attachments[0].cid = 'uniqueFailureImg';
    }

    await transporter.sendMail(mailOptions);
}

module.exports = { sendAlert };
