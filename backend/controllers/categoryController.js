const asyncHandler=require('express-async-handler')
const Category=require('../models/categoryModel')
const Post=require('../models/postModel')


const addCategory=asyncHandler(async(req,res)=>{
    if (!req.body){
        res.status(400)
        throw new Error('Request body cant be empty')
    }

    const category=await Category.create({
        name:req.body.name
    })
    res.status(200).json(category)
})

const deleteCategory=asyncHandler(async(req,res)=>{
    const category=await Category.findById(req.params.id)
    const categoryInUse=await Post.exists({category:req.params.id})
    if(!category){
        res.status(400)
        throw new Error('Category not found')
    }
    if(categoryInUse){
        res.status(400)
        throw new Error('Category in use!')
    }

    await Category.findByIdAndDelete(req.params.id)
    res.status(200).json({id:req.params.id})
})

const getCategories=asyncHandler(async(req,res)=>{
    const categories=await Category.find({}).select('_id name')

    if (!categories){
        res.status(400)
        throw new Error('No categories')
    }
    res.status(200).json(categories)
})
module.exports={addCategory,deleteCategory,getCategories}