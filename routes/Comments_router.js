const   router  =   require('express').Router(),
        User    =   require("../models/User"),
        Comment =   require("../models/Comment"),
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
        const comments=await Comment.find()
        res.json(comments)
    }catch(err){
        res.json({message:err})
    }
})

//Get one
router.get('/:commentId',async (req,res)=>{
    try{
        const comment=await Comment.findById(req.params.commentId)
        res.json(comment)
    }catch(err){
        res.json({message:err})
    }
})

//Create one
router.post('/',async (req,res)=>{
    const comment = new Comment({
        comment:req.body.comment
    })
    try{
        const savedComment=await comment.save()
        res.json(savedComment)
    }catch(err){
        res.json({message:err})
    }
})

//Update one
router.put('/:commentId',async (req,res)=>{  
    try{
        const updatedComment = await Comment.updateOne(
            {_id:req.params.commentId},
            { 
                $set:{comment:req.body.comment}
            })
        res.json(updatedComment)
    }catch(err){
        res.json({message:err})
    }
})

//Delete one
router.delete('/:commentId',async (req,res)=>{
    try{
        const removedComment=await Comment.deleteOne({_id:req.params.commentId})
        res.json(removedComment)
    }catch(err){
        res.json({message:err})
    }
})

module.exports=router  