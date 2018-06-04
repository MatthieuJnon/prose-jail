var express = require('express');
const mysql = require('mysql');
const config = require('../config/config.json');
var router = express.Router();

const authorizedHeads = ["mosca", "matthieu", "mehdi", "leroy", "pavlo", "greg", "legrand"]

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
        connection.query("SELECT * FROM bolosses", function (err, res) {
            if (err) throw err;
            resolve(res);
        })
    });
}

function updatePosition(AHead) {
    return new Promise(function (resolve) {
        connection.query("UPDATE bolosses SET position = ? WHERE name = ?", [AHead.position, AHead.name], function (err) {
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
    let head = {};
    try {
        head = {
            position: req.body[1],
            name: req.body[0]
        };
    } catch (e) {
        res.status(412);
        res.send('error');
    }
    if (isHeadValid(head)) {
        updatePosition(head).then(() => res.send('all good'));
    } else {
        res.status(412);
        res.send('error');
    }
});

//Checks if a received formatted head is valid.
function isHeadValid(head) {
    let isValid = true;
    try {

        let x = parseInt(head.position.substring(0, 3));
        let y = parseInt(head.position.substring(3, 6));

        if (x > 870 || y > 620) {
            isValid = false;
        }

        if (head.position.length !== 6) {
            isValid = false;
        }

        if (!authorizedHeads.includes(head.name)) {
            isValid = false;
        }
    } catch (e) {
        isValid = false;
    }
    return isValid;
}

module.exports = router;
