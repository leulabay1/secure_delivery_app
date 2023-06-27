const router = require("express").Router();
const paymentController = require('../controllers/paymentController');

router.post('/payment', paymentController.postPayment);
router.post('/paymentStatus', paymentController.checkPaymentStatus);

module.exports = router;
