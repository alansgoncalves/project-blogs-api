const { Router } = require('express');
const controller = require('../controllers/categoryController');
const { validateCategory } = require('../middlewares/category/validCategory');
const checkToken = require('../middlewares/user/validUsers');

const router = Router();

router.post('/', checkToken, validateCategory, controller.createCategory);

module.exports = router;