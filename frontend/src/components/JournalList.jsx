import React from 'react';
import apiService from '../services/apiService';

const JournalList = ({ entries, onEntryDeleted }) => {
  const handleDelete = async (id) => {
    try {
      await apiService.deleteEntry(id);  // Call delete API
      onEntryDeleted();  // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting entry', error);
    }
  };

  return (
    <div className="mt-4">
      {entries.length ? (
        entries.map((entry) => (
          <div key={entry._id} className="bg-white p-4 rounded mb-4 shadow">
            <h3 className="text-xl font-bold mb-2">{entry.title}</h3>
            <p>{entry.content}</p>
            <p className="text-sm text-gray-500">Mood: {entry.mood}</p>
            <p className="text-sm text-gray-500">Date: {new Date(entry.date).toLocaleString()}</p>
            
            <button
              onClick={() => handleDelete(entry._id)}  // Pass the correct entry ID
              className="bg-red-500 text-white p-2 rounded mt-4 hover:bg-red-600"
            >
              Delete Entry
            </button>
          </div>
        ))
      ) : (
        <p>No entries found.</p>
      )}
    </div>
  );
};

export default JournalList;
