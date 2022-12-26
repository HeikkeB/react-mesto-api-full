const router = require('express').Router();
const routerUsers = require('./users');
const routerCards = require('./cards');
const { signOut } = require('../controllers/users');

router.use('/users', routerUsers);
router.use('/cards', routerCards);

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Attention! The server is now shutting down!');
  }, 5000);
});

router.post('/signout', signOut);

module.exports = router;
