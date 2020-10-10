const jwt=require('jsonwebtoken')


module.exports= function(req,res,next){

    const token=req.header('authorization').split(" ")[1]
    if(!token) return res.status(401).send("Access Denied")
    
    try {
        const verifiedUser =jwt.verify(token, process.env.TOKEN_SECRET)
        req.user=verifiedUser
        next()
    } catch (err) {
        res.status(401).send('Invalid Token')
    }
}