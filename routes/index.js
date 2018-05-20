var express = require('express');
const mysql = require('mysql');
const config = require('../config/config.json');
var router = express.Router();

const configMysql = config.mysql;
const connection = mysql.createConnection({
    host: configMysql.host,
    user: configMysql.user,
    password: configMysql.password,
    database: configMysql.database
});


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'La prison de TAGMP2 !!' });
});


function getHeads() {
    return new Promise(function (resolve) {
        connection.query("SELECT * FROM bolosses", function(err, res){
            if (err) throw err;
            resolve(res);
        })
    });
}

function updatePosition(AHead) {
    return new Promise(function (resolve) {
        connection.query("UPDATE bolosses SET position = ? WHERE name = ?", [AHead.position, AHead.name], function(err){
            if (err) {
                console.log(err);
                throw err;
            };
            resolve();
        })
    });
}

router.get('/heads', function (req, res, next) {
    getHeads().then((heads) => res.send(heads));
})

router.post('/head', function (req, res, next) {
    let head = {
        position : req.body[1],
        name : req.body[0]
    };
    updatePosition(head).then(() => res.send("all good"));
});

module.exports = router;
