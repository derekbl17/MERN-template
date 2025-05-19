const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')
const generateToken=require('../utils/generateToken')

// Auth user, set token
// POST /api/users/auth
const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body

    const user=await User.findOne({email})

    if (user && (await user.matchPasswords(password))){
        generateToken(res,user._id,user.role)
        res.status(201).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            role:user.role
        })
    } else{
        res.status(401);
        throw new Error('Invalid email or password')
    }
    
})

// Register new user
// POST /api/users/register
const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body

    const userExists=await User.findOne({email})
    if(userExists){
        res.status(400);
        throw new Error('User with this email already exists')
    }

    const user=await User.create({
        name,
        email,
        password
    })

    if (user){
        generateToken(res,user._id,user.role)
        res.status(201).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            role:user.role
        })
    } else{
        res.status(400);
        throw new Error('Invalid user data')
    }
})

// logout user
// POST /api/users/logout
const logoutUser=asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0)
    })
    res.status(200).json({message:"Logged out"})
})

// Get user profile
// GET /api/users/profile
const getUser=asyncHandler(async(req,res)=>{
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    }

    res.status(200).json({user})
})

const confirmUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.userId).select('-password');
    if (user) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });

// Update user profile
// PUT /api/users/profile
const updateUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);
    if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;

        if(req.body.password){
            user.password=req.body.password
        }
        const updatedUser=await user.save()
        res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            role:user.role
        })
    }else{
        res.status(404).json({message:'User not found'})
    }
})

module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getUser,
    updateUser,
    confirmUser
};