import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', async (req, res, next) => {
  try {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim();
    const subject = String(req.body.subject || '').trim();
    const message = String(req.body.message || '').trim();

    if (!name || name.length > 80) {
      return res.status(400).json({ error: 'Nama wajib diisi (maks. 80 karakter)' });
    }
    if (!EMAIL_RE.test(email) || email.length > 120) {
      return res.status(400).json({ error: 'Format email tidak valid' });
    }
    if (subject.length > 150) {
      return res.status(400).json({ error: 'Subjek maksimal 150 karakter' });
    }
    if (!message || message.length > 3000) {
      return res.status(400).json({ error: 'Pesan wajib diisi (maks. 3000 karakter)' });
    }

    await pool.query(
      'INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject || null, message]
    );
    res.status(201).json({ success: true, message: 'Pesan berhasil dikirim' });
  } catch (err) {
    next(err);
  }
});

export default router;
