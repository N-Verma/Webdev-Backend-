var express = require("express"),
    app  = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB =require("./seeds")


mongoose.connect('mongodb://localhost:27017/yelp_camp_v4', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
seedDB();


app.get("/", function(req,res){
   res.render("landing"); 
});

//INDEX
app.get("/campgrounds", function(req,res){
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index",{campgrounds: allCampgrounds});
        }
    });
    
});

//NEW CAMPGROUND
app.get("/campgrounds/new",function(req, res) {
   res.render("campgrounds/new"); 
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

//SHOW CAMPGROUND
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err)
        } else{
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
})

//nested comments new route
app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground:campground});
        }
    })
});

app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    console.log(err);
                } else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    })
});

app.listen(process.env.PORT,process.env.IP, function(){
   console.log("Yelpcamp started"); 
});