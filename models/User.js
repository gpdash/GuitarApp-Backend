const mongoose =require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        min:6,
        required:true
    },
    email:{
        type:String,
        min:6,
        required:true
    },
    password:{
        type:String,
        min:6,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const User=mongoose.model('User',userSchema)
module.exports=User