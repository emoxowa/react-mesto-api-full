const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { validateLogin, validateUserCreate } = require('../middlewares/validate-user');
const NotFoundError = require('../utils/errors/not-found-err');

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.post('/signup', validateUserCreate, createUser);
router.post('/signin', validateLogin, login);

router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
