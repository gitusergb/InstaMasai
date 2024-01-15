const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  city: { type: String, required: true },
},{
    versionKey:false
});

const User = mongoose.model('User', userSchema);

module.exports = {User};