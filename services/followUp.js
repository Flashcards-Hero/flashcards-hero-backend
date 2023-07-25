import { PROMPT_FOR_Qs, PROMPT_FOR_TERM } from "../prompt/template.js";

export default async function followUp(req, res, chat) {
    /* Set question format */
    const type = req.body.type;
    const questionType = type == "qa" ? "questions" : "terms";

    let question = `Give me a new list of ${questionType} based on the document. Don't provide terms appeared before. If there's no new term, just say you don't know any new terms.`;
    question += type == "qa" ? PROMPT_FOR_Qs : PROMPT_FOR_TERM;
    console.log("question: ", question);
    // let question = "What is the first pair of term and definition provided in last conversation?";

    /* Ask follow up question */
    const messages = await chat.getMessages();
    const followUpRes = await req.app.locals.chain.call({ question: question, chat_history: messages });
    // const followUpRes = await req.app.locals.chain.call({ question: question });

    chat.addUserMessage(question);
    chat.addAIChatMessage(followUpRes["text"]);
    // chat.push({ question: question, text: followUpRes["text"] });
    followUpRes["type"] = req.body.type;

    console.log("followUpRes: ", followUpRes);
    // console.log(messages);
    res.status(200).json(followUpRes);
}
