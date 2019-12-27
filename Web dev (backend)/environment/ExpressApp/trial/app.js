var express  = require("express");
var app  = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs");
var items = ["apple","candy","cereals"];

app.get("/",function(req,res){
    res.render("home");
});

app.post("/additem",function(req,res){
    var newitem = (req.body.newItem);
    items.push(newitem);
    res.redirect("/items");
});
app.get("/items",function(req,res){
    
    res.render("items", {items: items}); 
});


app.listen(process.env.PORT,process.env.IP, function(){
    console.log("server started");
})