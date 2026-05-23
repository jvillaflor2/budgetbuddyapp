import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold">
        <span className="text-emerald-500">Budget</span>
        <span className="text-violet-400"> Buddy</span>
        </h1>
        <div className = "flex gap-6">
          <Link to="/"  className="text-gray-500 hover:text-gray-800 transition-colors text-sm font-medium" >Dashboard</Link>
          <Link to="/transactions" className="text-gray-500 hover:text-gray-800 transition-colors text-sm font-medium">Transactions</Link>
          <Link to="/categories" className="text-gray-500 hover:text-gray-800 transition-colors text-sm font-medium">Categories</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;