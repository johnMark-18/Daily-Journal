const express = require('express');
const router = express.Router();
const Post = require("../models/post");
const authMiddleware=require("./middleware");
const homeStartingContent = "Welcome to Daily journal!!";

// Define routes
router.get('/',authMiddleware, (req, res) => {
    Post.find({})
    .then((posts)=>{
      res.render('home', { hContent: homeStartingContent, postsejs: posts });
    })
    .catch(()=>{
      console.log("error redirecting home");
    })
});



router.get('/:postId',authMiddleware,function(req,res){
    const reqPostId = (req.params.postId);
  
    Post.findOne({_id: reqPostId})
      .then((i)=>{
        res.render('post',{titleEjs : i.title,contentEjs: i.content})
      })
      .catch(()=>{
        console.log("error readmore")
      })
  })
// Export router
module.exports = router;
