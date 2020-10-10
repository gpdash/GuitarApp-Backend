const   router  =   require('express').Router(),
        User    =   require("../models/User"),
        Movie =   require("../models/Movie"),
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
        const movies=await Movie.find()
        res.json(movies)
    }catch(err){
        res.json({message:err})
    }
})

//Get tabs
router.get('/tabs',verify,async (req,res)=>{
    try{
        const movies=await Movie.find({tabs:{$exists: true, $ne: null}})
        
        let movies_list = movies.map(function (movie) {
            return movie.toJSON()
          })
        movies_list = movies_list.map(function(obj) { 
            obj['song_list'] = obj['tabs']; // Assign new key 
            delete obj['chords'];
            delete obj['tabs']; // Delete old key 
            return obj; 
          })
        res.json(movies_list)
    }catch(err){
        res.json({message:err})
    }
})

//Get chords
router.get('/chords',verify,async (req,res)=>{
    try{
        // const movies=await Movie.find({chords:{$exists: true, $ne: null}})
        
        const movies=await Movie.find({chords:{$exists: true, $ne: null}})
        
        let movies_list = movies.map(function (movie) {
            return movie.toJSON()
          })
        movies_list = movies_list.map(function(obj) { 
            obj['song_list'] = obj['chords']; // Assign new key 
            delete obj['chords'];
            delete obj['tabs']; // Delete old key 
            return obj; 
          })
        res.json(movies_list)
    }catch(err){
        res.json({message:err})
    }
})

//Get one
router.get('/:movieId',async (req,res)=>{
    try{
        const movie=await Movie.findById(req.params.movieId)
        res.json(movie)
    }catch(err){
        res.json({message:err})
    }
})

//Create one
router.post('/',async (req,res)=>{
    const movie = new Movie({
        _id:req.body._id,
        name:req.body.name,
        tabs:req.body.tabs,
        chords:req.body.chords,
        image:req.body.image
    })
    try{
        const savedMovie=await movie.save()
        res.json(savedMovie)
    }catch(err){
        res.json({message:err})
    }
})

//Update one
router.put('/:movieId',async (req,res)=>{  
    try{
        console.log(req.params.movieId)
        const updatedMovie = await Movie.updateOne(
            {_id:req.params.movieId},
            { 
                $set:{name:req.body.name,
                tabs:req.body.tabs,
                chords:req.body.chords,
                image:req.body.image}
                        
            })
        res.json(updatedMovie)
    }catch(err){
        res.json({message:err})
    }
})

//Delete one
router.delete('/:movieId',async (req,res)=>{
    try{
        const removedMovie=await Movie.deleteOne({_id:req.params.movieId})
        res.json(removedMovie)
    }catch(err){
        res.json({message:err})
    }
})

module.exports=router  