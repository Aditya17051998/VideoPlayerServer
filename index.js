const express=require('express');
const app=express();
const mongoose=require("mongoose");
const cors=require('cors');
const PORT=process.env.PORT || 5000;
const post = require('./model/posts');


app.use(cors());
app.use(express.urlencoded());
app.use(express.json());


mongoose.connect("mongodb+srv://Aditya:8Epj8lJJdFbuopTy@cluster0.8wxf0.mongodb.net/videoUploader?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

app.get('/',(req,res)=>{
    post.find()
    .then(posts=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err);
    })
});
app.post('/upload',(req,res)=>{
    const {movieName, releaseDate,thumbnail,language,video}=req.body;
    console.log(req.body);
    if(!movieName || !releaseDate || !thumbnail || !language || !video){
        return res.status(422).json({error:"please prvide all filed"});
    }
    const Post=new post({
        movieName,
        releaseDate,
        thumbnail,
        language,
        video
    })
    Post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err);
    })
    
});

mongoose.connection.on('connected',()=>{
    console.log("connected to mongodb");
})
mongoose.connection.on('error',(err)=>{
    console.log("error in connected to mongodb",err);
})
app.listen(PORT,()=>{
    console.log("server is running on",PORT);
})