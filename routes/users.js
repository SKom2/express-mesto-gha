const {getUsers, getUserId, createUser, updateUser, updateUserAvatar} = require("../controllers/users");
const router = require('express').Router()

router.get('/', getUsers);
router.get('/:_id', getUserId);
router.post('/', createUser);
router.patch('/me', updateUser)
router.patch('/me/avatar', updateUserAvatar)

module.exports = router;