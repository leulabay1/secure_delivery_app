const express = require('express');
const db = require('./config/db_connect');
const cors = require('cors');
const bodyParser = require('body-parser');

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const router = require('./routes/authRoutes');
const foodRouter = require('./routes/foodRoutes');
const orderRouter = require('./routes/orderRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const port = process.env.PORT || 3000;

const app = express();

// Swagger configuration
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gorana Food Delivery Web App API',
      version: '1.0.0',
      description: 'Gorana Food Delivery Web App API documentation',
    },
  },
  apis: ['./routes/*'], // Specify the file(s) where your JSDoc annotations are present
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors({
        credentials: true,
        origin: true
    }
));

app.use(router);
app.use(foodRouter);
app.use(orderRouter);
app.use(paymentRouter);

app.listen(port,()=>{
    console.log(`listening on ${port}`)
})