var express = require("express");
var app = express();
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var expressSanitizer = require("express-sanitizer")
var mongoose = require("mongoose");

//app config
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true });
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
mongoose.set('useFindAndModify', false);
//schema setup
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type:Date,default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema); //Moongoose config
//Blog.create({
//   title:"Broken ship",
//   image:"https://cdn.stocksnap.io/img-thumbs/960w/B2MQOD11GA.jpg",
//   body:"A broken ship found on the coast of lilliput"
//});

//Rest ful routes
app.get("/",function(req, res) {
    res.redirect("/blogs");
})
//index route

app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log(err);
        } else{
            res.render("index",{blogs:blogs}); 
        }
    });
   
});
//new route
app.get("/blogs/new",function(req, res) {
    res.render("new");
});

//create route
app.post("/blogs",function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else{
            res.redirect("/blogs");
        }
    });
});

//show route
app.get("/blogs/:id",function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           console.log(err);
       } else{
           res.render("show",{blog: foundBlog});
       }
    });   
});

//edit route
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else{
           res.render("edit", {blog: foundBlog});
       }
    });
});

//update route

app.put("/blogs/:id", function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
       if(err){
           res.redirect("/blogs");
       } else{
           res.redirect("/blogs/" + req.params.id);
       }
   });
});

//delete route
app.delete("/blogs/:id",function(req,res){
   Blog.findByIdAndRemove(req.params.id, function(err,){
       if(err){
           res.redirect("/blogs");
           console.log(err);
       } else{
           res.redirect("/blogs")
       }
   });
});

app.listen(process.env.PORT,process.env.IP, function(){
   console.log("Blog is online"); 
});