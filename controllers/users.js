const User = require('../models/user');
const wrapper = require('./wrapper');
const bcrypt = require('bcryptjs');
const { CREATE } = require('../constants/ErrorStatuses');
const SALT_ROUNDS = 10;

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, SALT_ROUNDS).then(function (hash) {
    wrapper(() => User.create({ name, about, avatar, email, password: hash }), CREATE)(req, res)
  })
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Not correct email or password'))
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched){
        return Promise.reject(new Error('Not correct email or password'))
      }
      return res.status(200).send({ message: 'All right' })
    })
    .catch((err) => {
      res.status(401).send({ message: err.message })
    })
}

const getUsers = wrapper(() => User.find({}));

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
  createUser,
  login,
  getUsers,
  getUserId,
  updateUser,
  updateUserAvatar
};
