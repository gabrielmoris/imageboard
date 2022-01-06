const express = require("express");
const app = express();
const db = require("./db.js");
const { uploader } = require("./upload.js");
const s3 = require("./s3");

app.use(express.static("./public"));
app.use(express.json());

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    if (req.file) {
        const url =
            "https://onionimageboard.s3.amazonaws.com/" + req.file.filename;
        db.addImage(
            url,
            req.body.username,
            req.body.title,
            req.body.description
        ).then(({ rows }) => {
            res.json({ success: true, img: rows[0] });
        });
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

app.get("/get-img-by-id/:id", (req, res) => {
    db.getImgbyId(req.params.id)
        .then((dataImg) => {
            res.json(dataImg.rows[0]);
        })
        .catch((err) => {
            console.log("error in db get-img-by-id", err);
        });
});

app.get("/get-more-img/:lowId", (req, res) => {
    db.getMoreImages(req.params.lowId)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((e) => {
            console.log("error getting more images: ", e);
        });
});

app.post("/uploadcomment", (req, res) => {
    if(req.body.user){
    db.addComment(req.body.imageId, req.body.user, req.body.comment)
        .then(({ rows }) => {
            res.json({ success: true, cmt: rows[0] });
        })
        .catch((e) => {
            console.log("Error uploading the comment! ", e);
        });
    }else{
            console.log("Error uploading the comment! ");
        }
});

app.get("/get-comment-info/:imgId", (req,res)=>{
    db.getComments(req.params.imgId)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((e) => {
            console.log("error getting all the comments: ", e);
        });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
