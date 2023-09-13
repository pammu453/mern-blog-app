const express=require('express');
const User=require("../models/User");
const bcrypt=require("bcryptjs");

const router=express();

//REGISTER
router.post("/register",async(req,res)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const {username,email,password}=req.body;
        const newUser=new User({username,email,password:bcrypt.hashSync(password, salt)});
        const user=await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});


//LOGIN
router.post('/login',async (req,res)=>{
    try {
        const user=await User.findOne({username:req.body.username});
        !user && res.status(400).json("wrong credentials..!");

        const valid=bcrypt.compareSync(req.body.password,user.password);
        !valid && res.status(400).json("wrong credentials..!!");

        const {password,...other}=user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error); 
    }
})

module.exports=router