const { Router } = require('express');
const controller = require('../controllers/userController');
const { validateDisplay } = require('../middlewares/validDisplayName');
const { validateEmail } = require('../middlewares/validEmail');
const { validatePassword } = require('../middlewares/validPassword');

const router = Router();

router.post('/', validateDisplay, validatePassword, validateEmail, controller.createUser);

module.exports = router;