import express, { json, urlencoded } from "express";
import cors from "cors";
import handleOpenAI from "./generate.js";
import { Configuration, OpenAIApi } from "openai";

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.post("/generate", (req, res) => {
    handleOpenAI(req, res, configuration, openai);
});

app.listen(5000, () => {
    console.log("app is running on port 5000");
});