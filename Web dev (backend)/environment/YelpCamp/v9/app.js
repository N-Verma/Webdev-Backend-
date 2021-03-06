var express = require("express"),
    app  = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    localStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB =require("./seeds")

var campgroundRoute = require("./routes/campgrounds.js"),
    commentsRoute = require("./routes/comments.js"),
    authRoute = require("./routes/auth.js")

mongoose.connect('mongodb://localhost:27017/yelp_camp_v8', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB();

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
   res.locals.currentUser=req.user; 
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");
   next();
});

app.use(campgroundRoute);
app.use(commentsRoute);
app.use(authRoute);


app.listen(process.env.PORT,process.env.IP, function(){
   console.log("Yelpcamp started"); 
});