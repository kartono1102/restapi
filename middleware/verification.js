const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verify(){
    return function(req, res, next){
        var role = req.body.role;
        let tokenWithBearer = req.headers.authorization;
        if(tokenWithBearer){
            let token = tokenWithBearer.split(' ')[1];
            jwt.verify(token, config.secret, function(error, decoded){
                if(error){
                    return res.status(401).send({auth:false, message: 'Token tidak terdaftar'});
                }else{
                    if(role == 2){
                        req.auth = decoded;
                        next();
                    }else{
                        return res.status(401).send({auth: false, message: 'Gagal Otorisasi role'});
                    }
                }
            })
        }else{
            return res.status(401).send({auth: false, message: 'Token tidak tersedia'});
        }
    }
}

module.exports = verify;