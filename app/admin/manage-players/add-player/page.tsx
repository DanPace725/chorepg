'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from '../../../../lib/supabase';

export default function AddPlayer() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Insert the new player
    const { error: insertError } = await supabase
      .from('player')
      .insert([
        { name }
      ]);

    if (insertError) {
      toast.error('Error adding player');
      return;
    }

    toast.success('Player added successfully', {
      onClose: () => router.push('/admin/manage-players'),
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4 text-white">Add Player</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-gray-300" htmlFor="name">
            Player Name
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Add Player
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}