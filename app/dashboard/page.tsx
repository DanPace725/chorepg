'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [name, setName] = useState('Name');
  const [level, setLevel] = useState(5);
  const [xp, setXp] = useState(500);
  const [recentTasks, setRecentTasks] = useState([
    { name: 'Clean Room', xp: 30 },
    { name: 'Feed Chickens', xp: 25 },
  ]);

  const handleLogTask = () => {
    // Implement log task functionality
    console.log('Log task clicked');
  };

  const navigateToAdmin = () => {
    router.push('/admin');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-r from-black to-blue-900 relative">
      <button
        onClick={navigateToAdmin}
        className="absolute top-4 left-4 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-blue-700"
      >
        Admin
      </button>
      <div className="text-center max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white text-center text-xl"
        />
        
        <div className="flex items-center bg-gray-700 rounded p-2">
          <span className="mr-2 text-white">Level {level}</span>
          <div className="flex-grow bg-gray-600 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{width: `${(xp / 1000) * 100}%`}}
            ></div>
          </div>
          <span className="ml-2 text-white">{xp} XP</span>
        </div>
        
        <button
          onClick={handleLogTask}
          className="w-full bg-blue-500 text-white p-2 rounded transition-colors duration-300 hover:bg-blue-700"
        >
          Log Task
        </button>
        
        <div className="bg-gray-700 rounded p-4">
          <h2 className="font-bold mb-2 text-white">Recent Tasks</h2>
          {recentTasks.map((task, index) => (
            <div key={index} className="flex justify-between text-white">
              <span>{task.name}</span>
              <span className="text-green-500">+ {task.xp} XP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}