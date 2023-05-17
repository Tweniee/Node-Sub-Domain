"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTriggerHelper = void 0;
//Nodemailer
const nodemailer_1 = __importDefault(require("nodemailer"));
const EnquiryTemplate_1 = __importDefault(require("../../Constants/EnquiryTemplate"));
const Config_1 = require("../../Config");
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: Config_1.AUTH_EMAIL,
        pass: Config_1.AUTH_PASS,
    },
});
const emailTriggerHelper = (email) => {
    transporter.verify((error, success) => {
        if (error)
            return console.log(error);
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
        html: EnquiryTemplate_1.default.email,
    };
    transporter.sendMail(details, (err) => {
        if (err)
            return console.log("ERROR :>", err);
        console.log("SENT EMAIL TO", email);
    });
};
exports.emailTriggerHelper = emailTriggerHelper;
