const { Router } = require('express');
const controller = require('../controllers/userController');
const { checkUserExists } = require('../middlewares/user/userExists');
const { validateDisplay } = require('../middlewares/user/validDisplayName');
const { validateEmail } = require('../middlewares/user/validEmail');
const { validatePassword } = require('../middlewares/user/validPassword');
const checkToken = require('../middlewares/user/validUsers');

const router = Router();

router.post('/', validateDisplay, validatePassword, validateEmail, controller.createUser);
router.get('/', checkToken, controller.getAllUsers);
router.get('/:id', checkToken, checkUserExists, controller.getUserById);

module.exports = router;