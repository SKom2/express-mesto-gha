const mongoose = require('mongoose')
const User = require('../models/user');
const {
  CREATE
} = require('../constants/ErrorStatuses');

const wrapper = require('./wrapper');

const getUsers = wrapper((req, res) => {
  return User.find({});
});

const createUser = wrapper((req, res) => {
  return User.create(req.body);
}, CREATE)

const getUserId = wrapper((req, res) => {
  return User.findById(req.params._id);
})

const updateUser = ((req, res) => {
  return User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true }
  );
})

const updateUserAvatar = wrapper((req, res) => {
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.user.avatar },
    { new: true, runValidators: true }
  )
})

module.exports = {
  getUsers,
  getUserId,
  createUser,
  updateUser,
  updateUserAvatar
};
