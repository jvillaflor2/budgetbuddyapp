import axios from 'axios';
import React, {useState, useEffect} from 'react';

function Categories(){
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('expense');

  useEffect(() => {
    fetchCategories();
  }, []);

  
  const fetchCategories = async() => {
    const response = await axios.get('http://localhost:5000/categories');
    setCategories(response.data);

  }

  const addCategory = async () => {
    await axios.post('http://localhost:5000/categories', { name, type });
    setName('');
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    await axios.delete(`http://localhost:5000/categories/${id}`);
    fetchCategories();
  };
  return (
      <div>
      <h1>Categories</h1>

      <input
        type="text"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button onClick={addCategory}>Add Category</button>

      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            {cat.name} — {cat.type}
            <button onClick={() => deleteCategory(cat.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;