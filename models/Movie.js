const mongoose =require('mongoose')

const movieSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    tabs:{
        type:Array,
        required:true
    },
    chords:{
        type:Array,
        required:true
    }

}, {
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
      }
    }
  

// schema.options.toJSON = {
//     transform: function(doc, ret, options) {
//         ret.id = ret._id;
//         delete ret._id;
//         delete ret.__v;
//         return ret;
//     }
})

module.exports=mongoose.model('Movie',movieSchema)