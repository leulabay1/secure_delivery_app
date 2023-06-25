const express=require('express');
const router=express.Router();
const asyncHandler=require('express-async-handler');
const auth = require('../middleware/checkAuth');
const orderStatus = require('../orderStatus');
const orderModel = require('../models/orderModel');

router.use(auth);
router.post('/orders/create',asyncHandler(
    async(req,res)=>{
        const requestOrder = req.body;

        if(requestOrder.items.length<=0){
            res.status(400).send('Cart is empty');
            return;
        }

        await orderModel.deleteOne({
            user:req.user.id,
            status:orderStatus.NEW
        })

        const newOrder = new orderModel({...requestOrder, user:req.user.id});
        await newOrder.save();
        // console.log('order',newOrder)
        res.send(newOrder);

    }
))

router.get('/orders',asyncHandler(
    async(req,res)=>{
        const orders = await orderModel.find({ user: req.user.id});
        res.status(200).json(orders);
    }
))

router.get('/orders/newOrderFromCurrentUser',asyncHandler(
    async(req,res)=>{
        const order = await getNewOrderForCurrentUser(req);
        if(order) res.send(order);
        else res.status(400).send();
    }
))

router.post('/pay',asyncHandler(async(req,res)=>{
    const order = await getNewOrderForCurrentUser(req);
    if(!order){
        res.status(400).send('Order not found');
        return;
    }
    order.paymentId = paymentId;
    order.status = orderStatus.PAYED;
    await order.save();
    res.send(order._id);
}))

module.exports= router;

async function getNewOrderForCurrentUser(req) {
    return await orderModel.findOne({ user: req.user.id, status: orderStatus.NEW });
}
