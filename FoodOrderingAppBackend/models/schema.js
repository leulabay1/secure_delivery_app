
// const mongoose=require('mongoose');
// const validator=require('validator');
// const bcrypt= require('bcryptjs');
// const users=new mongoose.Schema({
//     firstName:{
//         type:String,
//         required:true,
//     },
//     lastName:{
//         type:String,
//         required:true,
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:[true,'email is already present'],
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Invalid Email')
//             }
//         }
//     },
//     number:{
//         type:Number,
//         min:10,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         min:6,
//         required:true
//     },
//     confirmPassword:{
//         type:String,
//         min:6,
//         required:true
//     },
    // houseNumber:{
    //     type:String,
    //     min:6,
    //     required:true
    // },
    // streetArea:{
    //     type:String,
    //     required:true
    // },
    // city:{
    //     type:String,
    //     required:true
    // },
    // state:{
    //     type:String,
    //     required:true
    // },
    // pincode:{
    //     type:Number,
    //     min:6,
    //     required:true
    // },
//     cart:[{
//             quantity:Number,
//             food:Object
//     }]

// })

// users.pre('save',async function(next){
//     if(this.isModified('password')){
//         this.password=await bcrypt.hash(this.password,10);
//         this.confirmPassword=undefined;
//     }
//     next();
// })

// module.exports=new mongoose.model('user',users);