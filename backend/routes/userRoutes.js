const express = require('express')
const router = express.Router()
const { 
    authUser,
    registerUser,
    logoutUser,
    getUser,
    updateUser,
    confirmUser
} = require('../controllers/userController.js');
const {protect,adminProtect}=require('../middleware/authMiddleware.js')

router.get('/me',protect,confirmUser)
router.post('/auth', authUser)
router.post('/register', registerUser)
router.post('/logout',logoutUser)
router.route('/profile').get(protect,getUser).put(protect,updateUser)

router.get('/admin',protect,adminProtect,(req,res)=>{
    console.log('hi admin')
    res.json({admin:true})
})

module.exports= router