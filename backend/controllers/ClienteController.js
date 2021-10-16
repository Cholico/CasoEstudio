'use strict'

var Cliente = require('../models/cliente');
var bcrypt = require('/bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const registro_cliente = async function(req, res){
    var data = req.body;
    var clientes_arr=[];

    clientes_arr = await Cliente.find({email:data.email});

    if(clientes_arr.length == 0){

        if (data.password){
            bcrypt.hash(data.password, null, null, async function(err, hash){
                if(hash){
                    data.password = hash
                    var registro  =  await Cliente.create(data);
                    res.status(200).send({data:registro});
                }else{
                    res.status(200).send({message: 'Error server', data:undefined});
                }
            });
        }else{
            res.status(200).send({message: 'No hay una contraseña', data:undefined});
        }

        res.status(200).send({data: registro});
    }else{
        res.status(200).send({message: 'Este correo ya esta en uso', data:undefined});
    }

    
}

const login_cliente = async function(req, res){
    var data = req.body
    var clientes_arr = [];

    clientes_arr = await Cliente.find({email:data.email});

    if(clientes_arr.length == 0){
        res.status(200).send({message: 'No se encontro el correo', data:undefined});
    }else{
        let user = clientes_arr[0];

        bcrypt.compare(data.email, user.email, async function(res, check){
            if(check){
                res.status(200).send({
                    data:user,
                    token: jwt.createtoken(user)
                });
            }else{
                res.status(200).send({message: 'La contraseña no coincide con la del correo', data:undefined});
            }
        });
    }

};

module.exports = {
    registro_cliente,
    login_cliente
}