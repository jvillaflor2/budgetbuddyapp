import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  const fetchTransactions = async () => {
    const response = await axios.get('http://localhost:5000/transactions');
    setTransactions(response.data);
  };

  const fetchCategories = async () => {
    const response = await axios.get('http://localhost:5000/categories');
    setCategories(response.data);
  };

  const addTransaction = async () => {
    await axios.post('http://localhost:5000/transactions', {
      amount: parseFloat(amount),
      category_id: parseInt(categoryId),
      date,
      note
    });
    setAmount('');
    setCategoryId('');
    setDate('');
    setNote('');
    fetchTransactions();
  };

  const deleteTransaction = async (id) => {
    await axios.delete(`http://localhost:5000/transactions/${id}`);
    fetchTransactions();
  };

  return (
    <div>
      <h1 className ="text-2xl font-semibold text-gray-800 mb-6">Transactions</h1>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-semibold tex-gray-700 mb-4">Add Transaction</h2>
        <div>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
      />

      <select 
        value={categoryId} 
        onChange={(e) => setCategoryId(e.target.value)}
        className="border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300">
        <option 
        value="">Select category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className ="border border-gray-200 rounded-xl px-4  py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
      />

      <input
        type="text"
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
      />
      </div>
      <button onClick={addTransaction}>Add Transaction</button>
      </div>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            ${t.amount} — category {t.category_id} — {t.date} — {t.note}
            <button onClick={() => deleteTransaction(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;