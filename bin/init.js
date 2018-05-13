const mysql = require('mysql');
const config = require('../config/config.json');

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password
});

connection.query('CREATE DATABASE IF NOT EXISTS prose_jail', function(err) {
    if (err) throw err;
    connection.query('USE prose_jail', function (err) {
        if (err) throw err;
        conn
    })
});

function useTable()