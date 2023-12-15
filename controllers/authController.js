const User = require('../models/user');
const {hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken');

const test = (req,res)=>{
    res.json('test is working')
}

//Register EndPoint
const registerUser = async (req,res) =>{

    try{
        const {name,email,password} = req.body;

        // Check if name was entered
        if(!name){
            return res.json({
                error: 'name is required'
            })
        }

        //Check Password
        if(!password || password.length<6){
            return res.json({
                error: 'Password is required and must be atleast 6 characters long'
            })
        }
        //Check Email
        const exist = await User.findOne({email});
        if(exist){
            return res.json({
                error:'Email is taken already'
            })
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            name,email,password: hashedPassword,
        })

        return res.json(user)


    }
    catch(error){
        console.log(error)
    }

}


//Login Endpoint

const loginUser = async (req,res)=>{

    try{
        const {email,password} = req.body;

        //check
        const user = await User.findOne({email});

        if(!user){
            return res.json({
                error:"No user found"
            })
        }

        //CHECK PASSWORD
        const match = await comparePassword(password,user.password)
        if(match){
            jwt.sign({email:user.email, id:user._id, name: user.name,},process.env.JWT_SECRET,{},(err,token) =>{
                res.cookie('token',token).json(user)
            })
        }
        else{
            res.json({
                error:'Passwords donot match'
            })
        }

    }catch(err){
        console.log("Login: ",err)
    }

}

module.exports = {
    test,
    registerUser,
    loginUser,
}