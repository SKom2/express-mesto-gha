const Card = require('../models/card')
const User = require("../models/user");
const { SUCCESS, CREATE, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR}  = require("../constants/ErrorStatuses");

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(SUCCESS).send(cards)
    })
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      })
    });
}

const createCards = async (req, res) => {
  try {
    const card = await Card.create({
      owner: req.user._id,
      ...req.body
    })
    return res.status(CREATE).send(card)
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(BAD_REQUEST).send({
        message: 'Incorrect data sent'
      })
    }
    return res.status(INTERNAL_SERVER_ERROR).send({
      message: 'Internal Server Error',
      err: err.message,
      stack: err.stack,
    })
  }
}

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Card not found' });
      }
      res.status(SUCCESS).send(card);
    })
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({
      message: 'Internal Server Error',
      err: err.message,
      stack: err.stack,
    }));
}

const putCardLike = async (req, res) => {
  try {
    console.log(req.user._id)
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(BAD_REQUEST).send({
        message: 'User Not Found',
      });
    }
    const cardLike = await Card.findByIdAndUpdate(req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true })
      .orFail(() => {
        throw new Error('NotFound');
      })
    return res.status(CREATE).send(cardLike)
  } catch (err) {
    if (err.message === 'NotFound'){
      res.status(NOT_FOUND).send({
        message: 'Card ID Not Found',
      });
      return;
    }
    return res.status(INTERNAL_SERVER_ERROR).send({
      message: 'Internal Server Error',
      err: err.message,
      stack: err.stack,
    })
  }
}

const deleteCardLike = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(BAD_REQUEST).send({
        message: 'User Not Found',
      });
    }
    const cardLike = await Card.findByIdAndUpdate(req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true })
      .orFail(() => {
        throw new Error('NotFound');
      })
    return res.status(SUCCESS).send(cardLike)
  } catch (err) {
    if (err.message === 'NotFound'){
      res.status(NOT_FOUND).send({
        message: 'Card ID Not Found',
      });
      return;
    }
    return res.status(INTERNAL_SERVER_ERROR).send({
      message: 'Internal Server Error',
      err: err.message,
      stack: err.stack,
    })
  }
}

module.exports = {
  createCards,
  getCards,
  deleteCard,
  putCardLike,
  deleteCardLike
}