const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const checkAuth = require('../middleware/check_auth');

//const Order = require('../models/order');
const Product = require('../models/product');


const OrdersController = require('../controllers/orders');


// handeling incoming get request for /orders

router.get('/', checkAuth, OrdersController.orders_get_all);


router.post('/', checkAuth, OrdersController.orders_create_order);

router.get('/:orderId', checkAuth, OrdersController.orders_get_order);

router.delete('/:orderId', checkAuth, OrdersController.orders_delete_order);

module.exports = router;