'use strict'

var express = require('express');
var app = express();
var bodyparcer = require('body-parser');
var mongoose = require('mongoose');
var port =  process.env.PORT || 4201;

var cliente_route = require('../backend/routes/cliente')

mongoose.connect('mongodb://127.0.0.1:27017/CasoEstudio', (err, res) => {
    if(err){
        console.log(err);
    }
    else{
        
        app.listen(port, function(){
            console.log('Servidor corriendo'+ port);
        });
    }
})

app.use(bodyparcer.urlencoded);

app.use((req, res, next) =>{
    res.header('Access-Contol-Allow-Origin', '*');
    res.header('Access-Contol-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Contol-Allow-Request-Methods');
    res.header('Access-Contol-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS' );
    next()
});


app.use(cliente_route);

module.exports = app;