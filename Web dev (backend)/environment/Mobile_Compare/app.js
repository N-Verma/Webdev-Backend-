var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Mobile = require("./models/mobile")

mongoose.connect('mongodb://localhost:27017/mobilDB1', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
//add a temporary mobile object


//root route
app.get("/",function(req, res) {
    app.redirect("/mobiles");
})

//showcase route
app.get("/mobiles", function(req,res){
   res.render("index"); 
});

//post route for mobile
app.post("/mobiles", function(req,res){
   var name = req.body.name;
    var image = req.body.img;
    var storage = req.body.desc.storage;
    var display = req.body.desc.display;
    var battery = req.body.desc.battery;
    var RAM = req.body.RAM;
    var price = req.body.price;
    var newMobile = {name: name, image:image, description:{display:display, storage:storage,RAM:RAM,battery_life:battery,price:price}};
    Mobile.Create(newMobile,function(err, craeted){
        if(err){
            console.log(err);
        } else{
            res.redirect("/mobiles");
        }
    });
});


//create new mobile
app.get("/mobiles/new", function(req, res) {
    res.render("new_mobile");
});



app.listen(process.env.PORT,process.env.IP, function(){
   console.log("Mobile Showcase running....."); 
});