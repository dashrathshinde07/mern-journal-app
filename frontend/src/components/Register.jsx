import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.register({ email, password });
      localStorage.setItem('token', response.token);  // Store JWT token in localStorage
      navigate('/journal');  // Redirect to the journal page after registration
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-400 to-blue-500">
      <form onSubmit={handleSubmit} className="bg-white p-10 shadow-2xl rounded-xl max-w-md w-full transform transition-all hover:scale-105 duration-300 ease-in-out">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Create Your Account</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="submit"
          className="bg-teal-500 text-white w-full py-3 rounded-lg hover:bg-teal-600 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Register
        </button>
        <div className="mt-4 text-center">
          <p className="text-gray-600">Already have an account? <a href="/login" className="text-teal-600 hover:underline">Login</a></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
