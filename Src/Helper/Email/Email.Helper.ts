//Nodemailer
import nodemailer from "nodemailer";
import template from "../../Constants/EnquiryTemplate";
import { AUTH_EMAIL, AUTH_PASS } from "../../Config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASS,
  },
});
export const emailTriggerHelper = (email: string) => {
  transporter.verify((error, success) => {
    if (error) return console.log(error);
  });
  //   let template = handlebars.compile(emailTemplate.VERIFICATION_TEMPLATE);
  //userEVId
  //   let replacements = {
  //     userEVId: userEVId,
  //   };
  var details = {
    from: "Abhishek",
    to: email,
    subject: "Email Verification",
    html: template.email,
  };
  transporter.sendMail(details, (err) => {
    if (err) return console.log("ERROR :>", err);
    console.log("SENT EMAIL TO", email);
  });
};
