var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var passport = require('passport');
var session = require('express-session');

app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({extended:true}));

//security
require('./config/passport.js')(passport);

app.use(session({secret:'thisisaverylongsessionkey',resave: true,saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/node_modules',express.static(__dirname + '/node_modules'));
app.use('/js',express.static(__dirname + '/app/js'));
app.use('/css',express.static(__dirname + '/app/css'));
app.use('/partials',express.static(__dirname + '/app/partials'));

app.use('/api',require('./api'));

require('./routes')(app,passport);

app.listen(port,function() {
  console.log('UX started');
});
