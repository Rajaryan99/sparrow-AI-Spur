import { maxCost } from "@openrouter/sdk/lib/stop-conditions.js";



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
                role: 'system',
                content: 'You are a helpful customer support agent for Spur. Be concise and friendly.',
                }, 
            ]
        
    })

}

export default options;
