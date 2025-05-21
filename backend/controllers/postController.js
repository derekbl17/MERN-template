const asyncHandler=require('express-async-handler')

const Post=require('../models/postModel')

const getPosts=asyncHandler(async(req,res)=>{
    const posts=await Post.find()
    res.status(200).json(posts)
})

const getActivePosts=asyncHandler(async(req,res)=>{
    const posts=await Post.find().active();
    res.status(200).json(posts)
})

const getBlockedPosts=asyncHandler(async(req,res)=>{
    const posts=await Post.find().blocked();
    res.status(200).json(posts)
})

const moderatePost = asyncHandler(async (req, res) => {
    const { action, reason } = req.body;
    
    // Validate input
    if (!action || !['block', 'unblock'].includes(action)) {
        res.status(400);
        throw new Error('Action must be either "block" or "unblock"');
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    // Prepare update based on action
    const update = { updatedAt: new Date() };
    
    if (action === 'block') {
        update.status = 'blocked';
        update.blockedReason = reason || 'No reason provided';
    } else {
        update.status = 'active';
        update.$unset = { blockedReason: 1 };
    }

    const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        update,
        { new: true, runValidators: true }
    );

    res.status(200).json({
        message: `Post ${action === 'block' ? 'blocked' : 'unblocked'} successfully`,
        post: updatedPost
    });
});


const postPost=asyncHandler(async(req,res)=>{
    const { title, description, imageUrl, category } = req.body;

    if (!title || !description || !imageUrl || !category) {
        res.status(400);
        throw new Error('Please include all required fields');
    };

    const post=await Post.create({
        title,
        description,
        imageUrl,
        category,
        author: req.user.userId, // Automatically set from authenticated user
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
    if(post.author.toString() === req.user.userId.toString() || req.user.role === "admin"){
        const updatedPost=await Post.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        })
        res.status(200).json(updatedPost)
    } else{
        res.status(403);
        throw new Error('Not authorized to edit this post')
    }
})

const deletePost=asyncHandler(async(req,res)=>{
    const post=await Post.findById(req.params.id)
    if(!post){
        res.status(400)
        throw new Error('Post not found')
    }
    if(post.author.toString() === req.user.userId.toString() || req.user.role === "admin"){
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({id:req.params.id})
    } else{
        res.status(403);
        throw new Error('Not authorized to delete this post')
    }
})

const toggleLikePost=asyncHandler(async(req,res)=>{
    const post=await Post.findById(req.params.id)
    if(!post){
        res.status(400)
        throw new Error('Post not found')
    }

    const userId = req.user.userId;
    const likeIndex = post.likes.indexOf(userId);

    if (post.author.toString() === userId.toString()) {
        res.status(400);
        throw new Error('Cannot like your own post');
      }

    // Toggle like
    if (likeIndex === -1) {
    // Add like
        post.likes.push(userId);
        await post.save();
        res.status(200).json({
            message: 'Post liked',
            likesCount: post.likes.length,
            isLiked: true
        });
    } else {
    // Remove like
        post.likes.pull(userId);
        await post.save();
        res.status(200).json({
            message: 'Post unliked',
            likesCount: post.likes.length,
            isLiked: false
        });
    }
})

module.exports={getPosts,postPost,putPost,deletePost,moderatePost, getActivePosts, getBlockedPosts,toggleLikePost}