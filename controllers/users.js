const User = require('../models/user');
const {
  CREATE
} = require('../constants/ErrorStatuses');
const wrapper = require('./wrapper');

const getUsers = wrapper(() => User.find({}));

const createUser = wrapper((req) => User.create(req.body), CREATE);

const getUserId = wrapper((req) => User.findById(req.params._id));

const updateUser = wrapper((req) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  );
});

const updateUserAvatar = wrapper((req) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true }
  );
});

module.exports = {
  getUsers,
  getUserId,
  createUser,
  updateUser,
  updateUserAvatar
};
