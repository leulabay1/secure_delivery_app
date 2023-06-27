const router = require('express').Router();
const auth = require('../middleware/checkAuth');
const orderController = require('../controllers/orderController');

router.use(auth);
router.post('/orders/create', orderController.createOrder);
router.get('/orders', orderController.getOrders);
router.get('/orders/newOrderFromCurrentUser', orderController.getUserRecentOrder);
router.post('/pay', orderController.postPay);

module.exports = router;


