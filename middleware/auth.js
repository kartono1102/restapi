let connection = require('../koneksi');
let mysql = require('mysql');
let md5 = require('md5');
let response = require('../rest');
let jwt = require('jsonwebtoken');
let config = require('../config/secret');
let ip = require('ip');

exports.registrasi = function(req, res) {
    let post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }

    var query = "SELECT * FROM ?? WHERE ??=? OR ??=?";
    var table = ["tbl_user", "email", post.email, "username", post.username];

    query = mysql.format(query, table);
    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length === 0){
                let query = "INSERT INTO ?? SET ?";
                var table = ["tbl_user"];
                query = mysql.format(query, table);
                connection.query(query, post, function(error, rows){
                    if(error){
                        console.log(error);
                    }else{
                        response.ok("Berhasil tambah user baru", res);
                    }
                });
            }else{
                response.ok("Username/Email sudah terdaftar", res);
            }
        }
    });
}

exports.login = function(req, res){
    let post = {
        email: req.body.email,
        username: req.body.username,
        password: md5(req.body.password)
    }

    let query = "SELECT * FROM ?? WHERE (??=? OR ??=?) AND ??=?";
    let table = ["tbl_user", "email", post.email, "username", post.username, "password", post.password];

    query = mysql.format(query, table);
    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length === 1){
                let token = jwt.sign({rows}, config.secret, {
                    expiresIn: 3600
                });
                
                id_user = rows[0].id;

                let data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }

                let query = "INSERT INTO ?? SET ?";
                let table = ["akses_token"];

                query = mysql.format(query, table);
                connection.query(query, data, function(error, rows){
                    if(error){
                        console.log(error);
                    }else{
                        res.json({
                            'success': true,
                            'message': 'Token berhasil digenerate',
                            'token': token,
                            'currUser': data.id_user
                        });
                    }
                });

                query = "UPDATE ?? SET ??=? WHERE ??=?";
                table = ["tbl_user", "last_login", new Date(), "id", data.id_user];

                query = mysql.format(query, table);
                connection.query(query, function(error, rows){
                    if(error){
                        console.log(error);
                    }
                });
            }else{
                res.json({
                    'error': true,
                    'message': 'Email/Password salah'
                });
            }
        }
    })
}