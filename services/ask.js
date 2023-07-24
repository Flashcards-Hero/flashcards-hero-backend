export default async function ask(req, res) {
    /* Ask it a question */
    const question = "What is the document about?";
    const answer = await req.app.locals.chain.call({ question });
    console.log("res: ", answer);

    const followUpRes = await req.app.locals.chain.call({ question: "Is it a good one?" });
    console.log("followUpRes: ", followUpRes);
}
