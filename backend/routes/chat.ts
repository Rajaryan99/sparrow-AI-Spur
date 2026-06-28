import express from 'express'
import pool from '../lib/db'
import getOpenAIResponse from '../lib/openRoutes';

const router  = express.Router();


router.post('/chat', async (req: express.Request, res: express.Response) => {

    try {

        let {threadId, message} = req.body;

        if(!message || typeof message !== 'string'){
            return res.status(400).json({error: "Message is required"})
        }

        if(message.trim() === ""){
            return res.status(400).json({ error: 'Message cannot be empty' });
        }

         if (message.length > 1000) {
      return res.status(400).json({ error: 'Message too long. Max 1000 characters.' });
    }

    message = message.trim(); 

        if (!threadId) {
                let threadResult = await pool.query(
                'INSERT INTO threads (title) VALUES ($1) RETURNING id',
                [message.slice(0, 50)]
            );
      threadId = threadResult.rows[0].id;
    }

        await pool.query(
            'INSERT INTO messages (thread_id, role, content)    VALUES ($1, $2, $3)',
            [threadId, 'user', message]
        );

        let history = await pool.query(
            'SELECT role, content FROM messages WHERE thread_id = $1 ORDER BY timestamp ASC',
            [threadId]
        )


// send to openrouter
        
            const aiReply = await getOpenAIResponse(JSON.stringify(history.rows), message);


                if (!aiReply) {
                    return res.status(503).json({ error: "AI service unavailable, try again" });
                }

            
        //save AI replay to DB
        await pool.query(
            'INSERT INTO messages (thread_id, role, content) VALUES ($1, $2, $3)',
            [threadId, 'assistant', aiReply]
        )

        res.json({reply: aiReply, threadId})

    } catch (error) {
        console.log('chat error', error)
        res.status(500).json({error: "Failed to process message"})
    }
})

export default router;