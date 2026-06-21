import express, { response } from 'express'
import pool from '../lib/db';

const router = express.Router();


router.post('/thread', async (req: express.Request, res: express.Response) => {
    try {

        const result =  await pool.query(
            'INSERT INTO threads (title) VALUES ($1) RETURNING *',
            ['New Conversation']
        );
        res.json(result.rows[0]);


    } catch (error) {
        console.error('Failed to create thread', error)
        res.status(500).json({ Error: 'Failed to create new thread' })
    }
})

export default router;