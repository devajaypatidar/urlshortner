const User = require("../model/user");
const { v4: uuidv4 } = require('uuid');
const {setUser,getUser} = require("../service/auth");
async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  
  const user = new User({
    name: name,
    email: email,
    password: password
  });

  await user.save();

  return res.render('home')
}

async function handleUserLogin(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({email: email, password: password});
    console.log(user)
    if(!user){
      return res.render("login",{error:
      "invalid Username or Password"});
    }

    
    const token = setUser( user);
    res.cookie("uid",token);
    return res.redirect("/")

  }

module.exports = {
    handleUserSignup,
    handleUserLogin
}