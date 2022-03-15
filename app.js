import express from "express";
import path from "path";
import __dirname from "./dirname.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";
import usersRouter from "./routes/users.js";
import donationRouter from "./routes/donation.js";
import shoppinglistRouter from "./routes/shoppinglists.js";
import pantryListRouter from "./routes/pantryList.js";
import produceRouter from "./routes/produceData.js";
import mealPlanRouter from "./routes/mealplan.js";
import apiRouter from "./routes/edamam.js"
import donationbank from "./routes/donationbank.js";

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/donations", donationRouter);
app.use("/shoppinglists", shoppinglistRouter);
app.use("/pantryList", pantryListRouter);
app.use("/produce", produceRouter);
app.use("/mealplan", mealPlanRouter);
app.use("/api", apiRouter);
app.use("/donationbank", donationbank);



app.use(function (req, res, next) {
  res
    .status(404)
    .json({ message: "We couldn't find what you were looking for 😞" });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json(err);
});

export default app;
