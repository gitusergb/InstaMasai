const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Post}= require('../model/post.model');


//post
const createPost = async (req, res) => {
  try { 
const post = new Post(req.body)
await post.save()
res.status(200).json({ msg:'A new post has been Created',post:post});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//get
const getPosts =async( req ,res)=>{

    try {
        const { page = 1, limit = 3, minComments, maxComments,device} = req.query;
    
        if (minComments && maxComments) {
          query.no_of_comments = { $gte: minComments, $lte: maxComments };
        }
    
        if (device) {
            query.device =device;
          }

        const options = {
          page: parseInt(page),
          limit: parseInt(limit),
        };
    
        const posts = await Post.find({userID:req.body.userID})
          .skip((parseInt(page) - 1) * parseInt(limit))
          .limit(parseInt(limit));
          //const posts = await Post.find({userID:req.body.userID})
        res.status(200).send(posts);
          } catch (error) {
            res.status(400).send({ error: error.message });
          }

}

//get top once
const getTopPosts =async( req ,res)=>{
    try { 
        const { page = 1, limit = 3 } = req.query;
    const posts = await Post.find({ userID:req.body.userID})
      .sort({ no_of_comments: -1 }) 
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
        // const posts = await Post.find({userID:req.body.userID})
        res.status(200).send(posts);
          } catch (error) {
            res.status(400).send({ error: error.message });
          }

}



//update/patch
const updatePost =async(req ,res)=>{
const {postId}=req.params
    try { 
        const post = await Post.findOne({_id:postId})
        if(req.body.userID===post.userID){
       await Post.findByIdAndUpdate({_id:postId},req.body)
       res.status(200).send({ msg:`post with Id:${postId} has been updated`});}
       else{
        res.status(400).send({ msg:`You are not Authorised`});}
       
          } catch (error) {
            res.status(400).send({ error: error.message });
          }

}


//delete
const deletePost =async(req ,res)=>{
    const {postId}=req.params
        try { 
            const post = await Post.findOne({_id:postId})
            if(req.body.userID===post.userID){
           await Post.findByIdAndDelete({_id:postId})
           res.status(200).send({ msg:`post with Id:${postId} has been deleted`});}
           else{
            res.status(400).send({ msg:`You are not Authorised`});}
           
              } catch (error) {
                res.status(400).send({ error: error.message });
              }
    
    }

module.exports = {createPost,getPosts,getTopPosts,updatePost,deletePost};