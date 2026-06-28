
import express from 'express'
import pool from '../lib/db'

const router  = express.Router();


router.delete('/thread/:threadId', async (req: express.Request, res: express.Response) => {
  try {
    const { threadId } = req.params;
    await pool.query('DELETE FROM threads WHERE id = $1', [threadId]);
    res.json({ message: 'Thread deleted successfully' });
  } catch (error) {
    console.log('delete error', error);
    res.status(500).json({ error: 'Failed to delete thread' });
  }
});

export default router