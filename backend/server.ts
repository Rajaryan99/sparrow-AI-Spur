import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/',(req: express.Request, res: express.Response) => {
    res.send('Hello, World!');
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
























