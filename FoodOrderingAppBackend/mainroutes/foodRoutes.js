const express=require('express');
const router=express.Router();
const f=require('../data');
const foodModel=require('../models/foodModel').foodModel;


router.get("/foods/seed",async(req,res)=>{
    const foodCount= await foodModel.countDocuments();
    if(foodCount>0){
        res.send("Seed is already done!");
        return;
    }
    await foodModel.create(f.food);
    res.send("Seed is done!");
})

//route for food data
router.get('/foods',async (req,res)=>{
    try {
        const foods= await foodModel.find();
        res.json(foods);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

//route for food search 
router.get('/foods/search/:searchTerm',async(req,res)=>{
    const searchTerm = new RegExp(req.params.searchTerm,'i');
    console.log(searchTerm);
    // const foods=f.food.filter(food=>food.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const foods= await foodModel.find({name:searchTerm})
    res.send(foods);
})

//route for food by id
router.get('/foods/:foodId',async(req,res)=>{
    const foodId = req.params.foodId;
    console.log("foodid",foodId);
    const food = await foodModel.findById(foodId);
    res.send(food);
})

module.exports=router;