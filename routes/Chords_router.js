const   router  =   require('express').Router(),
        User    =   require("../models/User"),
        Chord =   require("../models/Chord"),
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
        const chords=await Chord.find()
        res.json(chords)
    }catch(err){
        res.json({message:err})
    }
})

//Get one
router.get('/:chordId',async (req,res)=>{
    try{
        const chord=await Chord.findById(req.params.chordId)
        res.json(chord)
    }catch(err){
        res.json({message:err})
    }
})

//Create one
router.post('/',async (req,res)=>{
    const chord = new Chord({
        _id:req.body._id,
            song:req.body.song,
            artist:req.body.artist,
            comments:req.body.comments,
            image:req.body.image
    })
    try{
        const savedChord=await chord.save()
        res.json(savedChord)
    }catch(err){
        res.json({message:err})
    }
})

//Update one
router.put('/:chordId',async (req,res)=>{  
    try{
        console.log(req.params.chordId)
        const updatedChord = await Chord.updateOne(
            {_id:req.params.chordId},
            { 
                $set:{song:req.body.song,
                artist:req.body.artist,
                comments:req.body.comments,
                image:req.body.image}
                        
            })
        res.json(updatedChord)
    }catch(err){
        res.json({message:err})
    }
})

//Delete one
router.delete('/:chordId',async (req,res)=>{
    try{
        const removedChord=await Chord.deleteOne({_id:req.params.chordId})
        res.json(removedChord)
    }catch(err){
        res.json({message:err})
    }
})

module.exports=router  