var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    localStrategy = require("passport-local"),
    passportlocalMongoose = require("passport-local-mongoose")
    
var app = express();
mongoose.connect('mongodb://localhost:27017/authdemo', { useNewUrlParser: true });

app.use(require("express-session")({
    secret:"qwerty",
    resave:false,
    saveUninitialized:false
}))

app.set("view engine","ejs");
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//root page
app.get("/", function(req, res){
    res.render("home");
});
//secret route
app.get("/secret",isLoggedIn, function(req,res){
   res.render("secret.ejs"); 
});

//register route
app.get("/register",function(req, res) {
    return res.render("register");
});

app.post("/register",function(req,res){
    User.register(new User({username: req.body.username}),req.body.password, function(err,user){
       if(err){
           res.render("/register");
       }
       passport.authenticate("local")(req,res,function(){
           res.redirect("/secret");
       });
    });
});

//login route
app.get("/login", function(req,res){
   res.render("login"); 
});

app.post("/login", passport.authenticate("local",{
        successRedirect: "/secret",
        failureRedirect: "login"
    }) ,function(req,res){
    
});


//logout route
app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Auth online..."); 
});
