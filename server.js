const express = require("express");
const app = express();
const db = require("./db.js");
const { uploader } = require("./upload.js");
const s3= require("./s3")

app.use(express.static("./public"));
app.use(express.json());

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("req.body", req.body, "req.file", req.file);
    if(req.file){
        res.json({success: true})
    }else{
        res.json({success: false})
    }
});

app.get("/get-img-info", (req, res) => {
    db.getImages()
        .then((allImg) => {
            res.json(allImg.rows);
        })
        .catch((err) => {
            console.log("error in db ", err);
        });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
