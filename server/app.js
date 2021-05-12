import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./libs/routes.js";

dotenv.config();
const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//routes
app.use(routes);

app.listen(PORT, () => console.log(`listening to ${HOSTNAME}:${PORT}`)); //using express
