const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');
const UsersController = require('../controllers/users');

router.post('/signup', UsersController.create);
router.post('/login', UsersController.login);
router.get('/', UsersController.getAll);
router.delete('/:id', checkAuth, UsersController.deleteById);

module.exports = router;