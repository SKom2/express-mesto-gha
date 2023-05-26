const mongoose = require('mongoose')
const User = require('../models/user');
const {
  SUCCESS, CREATE, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR
} = require('../constants/ErrorStatuses');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(SUCCESS).send(users);
    })
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        stack: err.stack
      });
    });
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(CREATE).send(user);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(BAD_REQUEST).send({
        message: 'Incorrect data sent'
      });
      return;
    }
    res.status(INTERNAL_SERVER_ERROR).send({
      message: 'Internal Server Error',
      stack: err.stack
    });
  }
};

const getUserId = (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'User Not Found' });
        return;
      }
      res.status(SUCCESS).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(BAD_REQUEST).send({ message: 'Invalid User Id' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        stack: err.stack
      });
    });
};

// const updateUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.user._id,
//       { name: req.body.name, about: req.body.about },
//       { new: true, runValidators: true }
//     )
//     if (!user) {
//       res.status(NOT_FOUND).send({ message: 'User Not Found' });
//       return;
//     }
//     res.status(SUCCESS).send(user);
//   } catch (err) {
//     if (err instanceof mongoose.Error.ValidationError) {
//       res.status(BAD_REQUEST).send({
//         message: 'Incorrect data sent'
//       });
//       return;
//     }
//     if (err instanceof mongoose.Error.CastError) {
//       res.status(BAD_REQUEST).send({ message: 'Invalid User Id' });
//       return;
//     }
//     res.status(INTERNAL_SERVER_ERROR).send({
//       message: 'Internal Server Error',
//       stack: err.stack
//     });
//   }
// };

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
  .then((user) => {
    console.log(user)
    if (!user) {
      res.status(NOT_FOUND).send({ message: 'User Not Found' });
      return;
    }
    res.status(SUCCESS).send(user);
  })
  .catch((err) => {
    console.log(err)
    if (err instanceof mongoose.Error.CastError) {
      res.status(BAD_REQUEST).send({ message: 'Invalid User Id' });
      return;
    }
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(BAD_REQUEST).send({
        message: 'Incorrect data sent'
      });
      return;
    }
    res.status(INTERNAL_SERVER_ERROR).send({
      message: 'Internal Server Error',
      stack: err.stack
    });
  });
};

const updateUserAvatar = async (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'User Not Found' });
        return;
      }
      res.status(SUCCESS).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(BAD_REQUEST).send({ message: 'Invalid User Id' });
        return
      }
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST).send({
          message: 'Incorrect data sent'
        });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        stack: err.stack
      });
    });
};

module.exports = {
  getUsers,
  getUserId,
  createUser,
  updateUser,
  updateUserAvatar
};
