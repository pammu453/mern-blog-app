require("dotenv").config();

const express=require('express');
const mongoose=require('mongoose');
const cors=require("cors");
const path=require("path");
const app=express();

const authRouter=require('./routes/auth.js');
const userRouter=require('./routes/users.js');
const postRouter=require("./routes/posts.js");
const catRouter=require("./routes/categories.js");
const multRouter=require("./routes/mult.js");

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('Connected to the database..!')
}).catch((error)=>{
    console.log(error.message)
})

app.use(express.json());
app.use(cors());
app.use("/imges",express.static(path.join(__dirname,"/imges")))

app.use("/api/auth",authRouter);
app.use("/api/users",userRouter);
app.use("/api/posts",postRouter);
app.use("/api/cat",catRouter);
app.use("/api/mult",multRouter);

app.listen(5000,()=>{
    console.log('Server running at port 5000');
});

