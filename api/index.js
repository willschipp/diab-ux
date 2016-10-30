var router = require('express').Router();
var jwt = require('jsonwebtoken');

var jwtsecret = 'thisisthejwtlongsecret';

router.use('/user',verify,require('./user'));
router.use('/git',require('./git'));
router.use('/app',require('./app'));

function verify(req,res,next) {
  jwt.verify(req.user,jwtsecret,function(err,decoded) {
    if (err) {
      return res.status(500).json({success:false,message:'Failed to authenticate token'});
    }//end if
    req.decoded = decoded;
    next();
  })
};

module.exports = router;
