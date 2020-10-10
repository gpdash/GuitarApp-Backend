const mongoose =require('mongoose')

const tabSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    song:{
        type:String,
        required:true
    },
    artist:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    comments:{
        type:Array,
        required:true
    }
})

module.exports=mongoose.model('Tab',tabSchema)