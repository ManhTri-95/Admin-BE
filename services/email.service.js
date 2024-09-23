const Mailjet = require('node-mailjet');
const config = require('../config/config');

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const mailjet = Mailjet.apiConnect(
  config.email.mailjet.keyMailjet,
  config.email.mailjet.secretMailjet
);

const sendEmail = async ({ fromEmail, fromName, toEmail, toName, subject, text, html }) => {
  try {
    const response = await mailjet
      .post('send', { 'version': 'v3.1' })
      .request({
        //SandboxMode: true,
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
      });
    console.log(response.body)
    return response.body;
  } catch (error) {
    throw error;
}};

/**
 * Send reset password email
 * @param {object} 
 * @returns {Promise}
 */
const sendSignupSuccessUser = async (user, password) => {
  const emailDetails = {
    fromEmail: config.email.from, // Your email address
    fromName: 'Manh Tri', // Your name or your company name
    toEmail: user.email, // Recipient's email address (the user who registered)
    toName: user.firstName + ' ' + user.lastName, // Recipient's name (the user who registered)
    subject: 'Registration Successful', // Subject of the email
    text: `Hello ${user.firstName + ' ' + user.lastName},\n\nYour account has been successfully registered. Welcome to our service! We are excited to have you on board.\n\nBest regards,\nManh Tri`, // Plain text version of the email
    html: `<h3>Hello ${user.firstName + ' ' + user.lastName},</h3>
          <p>Your account has been successfully registered. Here is your password: <strong>${password}</strong></p>
           <p>Best regards,<br>Manh Tri</p>` // HTML version of the email
  }

  await sendEmail(emailDetails);
}

module.exports = {
  sendSignupSuccessUser
}