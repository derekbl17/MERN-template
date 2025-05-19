const mongoose=require('mongoose')

const postSchema=mongoose.Schema(
    {
    name:{
        type:String,
        required:[true,'name cant be empty']
    }
    },
    {
    timestamps:true
    }
);

module.exports=mongoose.model('Post',postSchema)