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
       
        SandboxMode: true, // remove with prod
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

const sendResetPasswordUser = async (user, resetToken, domain) => {
  const emailDetails = {
    fromEmail: config.email.from,
    fromName: 'Manh Tri',
    toEmail: user.email,
    toName: user.firstName + ' ' + user.lastName,
    subject: 'Reset passord', 
    text: `Hello ${user.firstName + ' ' + user.lastName},

    You have requested to reset your password. Please click on the link below to reset your password:
    
    ${domain}/reset-password?token=${resetToken}
    
    If you did not request this, please ignore this email.

    Best regards,
    Manh Tri`, // Nội dung email dạng văn bản thuần (text)
    html: `<h3>Hello ${user.firstName + ' ' + user.lastName},</h3>
          <p>You have requested to reset your password. Please click the link below to reset your password:</p>
          <p><a href="${domain}/reset-password?token=${resetToken}">Reset Password</a></p>
          <p>If you did not request this, please ignore this email.</p>
          <p>Best regards,<br>Manh Tri</p>`
  }

  await sendEmail(emailDetails);
}

module.exports = {
  sendSignupSuccessUser,
  sendResetPasswordUser
}

