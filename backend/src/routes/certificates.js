import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM certificates ORDER BY sort_order ASC, id DESC');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

export default router;
