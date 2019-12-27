var express = require("express"),
    app  = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    localStrategy  = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB =require("./seeds")


mongoose.connect('mongodb://localhost:27017/yelp_camp_v6', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

//passport config
app.use(require("express-session")({
    secret:"qwerty",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentuser=req.user; 
   next();
});


//landing route
app.get("/", function(req,res){
   res.render("landing"); 
});

//INDEX
app.get("/campgrounds", function(req,res){
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index",{campgrounds: allCampgrounds, currentuser: req.user});
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
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground:campground});
        }
    })
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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

//auth route
app.get("/register", function(req, res) {
   res.render("register");
});

app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
   User.register(newUser,req.body.password,function(err,user){
      if(err){
          console.log(err);
          return res.render("register");
      } 
      passport.authenticate("local")(req,res,function(){
          res.redirect("/campgrounds");
      });
   });
});

//login route
app.get("/login",function(req, res) {
    res.render("login");
});


app.post("/login",passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }
    ) ,function(req, res) {
});

app.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});


//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT,process.env.IP, function(){
   console.log("Yelpcamp started"); 
});