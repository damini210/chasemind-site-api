const nodemailer = require("nodemailer");
const CONFIG = require("../config/config"); // Assuming you have your email configuration in the config file
const path = require('path');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  host: CONFIG.EMAIL.HOST,
  port: CONFIG.EMAIL.PORT,
  secure: CONFIG.EMAIL.SECURE,
  auth: {
    user: CONFIG.EMAIL.USER,
    pass: CONFIG.EMAIL.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = (email, subject, htmlTemplate) => {
  const mailOptions = {
    from: CONFIG.EMAIL.USER,
    to: email,
    subject: subject,
    html: htmlTemplate,
  };

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
};

const getEmailTemplate = (templateName) => {
  const templatePath = path.join(
    __dirname,
    `../utils/HtmlTemplate/${templateName}.html`
  );
  return fs.readFileSync(templatePath, "utf8");
};

module.exports = { sendEmail, getEmailTemplate };
