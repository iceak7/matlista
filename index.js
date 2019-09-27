const express = require("express");
const app = express();

app.get("/", (req, res)=>{

res.send("Home");


});

app.get("/om", (req,res)=>{

    res.send("Om");

});




const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log("http is running"));