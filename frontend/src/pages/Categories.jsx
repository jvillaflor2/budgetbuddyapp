import axios from 'axios';
import React, {useState, useEffect} from 'react';

function Categories(){
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('expense');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  
  const fetchCategories = async() => {
    const response = await axios.get('http://localhost:5000/categories');
    setCategories(response.data);

  }

  const addCategory = async () => {
    if (!name.trim()) {
      setError('Please enter a category name');
      return;
    }
     if (name.trim().length < 2) {
      setError('Category name must be at least 2 characters');
      return;
    }
    const duplicate = categories.find(
      cat => cat.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (duplicate) {
      setError('This category already exists');
      return;
    }

    await axios.post('http://localhost:5000/categories', { name, type });
    setError('');
    setName('');
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    await axios.delete(`http://localhost:5000/categories/${id}`);
    fetchCategories();
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Categories</h1>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Add Category</h2>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          {error && (
          <p className="text-sm text-red-400 mt-2">{error}</p>
          )}
          <button
            onClick={addCategory}
            className="bg-[#C4B5FD] text-violet-900 text-sm font-medium px-5 py-2 rounded-xl hover:bg-violet-300 transition-colors"
          >
            Add Category
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">All Categories</h2>
        <ul className="divide-y divide-gray-100">
          {categories.map((cat) => (
            <li key={cat.id} className="py-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${cat.type === 'income' ? 'bg-[#A7F3D0] text-emerald-800' : 'bg-[#FDBA74] text-orange-800'}`}>
                  {cat.type}
                </span>
                <p className="text-sm font-medium text-gray-800">{cat.name}</p>
              </div>
              <button
                onClick={() => deleteCategory(cat.id)}
                className="text-xs text-gray-400 hover:text-red-400 transition-colors"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default Categories;