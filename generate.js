const handleOpenAI = async function (req, res, configuration, openai) {
    const prompt = req.body.content || "";
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured",
            },
        });
        return;
    }
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant and you give answers in a list. People generally ask about text and books." },
                { role: "user", content: "Now, about this following text, " + ". Please ask me 10 questions about it." },
            ],
        });
        console.log(completion.data.choices[0].message);
        res.send("success");
    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: "An error occurred during your request.",
                },
            });
        }
    }
};

export default handleOpenAI;
