const usersRouter = require('express').Router();
const { validateUserId, validateUserUpdate, validateAvatar } = require('../middlewares/validate-user');

const {
  getUsers,
  getUser,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUser);
usersRouter.get('/:userId', validateUserId, getUserById);
usersRouter.patch('/me', validateUserUpdate, updateUser);
usersRouter.patch('/me/avatar', validateAvatar, updateUserAvatar);

module.exports = usersRouter;
