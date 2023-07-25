import { PROMPT_FOR_Qs, PROMPT_FOR_TERM } from "../prompt/template.js";

export default async function followUp(req, res) {
    /* Set question format */
    const type = req.body.type;
    const questionType = type == "qa" ? "question and answer" : "term and definition";
    let question = "Give me 5 new pairs of " + questionType + " from the document that didn't appear in previous answers.";
    question += type == "qa" ? PROMPT_FOR_Qs : PROMPT_FOR_TERM;
    question += "If there are fewer than 5 pairs available, then give me a blank answer";
    console.log("question: ", question);

    /* Ask follow up question */
    const followUpRes = await req.app.locals.chain.call({ question: question, chat_history: req.app.locals.chat_history });
    req.app.locals.chat_history.push({ question: question, answer: followUpRes["text"] });
    followUpRes["type"] = req.body.type;

    console.log("followUpRes: ", followUpRes);
    res.status(200).json(followUpRes);
}
