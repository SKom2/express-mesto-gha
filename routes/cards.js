const router = require('express').Router();
const {
  createCards, getCards, deleteCard, putCardLike, deleteCardLike
} = require('../controllers/cards');
const { validateCardBody,
  validId
} = require('../middlewares/validate');

router.post('/', validateCardBody, createCards);
router.get('/', getCards);
router.delete('/:cardId', validId, deleteCard);
router.put('/:cardId/likes', validId, putCardLike);
router.delete('/:cardId/likes', validId, deleteCardLike);

module.exports = router;
