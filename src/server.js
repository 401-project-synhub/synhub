'use strict'; 

// const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const app = express();
const app = require('../app.js').app;
const express = require('../app.js').express;
const server = require('../app.js').server;
const dataRoutes = require('../lib/routes/api-v1.js');


require('../chat-app/coding-server.js');

//requiring the routers 
const router = require('./router/router.js');

//using modules middleware

app.use(morgan('dev'));
app.use(express.json());
// app.use(express.static('./public'));
app.use(cors());

//requiring the routers 
app.use('/',router);
app.use('/api/v1', dataRoutes);


module.exports = {
  // server:app, 
  start:port=>{
    const PORT = port ||3200;
    server.listen(PORT,()=>console.log(`listening on port ${PORT}`));
  },
};
