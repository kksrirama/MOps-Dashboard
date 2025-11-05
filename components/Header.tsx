import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-base-200 border-b border-base-300 p-4 col-span-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-neutral">Manufacturing Operations Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
          </span>
          <span className="text-sm font-medium text-success">All Systems Operational</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
