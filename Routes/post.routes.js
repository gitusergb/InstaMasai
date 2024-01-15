const express = require('express');
const postRouter = express.Router();
   const { createPost,getPosts,getTopPosts,updatePost,deletePost} = require('../controllers/postController');
   const {auth} = require('../middleware/auth.middleware');

   postRouter.post('/add',auth, createPost);
   postRouter.get('/',auth, getPosts);
   postRouter.get('/top',auth, getTopPosts);
   postRouter.put('/update/:postId',auth, updatePost);
   postRouter.delete('/delete/:postId',auth, deletePost);

   module.exports = {postRouter};
