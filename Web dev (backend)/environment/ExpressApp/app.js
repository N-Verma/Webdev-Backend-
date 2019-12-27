var express = require("express");
var app = express();

app.get("/", function(req,res){
   res.send("Hi there"); 
});

app.get("/dogs", function(req,res){
   res.send("Yo yo"); 
});

app.get("/r/:name", function(req,res){
   var sub = req.params.name;
   res.send("yo" + sub.toUpperCase() + "yo");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
});