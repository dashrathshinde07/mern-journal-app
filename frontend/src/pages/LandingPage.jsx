import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-12 shadow-2xl rounded-xl text-center max-w-md w-full transform transition-all hover:scale-105 duration-300 ease-in-out">
        <h1 className="text-5xl font-extrabold mb-4 text-gray-900 animate-bounce">Mood Journal</h1>
        <p className="text-lg text-gray-700 mb-8 font-medium">Your daily companion for tracking emotions and well-being.</p>
        <div className="space-y-4">
          <Link
            to="/login"
            className="inline-block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-block w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Register
          </Link>
        </div>
        <div className="mt-8">
          <Link
            to="/about"
            className="text-sm text-gray-500 hover:text-gray-900 transition duration-200"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
