const spicedPg = require("spiced-pg");

const database = "imageboard"; //<---this is the database I already have in my PC
const username = "onionpetition";
const password = "onion";

//communication with the database
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${username}:${password}@localhost:5432/${database}`
);

console.log(`[db] connecting to: ${database}`);

module.exports.getImages = () => {
    const q = `SELECT * FROM images ORDER BY id DESC LIMIT 3`;
    return db.query(q);
};

module.exports.getMoreImages = (id) => {
    const q = `SELECT url, title, id, (SELECT id
    FROM images
    ORDER BY id ASC
    LIMIT 1) AS "lowestId" FROM images
    WHERE id < $1
    ORDER BY id DESC
    LIMIT 3;`;
    const params = [id];
    return db.query(q, params);
};

module.exports.addImage = (url, username, title, description) => {
    const q = `INSERT INTO images (url, username, title, description) Values($1, $2, $3, $4)
    RETURNING *`;
    const params = [url, username, title, description];
    return db.query(q, params);
};

module.exports.getImgbyId = (id) => {
    const q = `SELECT * FROM images WHERE id = $1`;
    const params = [id];
    return db.query(q, params);
};

module.exports.getComments = (imgId) => {
    const q = `SELECT * FROM comments WHERE image_id = $1 ORDER BY id DESC`;
    const params = [imgId]
    return db.query(q, params);
};

module.exports.addComment =(imgId, user, comment) =>{
     const q = `INSERT INTO comments (image_id, username, comment) Values($1, $2, $3)
    RETURNING *`;
     const params = [imgId, user, comment];
     return db.query(q, params);
}