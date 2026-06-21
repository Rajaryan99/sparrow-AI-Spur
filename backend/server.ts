import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pool from './lib/db';
import chatRouter from './routes/thread'

 export const app = express();



app.use(express.json());
app.use(cors());

app.use('/api', chatRouter)

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




























