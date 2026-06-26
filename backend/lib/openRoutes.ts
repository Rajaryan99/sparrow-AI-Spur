

const getOpenAIResponse = async (userMessage: string, messages: {role: string, content: string}[]) =>  {

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },

    body: JSON.stringify({
        
            model: 'openai/gpt-oss-120b:free',
            max_tokens: 200,
            messages: [
             {
                    role: 'system',
                    content: 'You are a helpful customer support agent for Spur. Be concise and friendly.'
            },
            {
                    role: 'user',
                    content: userMessage
            }
]
        
    })
};

  try{

        const response  = await fetch('https://openrouter.ai/api/v1/chat/completions', options)

       const data = await response.json()


       if(data.error){
        console.log("OpenRouter error", data.error.message);
        return null
        
       }
        console.log("Data: ", data);                 // log full data first to debug
    return data.choices[0].message.content;

    } catch (error) {
        console.error('Error:', error);
    }


}

  
export default getOpenAIResponse;

  