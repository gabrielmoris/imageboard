const express = require("express");
const app = express();
const db = require("./db.js");
const { uploader } = require("./upload.js");
const s3 = require("./s3");

app.use(express.static("./public"));
app.use(express.json());

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    // console.log("req.body", req.body.title, "req.file", req.file);
    if (req.file) {
        const url =
            "https://onionimageboard.s3.amazonaws.com/" + req.file.filename;
        // console.log("this is the url, dude: ", url)
        // console.log("This is the title, man: ",req.body.title)
        db.addImage(
            url,
            req.body.username,
            req.body.title,
            req.body.description
        ).then(({rows})=>{
            // console.log(rows)
            res.json({ success: true, img: rows[0] });
        })
        
    } else {
        res.json({ success: false });
    }
});

app.get("/get-img-info", (req, res) => {
    db.getImages()
        .then((allImg) => {
            res.json(allImg.rows);
        })
        .catch((err) => {
            console.log("error in db get-img-info", err);
        });
});

app.get("/get-img-by-id/:id", (req, res)=>{
    db.getImgbyId(req.params.id).then((dataImg)=>{
        // console.log(dataImg.rows[0]);
        res.json(dataImg.rows[0])
    }).catch((err) => {
            console.log("error in db get-img-by-id", err);
        });
})

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
