const asyncHandler=require('express-async-handler')

const Post=require('../models/postModel')

const getPosts=asyncHandler(async(req,res)=>{
    const posts=await Post.find()
    res.status(200).json(posts)
})

const postPost=asyncHandler(async(req,res)=>{
    if (!req.body){
        res.status(400)
        throw new Error('Request body cant be empty')
    }
    const post=await Post.create({
        name:req.body.name
    })
    res.status(200).json(post)
})
// put => overwrite whole existing target. Patch only changes specific values of target
const putPost=asyncHandler(async(req,res)=>{
    const post=await Post.findById(req.params.id)
    if(!post){
        res.status(400)
        throw new Error('Post not found')
    }

    const updatedPost=await Post.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })

    res.status(200).json(updatedPost)
})

const deletePost=asyncHandler(async(req,res)=>{
    const post=await Post.findById(req.params.id)
    if(!post){
        res.status(400)
        throw new Error('Post not found')
    }
    await Post.findByIdAndDelete(req.params.id)
    res.status(200).json({id:req.params.id})
})

module.exports={getPosts,postPost,putPost,deletePost}