var express = require("express");
var app = express();

app.get("/", function(req,res){
    res.send("root page");
});

app.get("/:animal",function(req,res){
    if(req.params.animal === "dog"){
        res.send("wooof woof");
    }
    else if(req.params.animal === "cat"){
        res.send("meow meow");
    }
    else if(req.params.animal === "pig"){
        res.send("oink oink");
    }
});

app.get("/:item/:no", function(req,res){
    var i;
    var t = Number(req.params.no);
    var msg = req.params.item;
    var result = "";
   for(i=0;i<t;i++){
       result+=msg;
   } 
   res.send(result);
});

app.get("*", function(req,res){
    res.send("ERROR 404");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
});