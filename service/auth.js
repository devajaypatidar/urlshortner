const jwt = require('jsonwebtoken');
const secret = "ajay1234";

function setUser(user){
   

    return jwt.sign({
        _id: user.id,
        email: user.email
    },secret);
} 

function getUser(token){
    if(!token) return null;
    try{

        return jwt.verify(token,secret)
    }catch(err){
        console.log(err);
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}