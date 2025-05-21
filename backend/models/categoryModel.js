const mongoose=require('mongoose')

const categorySchema=mongoose.Schema({
        name:{type:String, required:[true,'category cant be empty'], unique:true}
    },
    {
    timestamps:true
    }
);

module.exports=mongoose.model('Category',categorySchema)