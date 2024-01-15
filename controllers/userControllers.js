const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User}= require('../model/user.model');


const registerUser = async (req, res) => {
    const {name,email,gender,password,age,city}=req.body
 
  try { 

 bcrypt.hash(password,5,async(err,hash)=>{
    if(err){
            res.status(200).send({"error":err})
    }else{
        const user=new User({name,email,gender,password:hash,age,city})
        await user.save()
        res.status(200).json({ msg: 'The new user has been registered',registeredUser:user});
    }
 });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async(req, res) => {
    const {email, password} = req.body;
  try {
   
    const user = await User.findOne({email});
    bcrypt.compare(password,user.password,(err, result)=>{
     if(result){
        const token = jwt.sign({ userID:user._id,name:user.name},process.env.key);
        res.status(200).send({ msg:'Login successful!', "token" : token,expiredIn:"7 days" });
     }else{
        res.status(400).send({ error:'Invalid email or password' });
     }
    })
  } catch (err) {
    res.status(400).json({ error: err });
  }
};


// GET /users/logout
const logoutUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    res.status(200).json({ msg: 'User has been logged out' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {registerUser,loginUser, logoutUser };
