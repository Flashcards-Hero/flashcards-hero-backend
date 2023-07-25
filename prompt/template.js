const prefix = "You are a helpful assistant that gives answers in a format strictly follows human's commands. If you don't know the answer for the question, just say that you don't know, don't try to make up an answer. ";

export const PROMPT_FOR_TERM =
    prefix +
    `
    If you don't know the definition related to the term, just say that you don't know, don't try to make up an answer. (do not number each term)
    Give your answers using the following format:
    Term1: definition of term1.\n\n
    Term1: definition of term1.\n\n
    Term1: definition of term1.\n\n
    ...
    `;

export const PROMPT_FOR_Qs =
    prefix +
    `
    Give your response using the following format (do not number each question):
    Question\n Answer.\n\n
    Question\n Answer.\n\n
    Question\n Answer.\n\n
    ...
    `;
