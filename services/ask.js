import { PROMPT_FOR_Qs, PROMPT_FOR_TERM } from "../prompt/template.js";

export default async function ask(req, res, chat) {
    /* Template formation */
    const type = req.body.type;
    const question = type == "qa" ? "Generate a list of questions extracted from the given context. " + PROMPT_FOR_Qs : "Generate a list of important terms based on the given context. " + PROMPT_FOR_TERM + "";

    const messages = await chat.getMessages();
    const answer = await req.app.locals.chain.call({ question: question, chat_history: messages });
    answer["type"] = req.body.type;

    /* Update chat history */
    chat.addUserMessage(question);
    chat.addAIChatMessage(answer["text"]);
    // chat.push({ question: question, text: answer["text"] });
    // console.log(chat);
    console.log("res: ", answer);
    res.status(200).json(answer);
}
