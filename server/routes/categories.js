const express = require('express');
const Category= require("../models/Category.js")
const router = express();


//CREATE A CATEGORY
router.post("/",async(req,res)=>{
    const newCat=new Category(req.body)
    try {
        const savedCat=await newCat.save();
        res.status(201).json(savedCat);
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//GET ALL CATEGORY
router.get("/",async(req,res)=>{
    try {
        const cats=await Category.find();
        res.status(201).json(cats);
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router;