const Contact = require("../models/contact");
const { sendEmail, getEmailTemplate } = require("../utils/mailer");
const responseHandler = require("../utils/responseHandler");

exports.listContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    responseHandler.successResponse(res, 'Success', contacts);
  } catch (err) {
    return responseHandler.errorResponse(res, "Fail", error.message);
  }
};

exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const contact = await newContact.save();
    const htmlTemplate = getEmailTemplate("contact-template");
    await sendEmail(
      contact.email,
      "Thank You for Contacting Us",
      htmlTemplate.replace("{{name}}", name)
    );
    responseHandler.successResponse(res, 'Success', contact);
  } catch (err) {
    console.log(err);
    return responseHandler.errorResponse(res, "Fail", err.message);
  }
};
