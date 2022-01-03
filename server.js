const express = require('express');
const app = express();
const db = require("./db.js");

app.use(express.static('./public'));

app.use(express.json());

app.get("/get-img-info", (req, res) => {
    db.getImages().then((allImg) =>{
        res.json(allImg.rows)
    }).catch((e)=>{console.log("error in db ",e)});
});

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});



app.listen(8080, () => console.log(`I'm listening.`));