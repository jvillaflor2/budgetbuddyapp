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
        <h1>Dashboard</h1>
        <div>
          <div>
            <h3>Balance</h3>
            <p>${balance.toFixed(2)}</p>
          </div>
          <div>
            <h3>Total Income</h3>
            <p>${totalIncome.toFixed(2)}</p>
          </div>
          <div>
            <h3>Total Expenses</h3>
            <p>${totalExpenses.toFixed(2)}</p>
          </div>
        </div>
        <h2>Recent Transactions</h2>
        <ul>
          {transactions.slice(-5).reverse().map((t) => {
            const cat = categories.find(c => c.id === t.category_id);
            return (
              <li key={t.id}>{cat ? cat.name : 'Unknown'} — ${t.amount} — {t.date} — {t.note}
              </li>
            );
          })}
        </ul>

      </div>
  ); 
}
export default Dashboard;
