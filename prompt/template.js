const prefix = "If you don't know the answer for the question, just say that you don't know, don't try to make up an answer. ";

export const PROMPT_FOR_TERM =
    prefix +
    `
    Give your answers using the following format:
    Term1: definition of term1.\n\n
    Term2: definition of term2.\n\n
    Term3: definition of term3.\n\n
    ...
    `;

export const PROMPT_FOR_Qs =
    prefix +
    `
    Give your response using the following format. Do not number each question:
    Question\n Answer.\n\n
    Question\n Answer.\n\n
    Question\n Answer.\n\n
    ...
    `;

export const CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT = `Given the following conversation and a follow up question, return the conversation history excerpt that includes any relevant context to the question if it exists and rephrase the follow up question to be a standalone question.
Chat History:
{chat_history}
Follow Up Input: {question}
Your answer should follow the following format:
\`\`\`
Use the following pieces of context to answer the users question.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
----------------
<Relevant chat history excerpt as context here>
Standalone question: <Rephrased question here>
\`\`\`
Your answer:`;
