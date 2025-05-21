const express = require('express')
const router = express.Router()
const {getPosts,postPost,putPost,deletePost,moderatePost,getActivePosts,getBlockedPosts, toggleLikePost} = require('../controllers/postController.js')
const {protect,adminProtect}=require('../middleware/authMiddleware.js')

router.route('/').get(getPosts).post(protect,postPost)
router.route('/:id').put(protect,putPost).delete(protect,deletePost).patch(protect,adminProtect,moderatePost)
router.get('/active',getActivePosts)
router.get('/blocked',getBlockedPosts)
router.patch('/:id/like',protect,toggleLikePost)

module.exports = router