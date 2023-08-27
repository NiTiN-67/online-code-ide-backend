// const express = require('express');
// const app  =express();

// app.use(express.static("public"));

// app.get('/home', (request, response)=>{
//     response.send("Hello this is a server");
// })
// app.get('/urljson', (request, response)=>{
//     response.json({'Question' : "This is a question"});
// })

// app.listen(4000, (err)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Server started at port number 4000");
//     }
// })

//Entry file
//const express = require('express'); //common JS
import express from 'express';
import {userRoutes} from './routes/user-routes.js';
import {ideRoutes} from './routes/ide-routes.js';
import cors from 'cors';
const app = express();
app.use(cors()); //cors middleware
app.use(express.json());
app.use('/', userRoutes);
app.use('/', ideRoutes);
//Last Middleware (404)
app.use((request, response, next)=>{
    response.json({message : 'Invalid URL'});
})
const server = app.listen(1234, (err)=>{
    if(err){
        console.log('Server crashed!', err);
    }
    else{
        console.log('Server up and running at ', server.address().port);
    }
})