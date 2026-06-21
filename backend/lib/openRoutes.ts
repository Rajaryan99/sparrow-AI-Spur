

const getOpenAIResponse = async (userMessage: string) =>  {

    const options = {
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
};

  try{

        const response  = fetch('https://openrouter.ai/api/v1/chat/completions', options)

        const data = await response.then(res => res.json());
        console.log("Data: ", data.choices[0].message.content)
        return data.choices[0].message.content;

    } catch (error) {
        console.error('Error:', error);
    }


}

  
export default getOpenAIResponse;
