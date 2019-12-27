var express = require("express");
var app  = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/yourDatabase', { useNewUrlParser: true });


//schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema); 

//Campground.create(
//    {
//        name: "LongCamp", 
//        image:"https://s-ec.bstatic.com/images/hotel/max1024x768/121/121021906.jpg",
//        description:"This is a very long camp, stretching miles across the ocean. It has zero contact with the outside world"
//    },
//    function(err,campground){
//        if(err){
//            console.log(err);
//        } else{
//            console.log(campground);
//        }
//    }
//
//);

    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.get("/", function(req,res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req,res){
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("index",{campgrounds: allCampgrounds});
        }
    });
    
});

app.get("/campgrounds/new",function(req, res) {
   res.render("new"); 
});

app.post("/campgrounds",function(req,res){
    var name = req.body.name;
    var image = req.body.img;
    var desc = req.body.description;
    var newCampground = {name:name, image:image, description:desc};
    Campground.create(newCampground,function(err,newlycreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");
        }
    })
});

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            console.log(err)
        } else{
            res.render("show", {campground: foundCampground});
        }
    });
    
})

app.listen(process.env.PORT,process.env.IP, function(){
   console.log("Yelpcamp started"); 
});