
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');

 
const {connection} = require("./db")
const {userRouter}= require('./Routes/user.routes');
const {postRouter} = require('./Routes/post.routes');

const app = express();

app.use(express.json())
app.use(express.static('public'));
 app.use(cors())

  

app.use("/users",userRouter)
app.use("/posts",postRouter)


// app.use("/",(req,res)=>{
//     res.send("post app")
//     console.log("post app")
// })

  const PORT = process.env.PORT || 3000;

    async function startServer() {
        try {
          await connection;
          console.log("Database connected");
        } catch {
          console.log("Database connect Failed");
        }
      
        app.listen(PORT,() => {
          console.log(`Server is running at http://localhost:${PORT}`);
          console.log("Server Started");
        });
      }
      
      startServer();