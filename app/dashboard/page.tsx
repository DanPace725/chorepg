'use client';

import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    // If using an API route for logout
    const response = await fetch('/api/logout', {
      method: 'POST',
    });

    if (response.ok) {
      console.log('Logout successful');
      router.push('/login'); // Redirect to the login page
    } else {
      console.log('Logout failed');
      // Handle logout failure
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-black to-blue-900">
      <div className="text-center">
        <h1 className="text-4xl text-white mb-8">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}