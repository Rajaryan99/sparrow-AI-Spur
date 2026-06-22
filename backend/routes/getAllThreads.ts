
import express from 'express'
import pool from '../lib/db'

const router  = express.Router();



router.get('/all/threads', async (req, res) => {
    const result = await pool.query(
        'SELECT * FROM threads ORDER BY created_at DESC'
    );
    res.json(result.rows);
});

export default router