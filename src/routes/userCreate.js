const { Router } = require('express');
const controller = require('../controllers/userController');

const router = Router();

router.post('/', controller.createUser);

module.exports = router;