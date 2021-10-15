'use strict'

var express = require('express');
var app = express();
var bodyparcer = require('body-parser');
var mongoose = require('mongoose');
var port =  process.env.PORT || 4201;

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

module.exports = app;