import express from 'express'
import pool from '../lib/db'

const router  = express.Router();

router.get('/:id/messages', async (req, res) => {
    const { id } = req.params;
    const result = await pool.query(
        'SELECT * FROM messages WHERE thread_id = $1 ORDER BY timestamp ASC',
        [id]
    );
    res.json(result.rows);
});

export default router;