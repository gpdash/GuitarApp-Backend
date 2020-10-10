const   router  =   require('express').Router(),
        User    =   require("../models/User"),
        Tab =   require("../models/Tab"),
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
        const tabs=await Tab.find()
        res.json(tabs)
    }catch(err){
        res.json({message:err})
    }
})

//Get one
router.get('/:tabId',async (req,res)=>{
    try{
        const tab=await Tab.findById(req.params.tabId)
        res.json(tab)
    }catch(err){
        res.json({message:err})
    }
})

//Create one
router.post('/',async (req,res)=>{
    const tab = new Tab({
        _id:req.body._id,
        song:req.body.song,
        artist:req.body.artist,
        comments:req.body.comments,
        image:req.body.image
    })
    try{
        const savedTab=await tab.save()
        res.json(savedTab)
    }catch(err){
        res.json({message:err})
    }
})

//Update one
router.put('/:tabId',async (req,res)=>{  
    try{
        console.log(req.params.tabId)
        const updatedTab = await Tab.updateOne(
            {_id:req.params.tabId},
            { 
                $set:{song:req.body.song,
                artist:req.body.artist,
                comments:req.body.comments,
                image:req.body.image}
                        
            })
        res.json(updatedTab)
    }catch(err){
        res.json({message:err})
    }
})

//Delete one
router.delete('/:tabId',async (req,res)=>{
    try{
        const removedTab=await Tab.deleteOne({_id:req.params.tabId})
        res.json(removedTab)
    }catch(err){
        res.json({message:err})
    }
})

module.exports=router  