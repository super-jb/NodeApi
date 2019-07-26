const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');

const OrdersController = require('../controllers/orders');

router.get('/', OrdersController.getAll);
router.get('/:id', OrdersController.getById);
router.post('/', checkAuth, OrdersController.create);
router.delete('/:id', checkAuth, OrdersController.deleteById);

module.exports = router;