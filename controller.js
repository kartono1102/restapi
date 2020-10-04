'use strict';

let response = require('./rest');
let connecti = require('./koneksi');

exports.index = function(req, res){
    response.ok('Aplikasi REST oke !', res)
};