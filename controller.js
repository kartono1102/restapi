'use strict';

let response = require('./rest');
let connecti = require('./koneksi');

exports.index = function(req, res){
    response.ok('Aplikasi REST working !', res)
};

exports.getmhs = function(req, res){
    connecti.query('SELECT * FROM tbl_mhs', 
        function(error, rows, fields){
            if(error){
                connecti.log(error);
            }else{
                response.ok(rows, res);
            }
        }
    );
};

exports.getmhsByNpm = function(req, res){
    let npm = req.params.id;
    connecti.query('SELECT * FROM tbl_mhs WHERE npm = ?', [npm], 
        function(error, rows, fields){
            if(error){
                connecti.log(error);
            }else{
                response.ok(rows, res);
            }
        }
    );
};

exports.addMhs = function(req, res){
    let npm = req.body.npm;
    let nama = req.body.nama;
    let jk = req.body.jk;
    let nohp = req.body.nohp;

    connecti.query('INSERT INTO tbl_mhs VALUES(?,?,?,?)', [npm, nama, jk, nohp],
        function(error, rows, fields){
            if(error){
                connecti.log(error);
            }else{
                response.ok('Add data mhs success !', res);
            }
        }
    );
}