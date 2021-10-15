'use strict'

var express = require('express');
var app = express();
var bodyparcer = require('body-parser');
var mongoose = require('mongoose');
var port =  process.env.PORT || 4201;

var cliente_route = require('../backend/routes/cliente');
var admin_route = require('../backend/routes/admin');

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

app.use(bodyparcer.urlencoded({extended:true}));
app.use(bodyparcer.json({limit:'50 mb', extended:true}))

app.use((req, res, next) =>{
    res.header('Access-Contol-Allow-Origin', '*');
    res.header('Access-Contol-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Contol-Allow-Request-Methods');
    res.header('Access-Contol-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS' );
    next()
});


app.use('/api' ,cliente_route);
app.use('/api' ,admin_route);

module.exports = app;