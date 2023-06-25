const express=require('express');
const db=require('./db_connect');
const cors=require('cors');
const bodyParser=require('body-parser');
const router=require('./mainroutes/routes');
const foodRouter=require('./mainroutes/foodRoutes');
const orderRouter=require('./mainroutes/orderRoutes');
const paymentRouter=require('./mainroutes/paymentRoutes');
const port=process.env.PORT||3000;

const app=express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors({
    credentials:true,
    origin:true}
));

app.use(router);
app.use(foodRouter);
app.use(orderRouter);
app.use(paymentRouter);
app.listen(port,()=>{
    console.log('listening on 3000')
})