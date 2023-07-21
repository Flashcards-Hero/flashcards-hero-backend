import formidable from "formidable"; // to handle file uploads

import extractTextFromFile from "../services/extractTextFromFile.js";
import { createEmbeddings } from "../services/createEmbeddings.js";

// Disable the default body parser to handle file uploads
export const config = { api: { bodyParser: false } };

// This function receives a file as a multipart form and returns the text extracted fom the file and the OpenAI embedding for that text
export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }
    console.log(req);
    // Create a formidable instance to parse the request as a multipart form
    const form = formidable({ multiples: true });
    form.maxFileSize = 30 * 1024 * 1024; // Set the max file size to 30MB

    try {
        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ fields, files });
                }
            });
        });
        const file = files.file;
        if (!file || Array.isArray(file) || file.size === 0) {
            res.status(400).json({ error: "Invalid or missing file" });
            return;
        }

        const text = await extractTextFromFile({
            filepath: file.filepath,
            filetype: file.mimetype ?? "",
        });

        const { meanEmbedding, chunks } = await createEmbeddings({
            text,
        });

        res.status(200).json({ text, meanEmbedding, chunks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        // Always send a response, even if it is empty
        res.end();
    }
}
