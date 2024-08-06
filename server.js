import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import app from "./app.js";

import mongoose from "mongoose";
const DB = process.env.DATABASE_STRING.replace("<PASSWORD>", process.env.DATABASE_PASSOWRD);

mongoose
    .connect(DB)
    .then(() => console.log("DB Connected Successfullt"))
    .catch((err) => console.log(`Error While Connected Successfully -> ${err.message}`));

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
    console.log("Server started on http://localhost:3000");
});
