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
    const q = `SELECT * FROM images`;
    return db.query(q);
};
