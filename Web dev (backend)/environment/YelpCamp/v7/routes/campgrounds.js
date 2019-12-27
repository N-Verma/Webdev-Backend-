var express = require("express");
var router = express.Router();
var Campground = require("../models/campground.js");
//INDEX
router.get("/campgrounds", function(req,res){
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index",{campgrounds: allCampgrounds, currentuser: req.user});
        }
    });
    
});

//NEW CAMPGROUND
router.get("/campgrounds/new",function(req, res) {
   res.render("campgrounds/new"); 
});

router.post("/campgrounds",function(req,res){
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
router.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err)
        } else{
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
})


module.exports = router;