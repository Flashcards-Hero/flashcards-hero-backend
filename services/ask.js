export default async function ask(req, res) {
    const PROMPT_FOR_TERM = `
    Generate a list of important terms extracted from the given context.
    If you don't know the definition related to the term, just say that you don't know, don't try to make up an answer.
    Give your answers using the following format:
    #Term1: definition of term1.\n\n
    #Term2: definition of term2.\n\n
    #Term3: definition of term3.\n\n
    ...
    `;

    const PROMPT_FOR_Qs = `
    Generate a list of questions based on the given context.
    If you don't know the answer for the question, just say that you don't know, don't try to make up an answer.
    Give your response using the following format:
    #Question1: answers to question1.\n\n
    #Question2: answers to question2.\n\n
    #Question3: answers to question3.\n\n
    ...
    `;

    /* Ask it a question */
    const question = PROMPT_FOR_Qs + "";
    const answer = await req.app.locals.chain.call({ question });
    console.log("res: ", answer);
    const followUpRes = await req.app.locals.chain.call({ question: "what is the first question you gave?" });
    console.log("followUpRes: ", followUpRes);
    res.status(200).json(followUpRes);
}
