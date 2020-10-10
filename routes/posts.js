const   router  =   require('express').Router(),
        User    =   require("../models/User"),
        Post    =   require("../models/Post"),
        verify  =   require('./verifyToken')
        
       

//Validation

router.get('/',verify,async (req,res)=>{
    const user= await User.findOne({_id:req.user})
    if (user)
    res.send(user)
})


//Get all
router.get('/all',verify,async (req,res)=>{
    try{
        const posts=await Post.find()
        res.json(posts)
    }catch(err){
        res.json({message:err})
    }
})

//Get one
router.get('/:postId',async (req,res)=>{
    try{
        const post=await Post.findById(req.params.postId)
        res.json(post).statusCode(200)
    }catch(err){
        res.json({message:err})
    }
})

//Create one
router.post('/',async (req,res)=>{
    const post = new Post({
        
        title:req.body.title,
        description:req.body.description
    })
    try{
        const savedPost=await post.save()
        res.json(savedPost).statusCode(200)
    }catch(err){
        res.json({message:err})
    }
})

//Update one
router.put('/:postId',async (req,res)=>{  
    try{
        const updatedPost = await Post.updateOne(
            {_id:req.params.postId},
            { 
                $set:{title:req.body.title,
                    description:req.body.description}
            })
        res.json(updatedPost).statusCode(200)
    }catch(err){
        res.json({message:err})
    }
})

//Delete one
router.delete('/:postId',async (req,res)=>{
    try{
        const removedPost=await Post.remove({_id:req.params.postId})
        res.json(removedPost).statusCode(200)
    }catch(err){
        res.json({message:err})
    }
})

module.exports=router  