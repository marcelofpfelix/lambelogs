var express = require("express");

var app = express();
var router = express.Router();
var path = require('path')


// serve files from the directory
process.env.PWD = process.cwd();
app.use(express.static(path.join(process.env.PWD, 'public')));

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

// serve the homepage
router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

app.use("/",router);



//app.get('/myform', function(req, res){
//    var str = req.query.str; //mytext is the name of your input box
//    res.send('Your Text:' +str);
//    console.log('Your Text:' +str);
//});

//app.use("*",function(req,res){
//  res.sendFile(path + "404.html");
//});

// start the express web server listening
app.listen(process.env.PORT || 3000,function(){
  console.log("Live at Port 3000");
});
