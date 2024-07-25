'use client';

import { useRouter } from 'next/navigation';

export default function ManagePlayers() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 text-white text-center">Manage Players</h2>
        <div className="space-y-4">
          <button
            onClick={() => handleNavigation('/admin/add-player')}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Add Player
          </button>
          <button
            onClick={() => handleNavigation('/admin/edit-player')}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Edit Player
          </button>
          <button
            onClick={() => handleNavigation('/admin/delete-player')}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Delete Player
          </button>
        </div>
      </div>
    </div>
  );
}
