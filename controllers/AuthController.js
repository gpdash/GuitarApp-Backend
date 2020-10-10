const User = require("../models/User")
const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken')

exports.register=(req,res,next)=>{
    bcrypt.hash(req.body.password,10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
    
        let user= new User({
            name:req.body.name,
            email:req.body.email,
            password: hashedPass
        })
        user.save().then(user=>{
            res.json({
                msg:"Added"
            })
            .catch(err=>{
                res.json({
                    msg:"eroor"
                })
            })
        })
    })
}

exports.hi=(req,res,next)=>{
   
}

// exports.hi=(req,res,next)=>{
//     res.json({
//         msg:'hi'
//     })
// }

