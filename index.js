const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
require('./models/db')
const AuthRouter = require('./Routers/AuthRouter')
const UserRouter = require('./Routers/UserRouter')





//middleware
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors())

//router
 app.use('/auth',AuthRouter);
 app.use('/user',UserRouter);

//server 
const PORT=process.env.PORT  || 3000
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})