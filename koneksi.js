let mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_restapi'
});

conn.connect((err)=>{
    if(err) throw err;
    console.log('Mysql connected !');
});

module.exports = conn;