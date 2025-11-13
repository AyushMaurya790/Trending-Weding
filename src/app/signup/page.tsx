// This page allows users to create new accounts.
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AnimationWrapper from '@/components/AnimationWrapper';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      // Hash password before sending to API (or handle hashing in API route)
      // For this example, we'll assume hashing happens on the API route for simplicity
      const res = await fetch('/api/register', { // Assuming /api/register handles user creation
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Registration successful! Please log in.');
        router.push('/login');
      } else {
        setMessage(data.message || 'Registration failed.');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setMessage(error.message || 'Network error during registration.');
    }
  };

  return (
    <AnimationWrapper>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="p-8 rounded-lg shadow-md w-full max-w-md bg-white">
          <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
          {message && (
            <p className={`text-center mb-4 ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:text-blue-800 font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </AnimationWrapper>
  );
}
