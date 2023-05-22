const router = require('express').Router()
const {createCards, getCards, deleteCard} = require('../controllers/cards')

router.post('/', createCards)
router.get('/', getCards)
router.delete("/:cardId", deleteCard)

module.exports = router;