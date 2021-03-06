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

var campgroundsRoute = require("./routes/campgrounds.js"),
    commentsRoute  = require("./routes/comments.js"),
    authRoute = require("./routes/auth.js")

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


app.use(campgroundsRoute);
app.use(commentsRoute);
app.use(authRoute);

app.listen(process.env.PORT,process.env.IP, function(){
   console.log("Yelpcamp started"); 
});