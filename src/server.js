'use strict'; 

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

//requiring the routers 
const router = require('./router/router.js');

//using modules middleware

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('./public'));
app.use(cors());

//requiring the routers 
app.use('/',router);




module.exports = {
  server:app, 
  start:port=>{
    const PORT = port ||3200;
    app.listen(PORT,()=>console.log(`listening to port ${PORT}`));
  },
};
