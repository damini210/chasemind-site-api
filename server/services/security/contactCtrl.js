let contactCtrl = {};
const HttpRespose = require("../../common/httpResponse");
const AppCode = require("../../common/constant/appCods");
const nodemailer = require("nodemailer");
const fs = require("fs");
const ContactModel = new (require("../../common/model/contactModel"))();
const _ = require("lodash");

//create contact

contactCtrl.create = (req, res) => {
  var response = new HttpRespose();
  var data = req.body;
  ContactModel.create(data, (err, contact) => {
    console.log(data);
    if (err) {
      response.setError(AppCode.Fail);
    } else {
      const transporter = nodemailer.createTransport({
        host: "mail.chasemind.in",
        port: 25, 
        secure: false,
        auth: {
          user: "admin@chasemind.in",
          pass: "Chasemind@123",
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      
      const htmlTemplate = fs.readFileSync(('../common/HtmlTemplate/contact-template.html'), 'utf-8');

      const mailOptions = {
        from: "admin@chasemind.in",
        to: data.email,
        subject: "Thank You for Contacting Us",
        html: htmlTemplate,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });
      response.setData(AppCode.Success);
      response.send(res);
    }
  });
};

/* contact Data List */
contactCtrl.contactDataList = (req, res) => {
  const response = new HttpRespose();

  try {
    let query = [
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          message: 1,
          subject: 1,
          createdAt: 1,
        },
      },
    ];
    console.log(query);

    ContactModel.advancedAggregate(query, {}, (err, subUnitData) => {
      if (err) {
        throw err;
      } else if (_.isEmpty(subUnitData)) {
        response.setError(AppCode.NotFound);
        response.send(res);
      } else {
        response.setData(AppCode.Success, subUnitData);
        response.send(res);
      }
    });
  } catch (exception) {
    response.setError(AppCode.InternalServerError);
    response.send(res);
  }
};

module.exports = contactCtrl;
