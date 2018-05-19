const mysql = require('mysql');
const config = require('../config/config.json');

const configMysql = config.mysql;

const connection = mysql.createConnection({
    host: configMysql.host,
    user: configMysql.user,
    password: configMysql.password
});

connection.query('CREATE DATABASE IF NOT EXISTS '+ configMysql.database, function(err) {
    if (err) throw err;
    connection.query('USE ' + configMysql.database, function (err) {
        if (err) throw err;
        connection.query('CREATE TABLE IF NOT EXISTS bolosses('
        + 'id INT NOT NULL AUTO_INCREMENT,'
        + 'PRIMARY KEY(id)'
        + 'name VARCHAR(30)'
        + 'position VARCHAR(10)'
        + ')', function (err) {
            if (err) throw err;
        });
    });
});

const lesGens = [
    {name : "mosca", position: "000000"},
    {name : "leroy", position: "000000"},
    {name : "matthieu", position: "000000"},
    {name : "greg", position: "000000"},
    {name : "pavlo", position: "000000"},
    {name : "legrand", position: "000000"},
    {name : "mehdi", position: "000000"},
];  

lesGens.forEach(function(unMec) {
    connection.query('INSERT INTO bolosses SET ?', unMec, function(err){
        if (err) throw err;
    });
});
