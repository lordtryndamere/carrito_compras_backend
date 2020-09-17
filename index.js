const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors  = require('cors')
const PORT = process.env.PORT || 3000

dotenv.config();

//Load files routes
const Product = require('./src/routes/product.route');
const Order = require('./src/routes/order.route');
const Category = require('./src/routes/category.route');





//Middlewares

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(helmet());
app.use(cors());


//DB
const db = require('./src/models');
db.sequelize.sync();




// Routes defineds

app.use('/API/product',Product);
app.use('/API/order',Order);
app.use('/API/category',Category);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`); 
    
})