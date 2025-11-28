import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../services/api';
import Modal from '../components/Modal';
import CategoryForm from '../components/CategoryForm';
import DashboardLayout from '../components/DashboardLayout';
import IconButton from '../components/IconButton';
import Image from 'next/image';

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchCategories();
  }, [router]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await api.delete(`/categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Error deleting category: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleSave = async (categoryData) => {
    try {
      if (selectedCategory) {
        await api.put(`/categories/${selectedCategory.id}`, { ...categoryData, id: selectedCategory.id });
      } else {
        await api.post('/categories', categoryData);
      }
      fetchCategories();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-2xl text-text-primary">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Manage Categories</h1>
        <button onClick={handleAdd} className="bg-accent text-white px-4 py-2 rounded hover:bg-yellow-700">
          Add Category
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {category.imageUrl && <Image src={category.imageUrl} alt={category.name} width={50} height={50} className="object-cover rounded-md" />}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <IconButton
                      onClick={() => handleEdit(category)}
                      icon="edit"
                      label="Edit category"
                      variant="primary"
                    />
                    <IconButton
                      onClick={() => handleDelete(category.id)}
                      icon="delete"
                      label="Delete category"
                      variant="danger"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedCategory ? 'Edit Category' : 'Add Category'}>
        <CategoryForm
          category={selectedCategory}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}

CategoriesPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CategoriesPage;
