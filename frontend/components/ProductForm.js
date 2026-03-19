import { useState, useEffect } from 'react';
import api from '../services/api';

export default function ProductForm({ product, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setCategoryId(product.categoryId);
      setImageUrl(product.imageUrl);
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setCategoryId('');
      setImageUrl('');
    }
  }, [product]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.log('Error fetching categories:', error.message || error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, description, price: parseFloat(price), stock: parseInt(stock), categoryId: parseInt(categoryId), imageUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-primary">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-text-primary">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-text-primary">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          step="0.01"
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="stock" className="block text-sm font-medium text-text-primary">Stock</label>
        <input
          type="number"
          id="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          min="0"
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-text-primary">Category</label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-text-primary">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm"
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-accent text-white px-4 py-2 rounded-md hover:bg-yellow-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}
