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
        err: err.message,
        stack: err.stack
      });
    });
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(CREATE).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(BAD_REQUEST).send({
        message: 'Incorrect data sent'
      });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({
      message: 'Internal Server Error',
      err: err.message,
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
      if (err.name === 'CastError' && err.kind === 'ObjectId') {
        res.status(BAD_REQUEST).send({ message: 'Invalid User Id' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        error: err.message
      });
    });
};

const updateUser = async (req, res) => {
  try {
    if (!req.body.name || !req.body.about) {
      return res.status(BAD_REQUEST).send({
        message: 'Incorrect data sent'
      });
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, about: req.body.about },
      { new: true }
    )
      .orFail(() => {
        throw new Error('NotFound');
      });
    return res.status(SUCCESS).send(user);
  } catch (err) {
    if (err.message === 'NotFound') {
      res.status(NOT_FOUND).send({
        message: 'User Not Found'
      });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({
      message: 'Internal Server Error',
      err: err.message,
      stack: err.stack
    });
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    if (!req.body.avatar) {
      return res.status(BAD_REQUEST).send({
        message: 'Incorrect data sent'
      });
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: true }
    )
      .orFail(() => {
        throw new Error('NotFound');
      });
    return res.status(SUCCESS).send(user);
  } catch (err) {
    if (err.message === 'NotFound') {
      res.status(NOT_FOUND).send({
        message: 'User Not Found'
      });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({
      message: 'Internal Server Error',
      err: err.message,
      stack: err.stack
    });
  }
};

module.exports = {
  getUsers,
  getUserId,
  createUser,
  updateUser,
  updateUserAvatar
};
