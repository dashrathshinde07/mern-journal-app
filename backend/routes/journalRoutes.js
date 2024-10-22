const express = require('express');
const { createJournalEntry, getJournalEntries, updateJournalEntry, deleteJournalEntry } = require('../controllers/journalController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/entries', authMiddleware, createJournalEntry);
router.get('/entries', authMiddleware, getJournalEntries);
router.put('/entries/:id', authMiddleware, updateJournalEntry);
router.delete('/entries/:id', authMiddleware, deleteJournalEntry);

module.exports = router;
