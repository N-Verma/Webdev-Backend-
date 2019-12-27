var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment")

var data = [
    {
        name: "LongCamp", 
        image:"https://s-ec.bstatic.com/images/hotel/max1024x768/121/121021906.jpg",
        description:"This is a very long camp, stretching miles across the ocean. It has zero contact with the outside world"
    },
    {
        name: "River Side camp", 
        image:"https://i.imgur.com/tXtwrPd.jpg",
        description:"srf ere erwetg rfer qrfqwrcvsd trtg ewfef ferf  tgfewtfgw wtw wrertfwetf"
    },
    {
        name: "Sun Camp", 
        image:"https://i.imgur.com/QguApMA.jpg",
        description:"sggdsgrdrsdgy estfge ngfetweqaaa bdryhyrty wtserqR AFGVESTWWE WGBSEWTGEWARAFAA edtgertg hj"
    }
]

function seedDB(){   
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        data.forEach(function(seed){
        Campground.create(seed,function(err, campground){
            if(err){
                console.log(err);
            } else{
                console.log("Campground added");
            }
            Comment.create(
                {
                    text: "Great place to visit",
                    author: "Homer"
            },function(err,comment){
                if(err){
                    console.log(err);
                } else{
                    campground.comments.push(comment);
                    campground.save();
                    console.log("created new comment");
                }
            });
            });
        });
    });
    
    
}

module.exports = seedDB;