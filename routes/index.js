var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'La prison de TAGMP2 ??' });
});


router.post('/', function (req, res, next) {
  console.log("received post request");
  // TODO: faire cette fonction.
});

module.exports = router;
