const nodemailer = require("nodemailer");
const activateEmail = require("../template/activateEmailTemplate");
const expiredVerification = require("../template/expiredVerificationTemplate");
const verifiedEmail = require("../template/verifiedEmailTemplate");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //"localhost",
  port: 587,
  secure: false, // true for 465, false for other ports
  service: "gmail",
  auth: {
    user: process.env.Email, // generated ethereal user
    pass: process.env.Password, // generated ethereal password
  },
});

async function sendActivationLink(username, userId, email, token) {
  // console.log(process.env.Email);
  try {
    const subject = "Account Verification";

    const html = activateEmail(username, userId, token);

    const info = await transporter.sendMail({
      from: process.env.Email, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      //   text: text, // plain text body
      html: html, // html body
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function activatedVerificationLink(username) {
  try {
    const html = verifiedEmail(username);
    return html;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function expiredVerificationLink() {
  try {
    const html = expiredVerification();
    return html;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  sendActivationLink,
  activatedVerificationLink,
  expiredVerificationLink,
};
