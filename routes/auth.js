const express=require('express'),
        router=express.Router(),
        User = require("../models/User"),
        bcrypt=require('bcryptjs'),
        jwt=require('jsonwebtoken')
// AuthController=require('../controllers/AuthController')

function getToken(user){
    return token=jwt.sign({_id:user._id}, process.env.TOKEN_SECRET)
}

router.post('/register', async (req,res)=>{

    var user= await User.findOne({email:req.body.email})
    if(user) return res.status(400).send('Email already exists')
    
    const hashPassword =await bcrypt.hash(req.body.password, 10)

    user= new User(req.body)
    user.password=hashPassword
    user.save((err,registeredUser)=>{
        if(err) res.status(400).send(err)
        const token=getToken(user)
        res.send({token})
    })
})


router.post('/login', async (req,res)=>{
    try {
        const user= await User.findOne({email:req.body.email})
        if(!user) return res.status(400).send('Wrong email')
        
        const validPass = await bcrypt.compare(req.body.password,user.password)
        if(!validPass) return res.status(400).send('Wrong password')

        const token=getToken(user)
        res.send({token})   
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports=router  