import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';
import JournalEntryForm from '../components/JournalEntryForm';
import JournalList from '../components/JournalList';
import Filter from '../components/Filter';
import MotivationalQuote from '../components/MotivationalQuote';
import { useNavigate } from 'react-router-dom';

const JournalPage = () => {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [quote, setQuote] = useState('');
  const navigate = useNavigate();

  // Fetch all journal entries from the API
  const fetchEntries = async () => {
    try {
      const data = await apiService.getEntries();
      setEntries(data);
      setFilteredEntries(data); // Initially, all entries are displayed
    } catch (error) {
      console.error('Error fetching entries', error);
    }
  };

  // Fetch a motivational quote from the API
  const fetchQuote = async () => {
    try {
      const response = await apiService.getQuote();
      setQuote(response.quote);
    } catch (error) {
      console.error('Error fetching quote', error);
    }
  };

  useEffect(() => {
    fetchEntries(); // Fetch entries on component mount
    fetchQuote();   // Fetch a motivational quote on component mount
  }, []);

  // Handle mood filter logic
  const handleFilter = (mood) => {
    if (mood) {
      const filtered = entries.filter((entry) => entry.mood === mood);
      setFilteredEntries(filtered);
    } else {
      setFilteredEntries(entries); // Reset to all entries if no mood is selected
    }
  };

  // Handle deleting a journal entry and refreshing the list
  const handleEntryDeleted = () => {
    fetchEntries(); // Re-fetch entries after one is deleted
  };

  // Logout functionality to clear token and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the stored token from localStorage
    navigate('/login');  // Redirect to the login page
  };

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col items-center justify-center">
      <div className="flex justify-between items-center mb-12 w-full max-w-4xl">
        <h1 className="text-5xl font-extrabold text-indigo-700 tracking-tight">Your Journal</h1>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white py-3 px-6 rounded-full hover:bg-red-600 transition-transform transform hover:scale-105 shadow-lg"
        >
          Logout
        </button>
      </div>

      <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl">Track your moods and reflect on your day. Keep a record of how you feel and let your journal guide you through better mental well-being.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
        <div className="bg-white p-8 shadow-xl rounded-xl transform transition hover:scale-105">
          <JournalEntryForm onEntryAdded={fetchEntries} onQuoteFetched={fetchQuote} />
        </div>
        <div className="bg-white p-8 shadow-xl rounded-xl transform transition hover:scale-105">
          <Filter onFilter={handleFilter} />
          <JournalList entries={filteredEntries} onEntryDeleted={handleEntryDeleted} />
        </div>
      </div>

      {quote && (
        <div className="mt-12 p-6 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-xl shadow-lg transform transition hover:scale-105 max-w-xl text-center">
          <MotivationalQuote quote={quote} />
        </div>
      )}
    </div>
  );
};

export default JournalPage;
