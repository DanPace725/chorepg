'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from '../../../lib/supabase';

export default function AddPlayer() {
  const [name, setName] = useState('');
  const [adminId, setAdminId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAdmin = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error('Error fetching user:', userError);
        toast.error('Error fetching user');
        return;
      }

      if (user) {
        const username = user.user_metadata.username; // Use the username from user metadata

        const { data: admin, error: adminError } = await supabase
          .from('admin')
          .select('id')
          .eq('username', username)
          .single();

        if (adminError) {
          console.error('Error fetching admin:', adminError);
          toast.error('Error fetching admin');
          return;
        }

        if (admin) {
          setAdminId(admin.id);
        } else {
          console.error('Admin not found');
          toast.error('Admin not found');
        }
      }
    };

    fetchAdmin();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!adminId) {
      toast.error('Admin ID not found');
      return;
    }

    // Insert the new player
    const { error: insertError } = await supabase
      .from('player')
      .insert([{ name, admin_id: adminId }]);

    if (insertError) {
      toast.error('Error adding player');
      return;
    }

    toast.success('Player added successfully', {
      onClose: () => router.push('/admin/manage-players'),
    });
  };

  const handleBack = () => {
    router.push('/admin/manage-players');
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
        <button
          type="button"
          onClick={handleBack}
          className="w-full bg-gray-500 text-white p-2 rounded mt-2"
        >
          Back
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
