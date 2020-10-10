const express = require('express'),
    app=express(),
    mongoose=require('mongoose'),
    bodyParser=require('body-parser'),
    authRoute=require('./routes/auth'),
    postsRoute=require('./routes/posts'),
    comments_router=require('./routes/Comments_router'),
    chords_router=require('./routes/Chords_router'),
    movies_router=require('./routes/Movies_router'),
    tabs_router=require('./routes/Tabs_router'),
    dotenv=require("dotenv"),
    cors=require('cors')

//Load enviroment
dotenv.config();
    
//DB Connection
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log("DB connected")
})

//Middleware
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//Route Moddlewares
app.use('/api',authRoute)
app.use('/api/posts',postsRoute)
app.use('/api/comment',comments_router)
app.use('/api/chord',chords_router)
app.use('/api/tab',tabs_router)
app.use('/api/movie',movies_router)

// const server =http.createServer(app);
app.listen(3001, process.env.IP, function(){
	console.log("Server has started on PORT: ",3001);
});


