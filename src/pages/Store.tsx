import React, { useState, useEffect, useContext } from 'react';
import './Store.css';
import ColorStrip from '../components/ColorStrip';
import { API_BASE } from '../api/client';
import CartContext from '../context/CartContext';

// Product data — renders instantly, no waiting on the network.
const products = [
  {
    id: 1,
    name: 'Traditional Habesha Dress',
    price: '$89.99',
    category: 'Dresses',
    description: 'Beautiful handwoven traditional Ethiopian dress with intricate patterns',
    image: '/image1.png'
  },
  {
    id: 2,
    name: 'Ethiopian Cotton Scarf',
    price: '$34.99',
    category: 'Accessories',
    description: 'Soft cotton scarf with traditional Ethiopian patterns',
    image: '/image%2012.png'
  },
  {
    id: 3,
    name: 'Handwoven Tunic',
    price: '$79.99',
    category: 'Tops',
    description: 'Comfortable tunic made from handwoven Ethiopian fabric',
    image: '/image%2013.png'
  },
  {
    id: 4,
    name: 'Traditional Netela',
    price: '$59.99',
    category: 'Wraps',
    description: 'Authentic netela wrap, perfect for ceremonies and daily wear',
    image: '/image%2014.png'
  },
  {
    id: 5,
    name: 'Embroidered Shirt',
    price: '$69.99',
    category: 'Tops',
    description: 'Elegant shirt with traditional Ethiopian embroidery',
    image: '/image%2015.png'
  },
  {
    id: 6,
    name: 'Habesha Wedding Dress',
    price: '$149.99',
    category: 'Dresses',
    description: 'Stunning wedding dress with traditional Habesha design',
    image: '/image%2016.png'
  },
  {
    id: 7,
    name: 'Cotton Gabi',
    price: '$94.99',
    category: 'Wraps',
    description: 'Warm and comfortable cotton gabi wrap',
    image: '/image%2017.png'
  },
  {
    id: 8,
    name: 'Traditional Headwrap',
    price: '$29.99',
    category: 'Accessories',
    description: 'Beautiful headwrap with traditional Ethiopian patterns',
    image: '/image%2018.png'
  },
  {
    id: 9,
    name: "Men's Traditional Shirt",
    price: '$64.99',
    category: 'Tops',
    description: 'Classic traditional shirt for men with authentic design',
    image: '/image%2019.png'
  },
  {
    id: 10,
    name: 'Silk Habesha Dress',
    price: '$129.99',
    category: 'Dresses',
    description: 'Luxurious silk dress with traditional Habesha design',
    image: '/image%2020.png'
  },
  {
    id: 11,
    name: 'Woven Shawl',
    price: '$44.99',
    category: 'Accessories',
    description: 'Handwoven shawl with traditional Ethiopian patterns',
    image: '/image%2021.png'
  },
  {
    id: 12,
    name: 'Traditional Kuta',
    price: '$84.99',
    category: 'Wraps',
    description: 'Authentic kuta wrap with traditional design',
    image: '/image%2022.png'
  },
];

const Products: React.FC = () => {
  const cart = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addingId, setAddingId] = useState<number | null>(null);
  const [addedId, setAddedId] = useState<number | null>(null);
  // Maps product name -> real MongoDB _id, filled in quietly once the backend responds.
  const [backendIds, setBackendIds] = useState<Record<string, string>>({});

  // Sync with the backend in the background so "Add to Cart" has real product ids to work with.
  // The page itself never waits on this — products above render immediately.
  useEffect(() => {
    const syncBackendIds = async () => {
      try {
        const res = await fetch(`${API_BASE}/products?limit=100`);
        const json = await res.json();
        const data = json.data ?? json ?? [];
        const map: Record<string, string> = {};
        data.forEach((p: any) => {
          if (p?.name && p?._id) map[p.name] = p._id;
        });
        setBackendIds(map);
      } catch (err) {
        // Silent: the storefront still works, cart calls will just retry per-click.
        console.error('Could not sync product ids from backend', err);
      }
    };
    syncBackendIds();
  }, []);

  const handleAddToCart = async (product: typeof products[number]) => {
    const backendId = backendIds[product.name];
    if (!backendId) {
      setAddingId(product.id);
      try {
        // Not synced yet — try once more directly before giving up.
        const res = await fetch(`${API_BASE}/products?search=${encodeURIComponent(product.name)}`);
        const json = await res.json();
        const match = (json.data ?? [])[0];
        if (!match?._id) {
          console.error(`No backend product found for "${product.name}" yet`);
          return;
        }
        setBackendIds(prev => ({ ...prev, [product.name]: match._id }));
        await addProductToCart(match._id, product);
      } catch (err) {
        console.error('Failed to add to cart', err);
      } finally {
        setAddingId(null);
      }
      return;
    }
    await addProductToCart(backendId, product);
  };

  const addProductToCart = async (backendId: string, product: typeof products[number]) => {
    setAddingId(product.id);
    try {
      const price = parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0;
      await cart.addToCart({
        _id: backendId,
        name: product.name,
        price,
        image: product.image
      });
      setAddedId(product.id);
      setTimeout(() => setAddedId(current => current === product.id ? null : current), 1400);
    } catch (err) {
      console.error('Failed to add to cart', err);
    } finally {
      setAddingId(null);
    }
  };

  // Get unique categories
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="products-page">
      {/* Header */}
      <div className="products-header">
        <h2 className="products-title">
          Oris Habesha <span className="highlight">Cloth Store</span>
        </h2>
        <p className="products-subtitle">Our Products</p>
      </div>
      <ColorStrip color="#FFF3E0" className="gap-bottom" />

      {/* Search and Filter */}
      <div className="products-search-filter">
        <div className="products-search-box">
          <svg 
            className="products-search-icon"
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
            className="products-search-input"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="products-category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`products-category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, idx) => {
            const isAdding = addingId === product.id;
            const isAdded = addedId === product.id;
            return (
              <div key={product.id} className="products-card">
                <div className="products-image-placeholder">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="products-image"
                  />
                  <div className="products-overlay">
                    <p>{product.description}</p>
                  </div>
                </div>
                <ColorStrip color={idx % 2 === 0 ? '#F2E8FF' : '#E8F8F0'} className="gap-top" />
                <div className="products-info">
                  <h3 className="products-name">{product.name}</h3>
                  <p className="products-description">{product.description}</p>
                  <div className="products-bottom">
                    <p className="products-price">{product.price}</p>
                    <button
                      className={`products-add-btn ${isAdded ? 'added' : ''}`}
                      disabled={isAdding}
                      onClick={() => handleAddToCart(product)}
                    >
                      {isAdding ? 'Adding…' : isAdded ? 'Added ✓' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="products-no-results">
            <p>No products found matching your search.</p>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="products-count">
        Showing {filteredProducts.length} of {products.length} products
      </div>
    </section>
  );
};

export default Products;