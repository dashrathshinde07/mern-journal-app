import React from 'react';

const Filter = ({ onFilter }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mood-filter">
        Filter by Mood
      </label>
      <select
        id="mood-filter"
        onChange={(e) => onFilter(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All Moods</option>
        <option value="Happy">Happy</option>
        <option value="Neutral">Neutral</option>
        <option value="Sad">Sad</option>
      </select>
    </div>
  );
};

export default Filter;
