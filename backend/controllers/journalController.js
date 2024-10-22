const JournalEntry = require('../models/JournalEntry');

// Create a journal entry
exports.createJournalEntry = async (req, res) => {
  const { title, content, mood } = req.body;
  try {
    const newEntry = new JournalEntry({ userId: req.user.id, title, content, mood });
    await newEntry.save();
    res.json(newEntry);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all journal entries for the logged-in user
exports.getJournalEntries = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ userId: req.user.id });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update a journal entry
exports.updateJournalEntry = async (req, res) => {
  try {
    const entry = await JournalEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ msg: 'Journal entry not found' });
    }
    if (entry.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const { title, content, mood } = req.body;
    entry.title = title || entry.title;
    entry.content = content || entry.content;
    entry.mood = mood || entry.mood;
    await entry.save();
    res.json(entry);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete a journal entry
exports.deleteJournalEntry = async (req, res) => {
  try {
    const entry = await JournalEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ msg: 'Journal entry not found' });
    }
    if (entry.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await entry.remove();
    res.json({ msg: 'Journal entry removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
