import { useEffect, useState } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [productsRes, categoriesRes] = await Promise.all([
        api.get('/products'),
        api.get('/categories'),
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.log('Error fetching initial data:', error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categoryId === selectedCategory.id)
    : products;

  if (loading) {
    return (
      <Layout>
        <div className="text-center">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-background mb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent z-10" />
          {/* We use a very subtle pattern or image here, placeholder for now */}
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-40" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32 flex flex-col items-start">
          <p className="text-accent font-semibold tracking-widest uppercase mb-3">Experience Elite Coffee</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 max-w-2xl leading-tight">
            Masterfully Crafted Roasts.
          </h1>
          <p className="text-text-secondary text-lg mb-8 max-w-xl">
            Sourced from the world's most exclusive estates. Roasted to double-O specifications. Never settle for ordinary.
          </p>
          <button className="luxury-button" onClick={() => document.getElementById('shop').scrollIntoView({ behavior: 'smooth' })}>
            Explore the Blends
          </button>
        </div>
      </div>

      <div id="shop" className="container mx-auto px-4 mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Featured Roasts</h2>
            <div className="w-16 h-1 bg-accent mb-6" />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                !selectedCategory ? 'bg-accent text-background shadow-gold' : 'bg-surface text-text-secondary hover:text-white border border-white/5'
              }`}
            >
              All Blends
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  selectedCategory?.id === cat.id ? 'bg-accent text-background shadow-gold' : 'bg-surface text-text-secondary hover:text-white border border-white/5'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-surface border border-white/5 rounded-xl overflow-hidden hover:shadow-glass hover:bg-surface-hover transition-all duration-300 group">
              <div className="h-64 relative overflow-hidden bg-espresso-dark">
                {product.imageUrl ? (
                  <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "cover" }} className="group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-secondary opacity-50 text-sm italic">
                    Classified Imaging
                  </div>
                )}
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
              </div>
              
              <div className="p-6 relative z-10">
                <p className="text-accent text-xs font-bold tracking-wider uppercase mb-1">{product.categoryName || 'Exclusive'}</p>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{product.name}</h3>
                
                <div className="flex justify-between items-center mb-6">
                  <p className="text-2xl font-serif text-white">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-text-secondary">Stock: {product.stock}</p>
                </div>
                
                <button
                  onClick={() => addToCart(product)}
                  className="w-full border border-accent/30 text-accent hover:bg-accent hover:text-background font-bold py-3 rounded-md transition-all duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}