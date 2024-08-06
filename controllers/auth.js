
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
// const nodemailer = require('nodemailer');
// const Mailjet = require('nodemailer-mailjet-transport');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const { sendEmail } = require('../services/emailService');
const { generateToken, generateVerificationToken, tokenStore } = require('../services/tokenService');

// const mailjetTransport = Mailjet({
//   auth: {
//     apiKey: '15842090814a53c4f2e961a5ead7d470',
//     apiSecret: 'c3636d42cdffd872d52d9a54882e2c26'
//   },
//   timeout: 60000
// });


// const transporter = nodemailer.createTransport(mailjetTransport);

exports.signup = async (req, res, next) => { 
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.status = 422;
    throw error;
  }

  const uuid = uuidv4();

  const email = req.body.email;
  const password = uuid.replace(/-/g, '').substring(0, 10);
  const name = req.body.name;
  try {
    const findUserExist = await User.findOne({ email: email });
    if(findUserExist) {
      const error = new Error('This email already exists');
      error.status = 422;
      throw error;
    }

    const hashedPw = await bcrypt.hash(password, 12);
    const emailDetails = {
      fromEmail: 'bootrancntt@gmail.com', // Your email address
      fromName: 'Manh Tri', // Your name or your company name
      toEmail: email, // Recipient's email address (the user who registered)
      toName: name, // Recipient's name (the user who registered)
      subject: 'Registration Successful', // Subject of the email
      text: `Hello ${name},\n\nYour account has been successfully registered. Welcome to our service! We are excited to have you on board.\n\nBest regards,\nManh Tri`, // Plain text version of the email
      html: `<h3>Hello ${name},</h3>
            <p>Your account has been successfully registered. Here is your password: <strong>${password}</strong></p>
             <p>Best regards,<br>Manh Tri</p>` // HTML version of the email
    };

    const emailResponse = await sendEmail(emailDetails);
    const token = generateVerificationToken(email);
    if (emailResponse) {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name,
        status: 'ok'
      });
      await user.save();

      res.status(200).json({
        status: 200,
        message: 'User created!',
        data: {
          //userId: result._id.toString()
          token: token
        }
      });
    } else {
      const error = new Error('Failed to send email');
      error.status = 500;
      throw error;
    }

  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });

    if(!user) {
      const error = new Error('A user with this email could not be found');
      error.statusCode = 401;
      throw error;
    } 

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken(user);

    res.status(200).json({
      status: 200,
      message: 'Login success',
      data: {
        token: token,
        userId: user._id.toString(),
        role: user.roles
      }
    })
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if(!user) {
      const error = new Error('Cannot find profile information');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      status: 200,
      message: 'Profile',
      data: user
    })
  } catch(error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('Not authenticated');
      error.statusCode = 401;
      throw error;
    }

    user.tokenVersion += 1;
    const result = await user.save();

    if (result) {
      res.status(200).json({
        status: 200,
        message: 'Logged out successfully'
      })
    } 
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.verifyToken = (req, res, next) => { 
  try { 
    const token = req.body.token;
    if (!token) {
      const error = new Error('Not authenticated');
      error.statusCode = 401;
      throw error;
    }
    const tokenData = tokenStore[token];
    console.log(tokenData)
    if (!tokenData) {
      const error = new Error('Invalid or expired token');
      error.statusCode = 401;
      throw error;
    }
   
    res.status(200).json({
      status: 200,
      message: 'Token is valid',
    });
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.resetPassword = async (req, res, next) => {
  const email = req.body.email;
  const uuid = uuidv4();
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error('This user does not exist');
      error.statusCode = 404;
      throw error;
    }

    const newPassword = uuid.replace(/-/g, '').substring(0, 10);
    const emailDetails = {
      fromEmail: 'bootrancntt@gmail.com',
      fromName: 'Manh Tri',
      toEmail: email,
      name: user.name,
      subject: 'Reset password successful',
      text: `Hello ${user.name},\n\nYour account has been successfully registered. Welcome to our service! We are excited to have you on board.\n\nBest regards,\nManh Tri`,
      html: `<h3>Hello ${user.name},</h3>
            <p>Your account has been successfully reset passord. Here is your password: <strong>${newPassword}</strong></p>
             <p>Best regards,<br>Manh Tri</p>`
    };
    
    const emailResponse = await sendEmail(emailDetails);
    console.log(emailResponse)
    if (emailResponse) {
      const hashedPw = await bcrypt.hash(newPassword, 12);

      user.password = hashedPw;
      await user.save();

      res.status(200).json({
        status: 200,
        message: 'Reset password success!',
      });
    }

  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}