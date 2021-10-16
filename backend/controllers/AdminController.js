'use strict'

const { TokenExpiredError } = require('jsonwebtoken');
var Admin = require('../models/admin');
var bcrypt = require('/bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const registro_admin = async function(req, res){
    var data = req.body;
    var admin_arr=[];

    admin_arr = await Admin.find({email:data.email});

    if(admin_arr.length == 0){

        if (data.password){
            bcrypt.hash(data.password, null, null, async function(err, hash){
                if(hash){
                    data.password = hash
                    var registro  =  await Admin.create(data);
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

    
};

const login_admin = async function(req, res){
    var data = req.body
    var admins_arr = [];

    admins_arr = await Admin.find({email:data.email});

    if(admins_arr.length == 0){
        res.status(200).send({message: 'No se encontro el correo', data:undefined});
    }else{
        let user = admins_arr[0];

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
    registro_admin,
    login_admin
}