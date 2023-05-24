const router = require('express').Router();
const {
  createCards, getCards, deleteCard, putCardLike, deleteCardLike
} = require('../controllers/cards');

router.post('/', createCards);
router.get('/', getCards);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', putCardLike);
router.delete('/:cardId/likes', deleteCardLike);

module.exports = router;
