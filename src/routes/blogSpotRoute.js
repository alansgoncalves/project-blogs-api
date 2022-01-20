const { Router } = require('express');
const controller = require('../controllers/blogPostController');
const checkToken = require('../middlewares/user/validUsers');

const { 
  validateBlogPost, 
  validateBlogById, 
  validateUpdateBlog,
  validateDeleteBlog, 
} = require('../middlewares/blogSpot/validBlogSpot');
      
const router = Router();

router.post('/', checkToken, validateBlogPost, controller.createPost);
router.get('/', checkToken, controller.getAllBlogPosts);
router.get('/:id', checkToken, validateBlogById, controller.getPostById);
router.put('/:id', checkToken, validateUpdateBlog, controller.updatePostById);
router.delete('/:id', checkToken, validateBlogById, validateDeleteBlog, controller.deletePostById);

module.exports = router;
