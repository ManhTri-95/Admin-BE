require('dotenv').config();
const { API_KEY_MAILJET, API_SECRET_MAILJET } = require('../config/default');
const Mailjet = require('node-mailjet');

// console.log(API_KEY_MAILJET, API_SECRET_MAILJET)
// Create a Mailjet client instance
// const mailjet = Mailjet.apiConnect(
//   '15842090814a53c4f2e961a5ead7d470',
//   'b87da68ba73e4c422245e2b761bfdfaa'
// );

const mailjet = Mailjet.apiConnect(
  API_KEY_MAILJET,
  API_SECRET_MAILJET
);

const sendEmail = async ({ fromEmail, fromName, toEmail, toName, subject, text, html }) => {
  try {
    const response = await mailjet
      .post('send', { 'version': 'v3.1' })
      .request({
        SandboxMode: true,
        Messages: [
          {
            From: {
              Email: fromEmail,
              Name: fromName
            },
            To: [
              {
                Email: toEmail,
                Name: toName
              }
            ],
            Subject: subject,
            TextPart: text,
            HTMLPart: html
          }
        ]
      })
    return response.body;
  } catch (error) {
    throw error;
  }};

module.exports = { sendEmail };