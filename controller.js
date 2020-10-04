'use strict';

let response = require('./rest');
let connecti = require('./koneksi');

exports.index = function(req, res){
    response.ok('Aplikasi REST working !', res)
};

exports.getmhs = function(req, res){
    connecti.query('SELECT * FROM data_mhs', function(error, rows, fields){
        if(error){
            connecti.log(error);
        }else{
            response.ok(rows, res);
        }
    });
};

exports.getmhsByNpm = function(req, res){
    let npm = req.params.id;
    connecti.query('SELECT * FROM data_mhs WHERE npm = ?', [npm], function(error, rows, fields){
        if(error){
            connecti.log(error);
        }else{
            response.ok(rows, res);
        }
    });
};