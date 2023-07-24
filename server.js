import express, { json, urlencoded } from "express";
import cors from "cors";
// import handleOpenAI from "./generate.js";
// import { Configuration, OpenAIApi } from "openai";
import run from "./services/built.js";
import ask from "./services/ask.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
var corsOptions = {
    origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use(json());
app.use(urlencoded({ extended: false }));
// app.use(cors());

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// app.post("/generate", (req, res) => {
//     handleOpenAI(req, res, configuration, openai);
// });

app.post("/built", (req, res) => {
    run(req, res);
});

app.post("/ask", (req, res) => {
    ask(req, res);
});

app.listen(8080, () => {
    console.log("app is running on port 8080");
});
