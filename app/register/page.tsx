'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from '../../lib/supabase';
import bcrypt from 'bcryptjs';



export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the user already exists
    const { data: existingUser, error: existingUserError } = await supabase
      .from('admin')
      .select('id')
      .eq('username', username)
      .single();

      if (existingUserError) {
        console.error('Error checking existing user:', existingUserError); // Log the error
        if (existingUserError.code !== 'PGRST116') {
          toast.error('Error checking existing user');
          return;
        }
    }

    if (existingUser) {
      toast.error('Username already taken');
      return;
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create the new user
    const { error: insertError } = await supabase
      .from('admin')
      .insert([
        { username, password_hash: passwordHash, name }
      ]);

    if (insertError) {
      toast.error('Error creating user');
      return;
    }

    toast.success('Registration successful', {
      onClose: () => router.push('/login'),
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4 text-white">Register</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-gray-300" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            required
          />
        </div>
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
          Register
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}