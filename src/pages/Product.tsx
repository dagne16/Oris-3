import React, { useState, useEffect, useContext } from 'react';
import './Product.css';
import ColorStrip from '../components/ColorStrip';
import { API_BASE } from '../api/client';
import CartContext from '../context/CartContext';

type ProductType = {
  _id?: string;
  name: string;
  price: number | string;
  category: string;
  description?: string;
  images?: { url?: string }[];
  image?: string;
};

const Product: React.FC = () => {
  const cart = useContext(CartContext);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addingId, setAddingId] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddToCart = async (product: ProductType, imageUrl: string) => {
    const productId = product._id ?? product.name;
    if (!product._id) {
      console.error('Product is missing an id and cannot be added to cart');
      return;
    }
    const price = typeof product.price === 'string'
      ? parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0
      : product.price;

    setAddingId(productId);
    try {
      await cart.addToCart({
        _id: product._id,
        name: product.name,
        price,
        image: imageUrl
      });
      setAddedId(productId);
      setTimeout(() => setAddedId(current => current === productId ? null : current), 1400);
    } catch (err) {
      console.error('Failed to add to cart', err);
    } finally {
      setAddingId(null);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/products?limit=100`);
        const json = await res.json();
        setProducts(json.data ?? json);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };
    fetchProducts();
  }, []);

  // Get unique categories
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Filter products
  const filteredProducts = products.filter(product => {
    const name = product.name || '';
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="product-page">
      {/* Header */}
      <div className="product-header">
        <h2 className="product-title">
          Oris Habesha <span className="highlight">Cloth Store</span>
        </h2>
        <p className="product-subtitle">Our Store Collections</p>
      </div>
      <ColorStrip color="#F0F7EE" className="gap-bottom" />

      {/* Search and Filter */}
      <div className="search-filter-container">
        <div className="search-box">
          <svg 
            className="search-icon"
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, idx) => {
            const key = product._id ?? product.name;
            const imageUrl = product.images && product.images.length && product.images[0].url
              ? product.images[0].url
              : (product.image || '/image1.png');
            const stripColor = idx % 3 === 0 ? '#FDEBD0' : (idx % 3 === 1 ? '#E8F8F5' : '#F5EEF8');
            return (
              <div key={key} className="product-card">
                <div className="product-image-placeholder">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-overlay">
                    <p>{product.description}</p>
                  </div>
                </div>
                <ColorStrip color={stripColor} className="gap-top" />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">{product.price}</p>
                  <button
                    className={`add-to-cart-btn ${addedId === key ? 'added' : ''}`}
                    disabled={addingId === key}
                    onClick={() => handleAddToCart(product, imageUrl)}
                  >
                    {addingId === key ? 'Adding…' : addedId === key ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-products">
            <p>No products found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Product;