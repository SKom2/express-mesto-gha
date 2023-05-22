const Card = require('../models/card')

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards })
    })
    .catch(err => res.status(500).send({ message: err.message }));
}

const createCards = (req, res) => {
  Card.create({
    owner: req.user._id,
    likes: req.body.likes.length,
    ...req.body
  })
    .then((card) => {
      res.send(card)
    })
    .catch(err => res.status(500).send({ message: err.message }));
}

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((deletedCard) => {
      if (!deletedCard) {
        return res.status(404).send('Card not found');
      }
      res.send(deletedCard);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

module.exports = {
  createCards,
  getCards,
  deleteCard
}