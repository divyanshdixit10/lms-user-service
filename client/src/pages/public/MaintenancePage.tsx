import React from 'react';

const MaintenancePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-6">We'll Be Back Soon</h1>
      <p className="text-xl mb-8">Our site is currently undergoing scheduled maintenance.</p>
      <div className="max-w-md mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p>We apologize for any inconvenience. Please check back later.</p>
      </div>
    </div>
  );
};

export default MaintenancePage; 