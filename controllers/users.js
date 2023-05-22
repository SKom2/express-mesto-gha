const User = require('../models/user')

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }));
}

const getUserId = (req, res) => {
  const userId = req.params._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    })
    .catch(err => res.status(500).send(err))
}

const createUser = (req, res) => {
  User.create(req.body)
    .then(user => res.send(user))
    .catch(err => res.status(500).send({ message: err.message }));
}

module.exports = {
  getUsers,
  getUserId,
  createUser
}