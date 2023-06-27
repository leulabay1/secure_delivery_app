const express = require("express");
const router = express.Router();
const asyncHandler=require('express-async-handler');
app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const orderStatus = require('../orderStatus');
const orderModel = require('../models/orderModel');
router.post('/payment',async(req,res,next)=>{
    try {
        let session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: req.body.items.map((item)=>({
                price_data: {
                    currency: 'INR', 
                    product_data: {
                        name: item.food.name,
                        images: []
                    }, 
                    unit_amount: item.food.price*100
                },
                quantity: item.quantity,
            })),
            mode:"payment",
            success_url:"https://gorana-food-house.vercel.app/payment-success",
            cancel_url:"https://gorana-food-house.vercel.app/payment-failed", 
          });
          let order = await orderModel.findOne({ items: req.body.items, status: orderStatus.NEW });
          if(order){
            order.checkout_id = session.id;
            await order.save();
        }
          res.status(200).json(session);
        
    } catch (error) {
        next(error)
    }
})

router.post('/paymentStatus',async(req,res)=>{
        try {
            const c_id = req.body.id;
            console.log(req.body);
            let session = await stripe.checkout.sessions.retrieve(c_id);
            console.log("session",session.payment_status);
            let paymentIntent = '';
            if(session.payment_intent){
                paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
                console.log("paymentIntent.status",paymentIntent.status);
                paymentIntent = paymentIntent.status
            }
            else{
                paymentIntent = 'payment_failed'
            }
            let order = await orderModel.findOne({ checkout_id:c_id});
            if(order){
                order.status = paymentIntent;
                await order.save();
            }

            res.status(200).json(paymentIntent);
            // res.send("hello aashish");
        } catch (error) {
            console.log(error);
        }
    }
)

module.exports = router;
