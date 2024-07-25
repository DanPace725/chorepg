'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../lib/supabase';
import bcrypt from 'bcryptjs';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Fetch the user from the database
    const { data: user, error: userError } = await supabase
      .from('admin')
      .select('password_hash')
      .eq('username', username)
      .single();

    if (userError) {
      console.log('Login failed', userError.message);
      // Handle login failure
      return;
    }

    // Compare the input password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      console.log('Login failed: Invalid credentials');
      // Handle login failure
      return;
    }

    console.log('Login successful');
    router.push('/dashboard'); // Redirect to the dashboard page
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4 text-white">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-gray-300" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-gray-300" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
        <p className="mt-4 text-gray-300">
          Don&apos;t have an account? <a href="/register" className="text-blue-500">Register</a>
        </p>
      </form>
    </div>
  );
}