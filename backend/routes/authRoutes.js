require('dotenv').config({path: './config.env'})
const router = require('express').Router();
const authController = require('../controllers/authController');

// Authentication
router.get("/users/seed", authController.seedUsers);
// register user 
router.post('/users/register', authController.registerUser);
// login user 
router.post('/users/login', authController.loginUser);
router.post('/users/verify', authController.verifyOTP);

//store cartData
router.post('/user/:id', authController.storeCartData);
router.get('/cart', authController.getCartData);

// Profile
router.get('/profile', authController.getProfile);


module.exports = router;