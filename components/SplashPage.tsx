import React from 'react';
import Link from 'next/link';

const SplashPage = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-900">
      <div className="text-center max-w-lg mx-auto">
        <h1 className="text-4xl text-blue-400 mb-4">ChorePG</h1>
        <p className="text-lg text-gray-300 mb-6">
          Transform everyday tasks into exciting quests! ChorPG leverages game mechanics and psychological principles to motivate neurodivergent individuals, especially children with ADHD and ASD, to complete chores and develop positive habits. Join the adventure and make chores fun!
        </p>
        <Link href="/login">
          <span className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded transition-colors duration-300 hover:bg-blue-700">
            Login
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SplashPage;