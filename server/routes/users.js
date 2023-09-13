const express = require('express');
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Post = require('../models/Post');

const router = express();

//UPDATE
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password, salt)
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json(updatedUser)
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(401).json("You can update your account!");
    }
});

//DELETE
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user=await User.findById(req.params.id)
            if(user){
                try {
                    await Post.deleteMany({username:user.username})
                    await User.findByIdAndDelete(req.params.id);
                    res.status(200).json("User has been deleted!");
                } catch (error) {
                    res.status(500).json(error);
                }
            }
        } catch (error) {
           res.status(404).json("User not found!")
        }
    } else {
        res.status(401).json("You can delete only your account!");
    }
});

//GET USER
router.get("/:id",async(req,res)=>{
    try {
        const user=await User.findById(req.params.id);
        const {password,...other}=user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

module.exports = router