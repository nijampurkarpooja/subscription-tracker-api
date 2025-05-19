import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";

import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import useRouter from "./routes/user.routes.js";

import { PORT } from "./config/env.config.js";
import connectToDB from "./database/mongodb.js";

import errorMiddleware from "./middlewares/error.middleware.js";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/users", useRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => res.send("Welcome to the Subscription Tracker API"));

app.listen(PORT, async () => {
  console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);

  await connectToDB();
});

export default app;
