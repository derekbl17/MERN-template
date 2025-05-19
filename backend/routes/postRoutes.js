const express = require('express')
const router = express.Router()
const {getPosts,postPost,putPost,deletePost} = require('../controllers/postController.js')

router.route('/').get(getPosts).post(postPost)
router.route('/:id').put(putPost).delete(deletePost)

module.exports = router