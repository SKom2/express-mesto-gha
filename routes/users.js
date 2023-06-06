const router = require('express').Router();
const {
  getUsers,
  getUserId,
  updateUser,
  updateUserAvatar
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:_id', getUserId);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
