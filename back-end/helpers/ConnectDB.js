const mongoose = require("mongoose");
require("dotenv").config();

module.exports=()=>{
    mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{
        if (err){
            console.log("Connection Failed");
        } else {
            console.log("Database Connected...");
        }
    });
};