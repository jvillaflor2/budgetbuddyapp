import React, {useState, useEffect}from 'react';
import axios from 'axios';

function Dashboard() {

  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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

  const filteredTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    if (selectedMonth === 0) {
        
        return transactionDate.getFullYear() === selectedYear;
    }
    
    return (
        transactionDate.getMonth() + 1 === selectedMonth &&
        transactionDate.getFullYear() === selectedYear
    );
  });

  const totalIncome = filteredTransactions
    .filter(t => {
      const cat = categories.find(c => c.id === t.category_id);
      return cat && cat.type === 'income';
    })
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses =filteredTransactions
    .filter(t => {
        const cat = categories.find(c => c.id === t.category_id);
        return cat && cat.type === 'expense';
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  
  return (
     <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      <div className="flex items-center gap-3 mb-6">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
        >
          <option value={0}>Full Year</option>
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
        >
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
          <option value={2026}>2026</option>
          <option value={2027}>2027</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className={`rounded-2xl p-5 shadow-sm border ${balance >= 0 ? 'bg-[#A7F3D0] border-emerald-100' : 'bg-[#FCA5A5] border-red-100'}`}>
          <p className={`text-sm mb-1 ${balance >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>Balance</p>
          <p className={`text-2xl font-semibold ${balance >= 0 ? 'text-emerald-900' : 'text-red-900'}`}>${balance.toFixed(2)}</p>
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
          {[...filteredTransactions]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
            .map((t) => {
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
