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
    return new promise(function (resolve) {
        connection.query("UPDATE bolosses SET position = ? WHERE name = ?", [AHead.position, AHead.name], function(err){
            if (err) throw err;
            resolve();
        })
    });
}

function postHeads(headsPositions) {
    return Promise.all(headsPositions.map(updatePosition));
}

router.get('/heads', function (req, res, next) {
    getHeads().then((heads) => res.send(heads));
})

router.post('/heads', function (req, res, next) {
    postHeads(req.body).then(() => res.send("All good"));
});

module.exports = router;
