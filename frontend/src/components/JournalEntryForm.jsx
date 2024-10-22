import React, { useState } from 'react';
import apiService from '../services/apiService';

const JournalEntryForm = ({ onEntryAdded, onQuoteFetched }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('Happy');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.createEntry({ title, content, mood });
      onEntryAdded();  // Refresh the entry list after adding
      onQuoteFetched();  // Fetch a new motivational quote
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating entry', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="Happy">Happy</option>
        <option value="Neutral">Neutral</option>
        <option value="Sad">Sad</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600">
        Add Journal Entry
      </button>
    </form>
  );
};

export default JournalEntryForm;
