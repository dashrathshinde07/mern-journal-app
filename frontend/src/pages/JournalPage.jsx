import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';
import JournalEntryForm from '../components/JournalEntryForm';
import JournalList from '../components/JournalList';
import MotivationalQuote from '../components/MotivationalQuote';
import Filter from '../components/Filter';

const JournalPage = () => {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [quote, setQuote] = useState('');
  const [user, setUser] = useState(null);  // New state to hold user details

  const fetchEntries = async () => {
    try {
      const data = await apiService.getEntries();
      setEntries(data);
      setFilteredEntries(data);
    } catch (error) {
      console.error('Error fetching entries', error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const userDetails = await apiService.getUserDetails();
      setUser(userDetails);
    } catch (error) {
      console.error('Error fetching user details', error);
    }
  };

  const fetchQuote = async () => {
    try {
      const response = await apiService.getQuote();
      setQuote(response.quote);
    } catch (error) {
      console.error('Error fetching quote', error);
    }
  };

  useEffect(() => {
    fetchEntries();
    fetchUserDetails();  // Fetch user details after login
  }, []);

  const handleFilter = (mood) => {
    if (mood) {
      const filtered = entries.filter((entry) => entry.mood === mood);
      setFilteredEntries(filtered);
    } else {
      setFilteredEntries(entries);
    }
  };

  const handleEntryDeleted = () => {
    fetchEntries();
  };

  return (
    <div className="container mx-auto p-4">
      {user && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Welcome, {user.email}</h2>
        </div>
      )}
      <JournalEntryForm onEntryAdded={fetchEntries} onQuoteFetched={fetchQuote} />
      <Filter onFilter={handleFilter} />
      <JournalList entries={filteredEntries} onEntryDeleted={handleEntryDeleted} />
      {quote && <MotivationalQuote quote={quote} />}
    </div>
  );
};

export default JournalPage;
