const express = require("express");
const app = express();

app.use(express.urlencoded({extended:false}));

app.get("/", (req, res)=>{

    res.send("Start");


});
app.get("/skapa", (req,res)=>{
    res.send("Skapa");

});
app.post("/skapa", (req,res)=>{
    

});
app.get("/redigera/:id", (req,res)=>{
    res.send("Redigera");

});
app.post("/redigera", (req,res)=>{

});

app.get("/om", (req,res)=>{

    res.send("Om");

});
app.get("/atthandla", (req,res)=>{

    res.send("Varor att handla");

});
app.get("/plockadevaror", (req,res)=>{

    res.send("Plockade varor");

});
app.get("/inkoptavaror", (req,res)=>{

    res.send("Att handla");

});

app.get("/visa/:id", (req,res)=>{

    res.send("visa");

});




const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log("http is running"));