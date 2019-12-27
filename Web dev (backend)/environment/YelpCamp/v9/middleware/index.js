var Campground = require("../models/campground.js");
var Comment = require("../models/comment.js");

var middlewareObj = {};

middlewareObj.checkOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err, foundCampground){
           if(err){
               res.redirect("back");
           } else{
               if(foundCampground.author.id.equals(req.user._id)){
                    next();
               } else{
                   req.flash("error","Permission denied");
                   res.redirect("back"); 
               }
           }
        });
    } else{
        req.flash("error","Please login first");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comments_id,function(err, foundComment){
           if(err){
               res.redirect("back");
           } else{
               if(foundComment.author.id.equals(req.user._id)){
                    next();
               } else{
                   req.flash("error","Permission Denied");
                   res.redirect("back"); 
               }
           }
        });
    } else{
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login first");
    res.redirect("/login");
};

module.exports = middlewareObj;