import React from 'react';

const MotivationalQuote = ({ quote }) => {
  return (
    <div className="bg-yellow-200 p-4 mt-4 rounded">
      <p>{quote}</p>
    </div>
  );
};

export default MotivationalQuote;
