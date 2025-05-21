const express = require('express')
const router = express.Router()
const {addCategory,deleteCategory, getCategories} = require('../controllers/categoryController')
const {protect,adminProtect}=require('../middleware/authMiddleware')

router.post('/',protect,adminProtect,addCategory)
router.delete('/:id',protect,adminProtect,deleteCategory)
router.get('/',getCategories)

module.exports=router