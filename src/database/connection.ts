import mongoose from "mongoose";

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const db_name = process.env.DB_NAME;

mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${db_name}`)
    .then(() => console.log("Connected to DB!"))
    .catch((err) => console.log("Error on connected to DB: " + err.message));
