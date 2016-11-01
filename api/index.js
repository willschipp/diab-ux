var router = require('express').Router();
var jwt = require('jsonwebtoken');

var JWT_SECRET = process.env.JWT_SECRET || 'thisisthejwtlongsecret';

router.use('/user',verify,require('./user'));
router.use('/git',verify,require('./git'));
router.use('/app',verify,require('./app'));
router.use('/settings',verify,require('./settings'));
router.use('/ide',verify,require('./ide'));
router.use('/template',verify,require('./template'));
router.use('/ci',verify,require('./ci'));

function verify(req,res,next) {
  jwt.verify(req.user,JWT_SECRET,function(err,decoded) {
    if (err) {
      return res.status(500).json({success:false,message:'Failed to authenticate token'});
    }//end if
    req.decoded = decoded;
    //check admin
    //return
    next();
  })
};



module.exports = router;
