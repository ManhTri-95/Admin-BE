const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { createResponse } = require('../utils/responseHelper');
const { deleteImage } = require('../middleware/multer');

exports.getUserList = async (req, res, next) => {
  const pageIndex = req.query.pageIndex || 1;
  const pageSize = req.query.pageSize || 10;

  const skip = (pageIndex - 1) * pageSize;
  const limit = pageSize;
  try {
    const users = await User.find()
      .skip(skip)
      .limit(limit)
      .exec()
    
    const totalUser = await User.countDocuments();

    res.status(200).json(createResponse(
      200,
      'Get list user success', 
      {
        lists: users,
        totals: totalUser
      }
    ));
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}


exports.postUserStatus = async(req, res, next) => {
  const { id, status } = req.body;

  try {
    if (status != 1 && status != 0) {
      const error = new Error('Invalid status value');
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findById(id);

    if(!user) {
      const error = new Error('Cannot find user');
      error.statusCode = 404;
      throw error;
    }

    user.status = status;
    await user.save();

    res.status(200).json(createResponse(
      200,
      'Status update successful'
    ));
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
} 

exports.postDeleteUser = async (req, res, next) => {
  const idsToDelete = req.body || [];

  try {
    if (!Array.isArray(idsToDelete) || idsToDelete.length === 0) {
      const error = new Error('Invalid user ID');
      error.statusCode = 400;
      throw error;
    }

    const objectIdArray = idsToDelete.map(id => {
      try {
        return new mongoose.Types.ObjectId(id);
      } catch (err) {
        throw new Error('Invalid ID format');
      }
    });
    //const user = await User.findByIdAndDelete(id);

    const result = await User.deleteMany({ _id: { $in: objectIdArray } });

    if (result.deletedCount === 0) {
      const error = new Error('No users found to delete');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(createResponse(
      200,
      'Delete user success',
      {
        deletedCount: result.deletedCount
      }
    ));
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  } 
}

exports.postAddUser = async (req, res, next) => {
  const { firstName, lastName, email, phone, status, newPassword, avatar } = req.body;
  try {
    const hashedPw = await bcrypt.hash(newPassword, 12);

    const user = new User({
      avatar: avatar,
      email: email,
      firstName: firstName,
      lastName: lastName,
      status: status,
      phone: phone,
      position: '',
      password: hashedPw,
    });

    await user.save();

    res.status(200).json(createResponse(
      200,
      'Added user successfully'
    ));
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.getUserDetail = async (req, res, next) => {
  const userId = req.query.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('Cannot find user');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(createResponse(
      200,
      'Get user success!',
      {
        user: user
      }
    ));
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.putEditUser = async (req, res, next) => {
  const { id, firstName, lastName, email, phone, status, avatar, oldAvatar } = req.body;
  
  console.log(req.body)
  try {
    const user = await User.findById(id);

    if (!user) {
      const error = new Error('Cannot find user');
      error.statusCode = 404;
      throw error;
    }

    if (avatar !== oldAvatar) {
      deleteImage(oldAvatar);

    } 

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phone = phone;
    user.status = status;
    user.avatar = avatar;

    await user.save();
    
    res.status(200).json(createResponse(
      200,
      'Update user success!',
      {
        avatar: user.avatar
      }
    ));
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}