const nodemailer = require("nodemailer");
const activateEmail = require("../template/activateEmailTemplate");
const expiredVerification = require("../template/expiredVerificationTemplate");
const verifiedEmail = require("../template/verifiedEmailTemplate");
const forgetPasswordLink = require("../template/forgetPasswordTemplate");
const expiredPassword = require("../template/expiredPasswordTemplate");
const UserNotFound = require("../template/userNotFoundTemplate");
const expiredPasswordLink = require("../template/expiredPasswordTemplate");
const resetPasswordLink = require("../template/resetPasswordTemplate");
const successPasswordLink = require("../template/successPasswordTemplate");
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
    throw error.message;
  }
}

async function activatedVerificationLink(username) {
  try {
    const html = verifiedEmail(username);
    return html;
  } catch (error) {
    throw error.message;
  }
}

async function expiredVerificationLink() {
  try {
    const html = expiredVerification();
    return html;
  } catch (error) {
    throw error.message;
  }
}

async function sendForgotPasswordLink(username, email, userId, token) {
  try {
    const subject = "Forget Password";

    const html = forgetPasswordLink(username, userId, token);
    const info = await transporter.sendMail({
      from: process.env.Email, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      //   text: text, // plain text body
      html: html, // html body
    });
  } catch (error) {
    throw error.message;
  }
}

async function resetForgettenPasswordLink(username) {
  try {
    const html = resetPasswordLink(username);
    return html;
  } catch (error) {
    throw error.message;
  }
}

async function expiredForgottenPasswordLink(username) {
  try {
    const html = expiredPasswordLink(username);
    return html;
  } catch (error) {
    throw error.message;
  }
}

async function successForgettenPasswordLink(username) {
  try {
    const html = successPasswordLink(username);
    return html;
  } catch (error) {
    throw error.message;
  }
}

async function notFound() {
  try {
    const html = UserNotFound;
    return html;
  } catch (error) {
    throw error.message;
  }
}

module.exports = {
  notFound,
  sendActivationLink,
  activatedVerificationLink,
  expiredVerificationLink,
  sendForgotPasswordLink,
  resetForgettenPasswordLink,
  expiredForgottenPasswordLink,
  successForgettenPasswordLink,
};
