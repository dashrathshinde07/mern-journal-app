import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.login({ email, password });
      localStorage.setItem('token', response.token);  // Store JWT token in localStorage
      navigate('/journal');  // Redirect to the journal page after login
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 to-indigo-600">
      <form onSubmit={handleSubmit} className="bg-white p-10 shadow-2xl rounded-lg max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Login to Your Account</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white w-full py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <p className="text-gray-600">Don't have an account? <a href="/register" className="text-purple-600 hover:underline">Register</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
