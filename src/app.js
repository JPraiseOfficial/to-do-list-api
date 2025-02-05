import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectmongodb } from "./config/mongodb.js";
import { router } from "./routes.js";

const app = express();

app.use(cors({
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startApp() {
  await connectmongodb();

  app.use('/api', router);

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

startApp();