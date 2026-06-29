import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pool from './lib/db';
import threadRouter from './routes/thread'
import chatRouter from './routes/chat'
import getAllThreads from './routes/getAllThreads'
import getThreadId from './routes/getThreadId'
import deleteThread from './routes/deleteThread'


 export const app = express();



app.use(express.json());
app.use(cors({
  origin: ['https://sparrow-ai-spur.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'DELETE'],
}));

app.use('/api', threadRouter)
app.use('/api',  chatRouter)
app.use('/api', getAllThreads)
app.use('/api', getThreadId)
app.use('/api', deleteThread)

const PORT = process.env.PORT || 3000;

app.get('/',(req: express.Request, res: express.Response) => {
    res.send('Hello, World!');
})




try {


// test db connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('DB connection failed:', err);
    } else {
        console.log('DB connected successfully at:', res.rows[0].now);
    }

    // server running on
    app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

});

    
} catch (error) {
    console.error("error in connection database: ", error)
}




























