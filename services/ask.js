import { PROMPT_FOR_Qs, PROMPT_FOR_TERM } from "../prompt/template.js";

export default async function ask(req, res) {
    /* Template formation */
    const type = req.body.type;
    const question = type == "qa" ? "Generate a list of questions extracted from the given context. " + PROMPT_FOR_Qs : "Generate a list of important terms based on the given context. " + PROMPT_FOR_TERM + "";

    const answer = await req.app.locals.chain.call({ question: question, chat_history: req.app.locals.chat_history });
    answer["type"] = req.body.type;

    /* Update chat history */
    req.app.locals.chat_history.push({ question: question, answer: answer["text"] });
    console.log("res: ", answer);
    res.status(200).json(answer);
}
