import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

// mysql2 sudah mem-parse kolom JSON; fallback jika masih berupa string
const parseJson = (v) => {
  if (typeof v !== 'string') return v ?? [];
  try {
    return JSON.parse(v);
  } catch {
    return [];
  }
};

router.get('/', async (_req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects ORDER BY sort_order ASC, id DESC');
    res.json(
      rows.map((r) => ({
        ...r,
        features: parseJson(r.features),
        technologies: parseJson(r.technologies),
      }))
    );
  } catch (err) {
    next(err);
  }
});

export default router;
