const express = require("express");
const app = express();

require("./core/dbcon");


// import routes
const authRoute = require("./routes/auth");
const profile = require("./routes/profile");
const relation = require("./routes/relation");




//Use Json parser
app.use(express.json());

//routes
app.use('/Auth/Login',authRoute);
app.use('/Profile',profile);
app.use("/Relation",relation);
//Start listening port 3000
app.listen(3000, ()=>{
    console.log("Server is up!!");
});

