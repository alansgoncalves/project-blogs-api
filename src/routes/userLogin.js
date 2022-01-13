const { Router } = require('express');
const controller = require('../controllers/userController');
const { validateEmail } = require('../middlewares/login/validEmail');
const { validatePassword } = require('../middlewares/login/validPassword');

const router = Router();

router.post('/', validatePassword, validateEmail, controller.userLogin);

module.exports = router;