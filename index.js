const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
require('./models/db')
const AuthRouter = require('./Routers/AuthRouter')





//middleware
app.use(bodyParser.json())
app.use(cors())

//router
 app.use('/auth',AuthRouter);

//server 
const PORT=process.env.PORT  || 3000
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})