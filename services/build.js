import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { BufferMemory } from "langchain/memory";
import * as fs from "fs";

export default async function run(req, res) {
    const text = fs.readFileSync("test_file1.txt", "utf8");
    // const text = JSON.stringify(req.body["content"]);
    // console.log(text);
    console.log("Finished text");
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
    console.log("Finished split");
    const docs = await textSplitter.createDocuments([text]);
    console.log("Finished docs");
    const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
    console.log("vector built");

    const fasterModel = new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        modelName: "gpt-3.5-turbo",
    });
    const slowerModel = new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        modelName: "gpt-4",
    });
    const chain = ConversationalRetrievalQAChain.fromLLM(slowerModel, vectorStore.asRetriever(), {
        returnSourceDocuments: true,
        memory: new BufferMemory({
            memoryKey: "chat_history",
            inputKey: "question", // The key for the input to the chain
            outputKey: "text", // The key for the final conversational output of the chain
            returnMessages: true, // If using with a chat model (e.g. gpt-3.5 or gpt-4)
        }),
        questionGeneratorChainOptions: {
            llm: fasterModel,
        },
    });

    req.app.locals.chain = chain;
    req.app.locals.chat_history = [];
    res.status(200).json("Model built successfully");
    // else res.status(400).json("Model is not built");
}
