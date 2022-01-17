const { Router } = require('express');
const controller = require('../controllers/postController');
const checkToken = require('../middlewares/user/validUsers');

const { validateBlogPost, validateBlogById } = require('../middlewares/blogSpot/validBlogSpot');
      
const router = Router();

router.post('/', checkToken, validateBlogPost, controller.createPost);
router.get('/', checkToken, controller.getAllBlogPosts);
router.get('/:id', checkToken, validateBlogById, controller.getPostById);

module.exports = router;
