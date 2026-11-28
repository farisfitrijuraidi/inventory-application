import express from "express";
import path from "node:path";
import indexRouter from "./routes/indexRouter.js";
import genreRouter from "./routes/genreRouter.js";
import developerRouter from "./routes/developerRouter.js";
import gameRouter from "./routes/gameRouter.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/genres", genreRouter);
app.use("/developers", developerRouter);
app.use("/games", gameRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Inventory Application is running on port ${PORT}`);
});
