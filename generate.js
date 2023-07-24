const handleOpenAI = async function (req, res, configuration, openai) {
    const prompt =  req.body.content|| '';
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
            messages:   [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Now, about this following text, " + prompt + ". Please ask me a question about it."}
            ],
            n: 10
        });
        console.log(completion.data);
        res.send(completion.data);
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
