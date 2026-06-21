import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { OpenRouter } from '@openrouter/sdk';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/',(req: express.Request, res: express.Response) => {
    res.send('Hello, World!');
})



const apiKey = process.env.OPENROUTER_API_KEY || '';
const client = new OpenRouter({ apiKey });

if (!apiKey) {
    console.warn('OPENROUTER_API_KEY is not set. Skipping OpenRouter request.');
} else {
    try {
        const response = await client.chat.send({
            chatRequest: {
                model: '~openai/gpt-latest',
                maxTokens: 100,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful customer support agent for Spur. Be concise and friendly.',
                    },
                ],
            },
        });

        console.log('OpenRouter response:', response.choices[0]?.message.content);

    } catch (error) {
        console.error('OpenRouter request failed:', error);
    }
}




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
























