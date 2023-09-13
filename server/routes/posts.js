const express = require('express');
const User = require("../models/User");
const Post = require('../models/Post');

const router = express();

//CREATE POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
                res.status(200).json(updatedPost);
            } catch (error) {
                res.status(500).json(error.message);
            }
        } else {
            res.status(401).json('You can update your post!');
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.deleteOne();
                res.status(200).json("Post deleted..!");
            } catch (error) {
                res.status(500).json(error.message);
            }
        } else {
            res.status(401).json('You can delete only your post!');
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});

//GET POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

//GET ALL POST
router.get("/", async (req, res) => {
    const username=req.query.user;
    const catName=req.query.cat;
    try {
        let posts;
        if(username){
            posts=await Post.find({username});
        }else if(catName){
            posts=await Post.find({categories:{
                $in:[catName]
            }});
        }else{
            posts=await Post.find({});
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router;