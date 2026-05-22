import React, {useState, useEffect}from 'react';
import axios from 'axios';

function Dashboard() {

  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
}, []);
  return <h1>Dashboard</h1>;
}

export default Dashboard;