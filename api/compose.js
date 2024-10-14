const express = require('express');
const router = express.Router();
const Post = require("../models/post");
const authMiddleware=require("./middleware");

router.get('/',authMiddleware, function (req, res) {
    res.render('compose');
});

router.post('/',authMiddleware, function (req, res) {
    const newPost = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    })
    newPost.save()
        .then(() => {
            res.redirect("/home");
        });
})



module.exports = router;