var express = require("express");
var router = express.Router();
var Campground = require("../models/campground.js");
var middleware = require("../middleware");

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
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
});
//create campgrounds
router.post("/campgrounds", middleware.isLoggedIn, function(req,res){
    var name = req.body.name;
    var image = req.body.img;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name:name, image:image, description:desc, author:author};
    Campground.create(newCampground,function(err,newlycreated){
        if(err){
            console.log(err);
        } else{
            console.log(newCampground);
            res.redirect("/campgrounds");
        }
    });
});

//SHOW CAMPGROUND
router.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        } else{
            //console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
});

//EDit route
router.get("/campgrounds/:id/edit", middleware.checkOwnership, function(req, res) {
        Campground.findById(req.params.id,function(err, foundCampground){
            res.render("campgrounds/edit",{campground: foundCampground});
        });
});


//update route
router.put("/campgrounds/:id",middleware.checkOwnership,  function(req,res){
   Campground.findByIdAndUpdate(req.params.id,req.body.campground, function(err, updateCamp){
       if(err){
           res.redirect("/campgrounds");
       } else{
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});


//delete route
router.delete("/campgrounds/:id", middleware.checkOwnership,  function(req,res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       } else{
           res.redirect("/campgrounds");
       }
   });
});

module.exports = router;