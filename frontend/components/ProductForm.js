import { useState, useEffect } from 'react';

export default function ProductForm({ product, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
    } else {
      setName('');
      setDescription('');
      setPrice('');
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, description, price: parseFloat(price) });
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
