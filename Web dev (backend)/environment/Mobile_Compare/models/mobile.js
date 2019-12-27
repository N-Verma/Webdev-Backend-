var mongoose = require("mongoose");

var mobileSchema = new mongoose.Schema({
   name:String,
   image:String,
   description:{
       display:String,
       storage:String,
       RAM:String,
       battery_life:String,
       price:String
   }
});

module.exports = mongoose.model("Mobile", mobileSchema); 