const {getUsers, getUserId, createUser} = require("../controllers/users");
const router = require('express').Router()

router.get('/', getUsers);
router.get('/:_id', getUserId);
router.post('/', createUser);

module.exports = router;