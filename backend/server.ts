import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import options from './lib/openRoutes';
import pool from './lib/db';

 export const app = express();



app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/',(req: express.Request, res: express.Response) => {
    res.send('Hello, World!');
})

// test db connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('DB connection failed:', err);
    } else {
        console.log('DB connected successfully at:', res.rows[0].now);
    }
});



app.post('/test', async (req: express.Request, res: express.Response) => {

    try{

        const {messages} = req.body;

        const response  = fetch('https://openrouter.ai/api/v1/chat/completions', options(messages))

        const data = await response.then(res => res.json());
        console.log("Data: ", data.choices[0].message.content)
        res.send(data.choices[0].message.content);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }


})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
























