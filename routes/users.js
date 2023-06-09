const router = require('express').Router();
const {
  getUsers,
  getUser,
  getUserId,
  updateUser,
  updateUserAvatar
} = require('../controllers/users');
const {   validateUserBody,
  validId
} = require('../middlewares/validate');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:_id', validId, getUserId);
router.patch('/me', validateUserBody, updateUser);
router.patch('/me/avatar', validateUserBody, updateUserAvatar);

module.exports = router;
