const mongoose = require('mongoose');
const Card = require('../models/card');
const wrapper = require('./wrapper');
const {
  CREATE
} = require('../constants/ErrorStatuses');

const getCards = wrapper((req, res) => {
  return Card.find({})
});

const createCards = wrapper((req, res) => {
  return Card.create({
    owner: req.user._id,
    ...req.body
  })
}, CREATE)

const deleteCard = wrapper((req, res) => {
  return Card.findByIdAndDelete(req.params.cardId)
})

const putCardLike = wrapper((req, res) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
})

const deleteCardLike = wrapper((req, res) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
})

module.exports = {
  createCards,
  getCards,
  deleteCard,
  putCardLike,
  deleteCardLike
};
