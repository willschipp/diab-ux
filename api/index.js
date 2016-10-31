var router = require('express').Router();
var jwt = require('jsonwebtoken');

var jwtsecret = 'thisisthejwtlongsecret';

router.use('/user',verify,require('./user'));
router.use('/git',verify,require('./git'));
router.use('/app',verify,require('./app'));
router.use('/settings',verify,require('./settings'));
router.use('/ide',verify,require('./ide'));

function verify(req,res,next) {
  jwt.verify(req.user,jwtsecret,function(err,decoded) {
    if (err) {
      return res.status(500).json({success:false,message:'Failed to authenticate token'});
    }//end if
    req.decoded = decoded;
    //check admin
    // req.admin = req.decoded.user._json.is_admin;
    //return
    next();
  })
};



module.exports = router;
