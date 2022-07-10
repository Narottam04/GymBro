const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_KEY,
    },
});

module.exports = {
    transporter
}