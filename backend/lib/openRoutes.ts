

const options = (userMessage: string) => ( {
    method: 'POST',
    headers: {
        contentType: 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },

    body: JSON.stringify({
        
            model: 'openai/gpt-oss-120b:free',
            max_tokens: 200,
            messages: [
                {
                    role: 'user',
                    content: userMessage
                }
        ]
        
    })

})

export default options;
