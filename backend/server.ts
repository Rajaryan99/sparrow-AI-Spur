import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello, World!');
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
























// import { OpenRouter } from '@openrouter/sdk';

// const client = new OpenRouter({
//   apiKey: process.env.OPENROUTER_API_KEY,
// });

// const response = await client.chat.send({
//     chatRequest: {
//   model: 'openai/gpt-5.2',
//   messages: [
//     { role: 'user', content: 'Explain quantum computing in one sentence.' },
//   ],
// }
// });

// console.log(response)

