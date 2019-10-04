const express = require("express");
const app = express();

const mongo = require("mongodb").MongoClient;
const conString = process.env.matlistaString;
const objectId = require("mongodb").ObjectID;

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

app.get("/", async(req, res) => {

    try{
    const data = await col.find().toArray();
    const output = data.map(item=>{

        return `
        <h1>${item.vara} </h1>
        <p>Kommentar: ${item.kommentar} </p>
        <p>Tid: ${item.timestamp}
        <br> 
        <a href="/radera/${item._id}">Radera</a>
        <a href="/redigera/${item._id}">Redigera</a>
        <hr>
        `
    })
    const main = output.join("");
    res.send(htmlOutput("Hem", main));
    }

    catch{
        res.send("Error")

    }

});
app.get("/skapa", async(req, res) => {
    try{
        let main = `<form action="/skapa" method="post">
        <input type="text" name="vara" placeholder="Vara">  
        <br>
        <input type="text" name="kommentar" placeholder="Kommentar">  
        <br>
        <input type="submit" value="save">  
        
    
        </form>`;
        res.send(htmlOutput("Lägg till vara", main));

    }
    
    catch{
        res.send("Error");
    }

});
app.post("/skapa", async(req, res) => {
    try{ 
        const nyVara = {...req.body, status: "attKöpa", timestamp: new Date().toLocaleString("se-SE",{timezone:"Europe/Stockholm"} )
    };
        await col.insertOne(nyVara);
        res.redirect("/");

    }

    catch{
        res.send("Ingen vara lades till");
    }

});
app.get("/redigera/:id", async(req, res) => {
    try{

        const data = await col.findOne({
            "_id": objectId(req.params.id)
        }) 
        let main = `<form action="/redigera" method="post">
        <input type="text" name="vara" value="${data.vara}" placeholder="Vara">  
        <br>
        <input type="text" name="kommentar" value="${data.kommentar}" placeholder="Kommentar"> 
        <input type="hidden" name="id" value="${data._id}"> 
        <br>
        <input type="submit" value="Update">  
        
    
        </form>`;
        res.send(htmlOutput("Redigera", main))

    }
    catch{
            res.send("Error");
    }

});
app.post("/redigera", async(req, res) => {
    try {
        const newData = {
            vara: req.body.vara,
            kommentar: req.body.kommentar,
            timestamp: new Date().toLocaleString("se-SE",{timezone:"Europe/Stockholm"} )
        };
        await col.updateOne({
            "_id": objectId(req.body.id)
        }, {
            $set: newData
        });
        res.redirect("/")
    } catch {
        res.send("error")
    }

});

app.get("/om", async(req, res) => {

    res.send("Om");

});

app.get("/inkoptavaror", async(req, res) => {

    res.send("Inköpta varor");

});

app.get("/visa/:id", async(req, res) => {

    res.send("visa");

});

app.get("/radera/:id", async(req, res)=>{
    try{
        await col.deleteOne({"_id": objectId(req.params.id)});
        res.redirect("/");

    }
    catch(error){
        res.send("error");
        console.log(error);

    }

})


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
app.listen(port, () => console.log("http is running on port 3000"));