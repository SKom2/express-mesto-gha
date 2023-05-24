const router = require('express').Router();
const {
  getUsers, getUserId, createUser, updateUser, updateUserAvatar
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:_id', getUserId);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);
router.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемая страница не найдена' });
});

module.exports = router;
