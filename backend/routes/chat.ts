import express from 'express'
import pool from '../lib/db'
import getOpenAIResponse from '../lib/openRoutes';

const router  = express.Router();


router.post('/chat', async (req: express.Request, res: express.Response) => {

    try {

        const {threadId, message} = req.body;

        await pool.query(
            'INSERT INTO messages (thread_id, role, content)    VALUES ($1, $2, $3)',
            [threadId, 'user', message]
        );

        const history = await pool.query(
            'SELECT role, content FROM messages WHERE thread_id = $1 ORDER BY timestamp ASC',
            [threadId]
        )


// send to openrouter
        
            const aiReply = await getOpenAIResponse(JSON.stringify(history.rows), message);
            
        //save AI replay to DB
        await pool.query(
            'INSERT INTO messages (thread_id, role, content) VALUES ($1, $2, $3)',
            [threadId, 'assistant', aiReply]
        )

        res.json({reply: aiReply})

    } catch (error) {
        console.log('chat error', error)
        res.status(500).json({error: "Failed to process message"})
    }
})

export default router;