var express = require('express');
var app = express();

app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({extended:true}));

app.use('/node_modules',express.static(__dirname + '/node_modules'));
app.use('/js',express.static(__dirname + '/app/js'));
app.use('/css',express.static(__dirname + '/app/css'));
app.use('/partials',express.static(__dirname + '/app/partials'));

app.use('/api',require('./api'));

app.get('/',function(req,res) {
  res.sendFile(__dirname + '/app/index.html');
});

app.listen(3000,function() {
  console.log('UX started');
});
