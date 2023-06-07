const router = require('express').Router();
const {
  getUsers,
  getUser,
  getUserId,
  updateUser,
  updateUserAvatar
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:_id', getUserId);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
