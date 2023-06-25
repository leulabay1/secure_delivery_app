const u=require('../users');
require('dotenv').config({ path: './config.env' })
const express=require('express');
const router=express.Router();
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const bcrypt= require('bcryptjs');
const userModel= require('../models/userModel');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');

router.get("/users/seed",async(req,res)=>{
    const userCount= await userModel.countDocuments();
    if(userCount>0){
        res.send("Seed is already done!");
        return;
    }
    await userModel.create(u.users);
    res.send("Seed is done!");
})

// register user 
router.post('/users/register',async (req,res)=>{
    try {
        const newUser=req.body;
        console.log('newUser',newUser);
        const user= await userModel.findOne({email:newUser.email});
        if(user){
            res.status(400).send('User is already exist, please login!');
            return;
        }
        const encryptedPassword = await bcrypt.hash(newUser.password,10);
        newUser.password=encryptedPassword;
        newUser.isAdmin=false;
        console.log("final",newUser)
        const dbUser = await userModel.create(newUser);
        res.send(generateTokenResponse(dbUser));
        
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }     
})


// login user 
router.post('/users/login',asyncHandler(async (req,res)=>{
    try {
        console.log('user',"this is the user thing");
        const {email,password}=req.body;
        let user= await userModel.findOne({email});

        const secret = speakeasy.generateSecret();

        const otp = speakeasy.totp({
            secret: secret.base32,
            digits: 6,
            step: 30,
          });// Generate the OTP

        user.otp = otp;
        await user.save();

        await sendEmailWithOTP(email, otp);


        const decryptedPassword = await bcrypt.compare(req.body.password, user.password, function(err, result) {
            if(result){
                console.log('result',result);
                res.json({"result": "correct password"})
            }
            else{
                console.log('err password not correct');
                res.status(400).send("credentials is not valid");
            }   
            // console.log('err',err);
            // console.log('result',result);
          })
         
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}))
router.post('/users/verify',asyncHandler(async (req,res)=>{
    try{
    const otp = req.body.otp;
    const email = req.body.email;
    let user = await userModel.findOne({email});
    if(user.otp == otp){
        console.log('otp',otp);
        res.json(generateTokenResponse(user.toObject()))
    }else{
        res.status(400).send("OTP is not valid");
    }}catch(error){
        console.log(error);
        res.status(400).send(error);
    }

}))

// Function to send the email with OTP
async function sendEmailWithOTP(email, otp) {
  try {
    // Create a Nodemailer transporter
    
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      // Configure the email service provider
      service: 'gmail',
      host: 'smtp.gmail.com', // Replace with your email service provider
      auth: {
        user: 'Leulabay4@gmail.com', // Replace with your email address
        pass: 'imeoumcjwlyuylyz', // Replace with your email password
      },
    });

    // Send the email
    const info = await transporter.sendMail({
      from: 'leulabay4@gmail.com', // Replace with your email address
      to: email, // Recipient's email address
      subject: 'One-Time Password (OTP)',
      text: `Your OTP: ${otp}`,
    });

    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}


// generate login token 
const generateTokenResponse = (user)=>{
    payload={
        id:user.id,
        email:user.email,
        isAdmin:user.isAdmin
    }
    const token=jwt.sign(payload,"leulabayejigu",{expiresIn:"30d"});
    user.token=token;
    return user;
}

//store cartData
router.post('/user/:id',asyncHandler(
    async(req,res)=>{
        const response = await userModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { cart: req.body} },
            { new: true}
          )
          console.log(response.items);
          res.send(response);
        }));

router.get('/cart',asyncHandler(
    async(req,res)=>{
        const email = req.body.email;
        let userCart= await userModel.findOne({email});
        res.json(userCart.cart);
    }
))

module.exports=router;