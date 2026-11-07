import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { pool } from '../db.js';

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, '..', '..', 'uploads');

const ALLOWED = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif' };

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    // ekstensi ditentukan dari mimetype yang diizinkan, bukan dari nama file user
    filename: (_req, file, cb) => cb(null, crypto.randomUUID() + ALLOWED[file.mimetype]),
  }),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  fileFilter: (_req, file, cb) => {
    if (ALLOWED[file.mimetype]) return cb(null, true);
    const err = new Error('Hanya gambar JPG, PNG, WEBP, atau GIF yang diperbolehkan');
    err.status = 400;
    cb(err);
  },
});

router.get('/', async (_req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, message, image_url, created_at FROM comments ORDER BY created_at DESC LIMIT 100'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const name = String(req.body.name || '').trim();
    const message = String(req.body.message || '').trim();

    if (!name || name.length > 80) {
      return res.status(400).json({ error: 'Nama wajib diisi (maks. 80 karakter)' });
    }
    if (!message || message.length > 1000) {
      return res.status(400).json({ error: 'Komentar wajib diisi (maks. 1000 karakter)' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const [result] = await pool.query(
      'INSERT INTO comments (name, message, image_url) VALUES (?, ?, ?)',
      [name, message, imageUrl]
    );
    const [rows] = await pool.query(
      'SELECT id, name, message, image_url, created_at FROM comments WHERE id = ?',
      [result.insertId]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

export default router;
