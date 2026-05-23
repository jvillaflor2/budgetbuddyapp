import React, {useState, useEffect}from 'react';
import axios from 'axios';

function Dashboard() {

  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
}, []);

  const fetchTransactions = async () => {
    const response = await axios.get('http://localhost:5000/transactions');
    setTransactions(response.data)
  }
  const fetchCategories = async () => {
    const response = await axios.get('http://localhost:5000/categories');
    setCategories(response.data);
  };

  const totalIncome = transactions
    .filter(t => {
      const cat = categories.find(c => c.id === t.category_id);
      return cat && cat.type === 'income';
    })
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter(t => {
        const cat = categories.find(c => c.id === t.category_id);
        return cat && cat.type === 'expense';
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  
  return (
     <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Balance</p>
          <p className="text-2xl font-semibold text-gray-800">${balance.toFixed(2)}</p>
        </div>
        <div className="bg-[#A7F3D0] rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-emerald-700 mb-1">Total Income</p>
          <p className="text-2xl font-semibold text-emerald-900">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-[#FDBA74] rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-orange-700 mb-1">Total Expenses</p>
          <p className="text-2xl font-semibold text-orange-900">${totalExpenses.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h2>
        <ul className="divide-y divide-gray-100">
          {transactions.slice(-5).reverse().map((t) => {
            const cat = categories.find(c => c.id === t.category_id);
            return (
              <li key={t.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-800">{cat ? cat.name : 'Unknown'}</p>
                  <p className="text-xs text-gray-400">{t.date} {t.note && `— ${t.note}`}</p>
                </div>
                <p className={`text-sm font-semibold px-3 py-1 rounded-full ${cat && cat.type === 'income' ? 'bg-[#A7F3D0] text-emerald-800' : 'bg-[#FDBA74] text-orange-800'}`}>
                  {cat && cat.type === 'income' ? '+' : '-'}${t.amount}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default Dashboard;
