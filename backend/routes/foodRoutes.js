const router = require('express').Router();
const foodController = require('../controllers/foodController');

router.get("/foods/seed", foodController.seedDocuments);
router.get('/foods', foodController.getFoods);
router.get('/foods/search/:searchTerm', foodController.searchFoods);
router.get('/foods/:foodId', foodController.getFood);
router.post('/foods/create', foodController.createFood);

module.exports = router;