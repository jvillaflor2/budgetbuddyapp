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
  return <h1>Categories</h1>;
}

export default Categories;