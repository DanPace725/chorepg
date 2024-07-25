'use client';

import { useRouter } from 'next/navigation';

export default function Admin() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 text-white text-center">Admin Panel</h2>
        <div className="space-y-4">
          <button
            onClick={() => handleNavigation('/admin/manage-players')}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Manage Players
          </button>
          <button
            onClick={() => handleNavigation('/admin/manage-rewards')}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Manage Rewards
          </button>
          <button
            onClick={() => handleNavigation('/admin/manage-levels')}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Manage Levels
          </button>
        </div>
      </div>
    </div>
  );
}