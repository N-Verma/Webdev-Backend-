var express = require("express");
var app  = express();
app.set("view engine","ejs");
var bodyParser = require("body-parser");

var campgrounds = [
        {name: "Camp Hillground", image:"https://i.imgur.com/IaEHwyB.jpg"},
        {name: "Mount Hotenow", image:"https://oyster.ignimgs.com/mediawiki/apis.ign.com/neverwinter/3/35/Hillbornfallbackcamp.jpg?width=640"},
        {name: "LongCamp", image:"https://s-ec.bstatic.com/images/hotel/max1024x768/121/121021906.jpg"}
];
    
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req,res){
    
    res.render("campgrounds",{campgrounds: campgrounds});
});

app.get("/campgrounds/new",function(req, res) {
   res.render("new"); 
});

app.post("/campgrounds",function(req,res){
    var name = req.body.name;
    var image = req.body.img;
    var newCampground = {name:name, image:image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.listen(process.env.PORT,process.env.IP, function(){
   console.log("Yelpcamp started"); 
});