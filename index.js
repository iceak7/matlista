const express = require("express");
const app = express();

const mongo = require("mongodb").MongoClient;
const conString = process.env.matlistaString;

app.use(express.static(__dirname+"/public"))

async function getDb() {


    try {
        const con = await mongo.connect(conString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const db = await con.db("Matlista");
        return db;
    } catch (error) {
        process.exit();

    }
};


(async function () {
    db = await getDb();
    col = await db.collection("varor");

})();




app.use(express.urlencoded({
    extended: false
}));

app.get("/", (req, res) => {

    res.send("Start");


});
app.get("/skapa", (req, res) => {
    res.send("Skapa");

});
app.post("/skapa", (req, res) => {


});
app.get("/redigera/:id", (req, res) => {
    res.send("Redigera");

});
app.post("/redigera", (req, res) => {

});

app.get("/om", (req, res) => {

    res.send("Om");

});
app.get("/atthandla", (req, res) => {

    res.send("Varor att handla");

});
app.get("/plockadevaror", (req, res) => {

    res.send("Plockade varor");

});
app.get("/inkoptavaror", (req, res) => {

    res.send("Att handla");

});

app.get("/visa/:id", (req, res) => {

    res.send("visa");

});


function htmlOutput(title, body){

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${title} </title>
        <link rel="stylesheet" type="text/css" href="/style.css">
       
        
        
    </head>

    <body>
    ${body}    
    </body>
    </html>
    `



};

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("http is running"));