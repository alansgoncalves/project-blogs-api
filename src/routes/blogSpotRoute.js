const { Router } = require('express');
const controller = require('../controllers/postController');
const checkToken = require('../middlewares/user/validUsers');

const { validateBlogPost } = require('../middlewares/blogSpot/validBlogSpot');
      
const router = Router();

router.post('/', checkToken, validateBlogPost, controller.createPost);
router.get('/', checkToken, controller.getAllBlogPosts);

module.exports = router;
