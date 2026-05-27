import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold">
        <span className="text-emerald-500">Budget</span>
        <span className="text-violet-400"> Buddy</span>
        </h1>
        <div className = "flex gap-6">
          <Link to="/" className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${location.pathname === '/' ? 'bg-violet-50 text-violet-600' : 'text-gray-500 hover:text-gray-800'}`}>
            Dashboard
          </Link>
          <Link to="/transactions" className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${location.pathname === '/transactions' ? 'bg-violet-50 text-violet-600' : 'text-gray-500 hover:text-gray-800'}`}>
            Transactions
          </Link>
          <Link to="/categories" className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${location.pathname === '/categories' ? 'bg-violet-50 text-violet-600' : 'text-gray-500 hover:text-gray-800'}`}>
            Categories
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;