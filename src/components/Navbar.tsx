import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bounce, setBounce] = useState(false);

  const isActive = (path: string) => location.pathname === path ? 'active' : '';
  const closeMenu = () => setMenuOpen(false);

  // Bounce the badge every time the cart changes (item added/removed/updated)
  useEffect(() => {
    if (cart.bump === 0) return;
    setBounce(true);
    const t = setTimeout(() => setBounce(false), 420);
    return () => clearTimeout(t);
  }, [cart.bump]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-brand" onClick={closeMenu}>
          <img src="/logo.png" alt="Oris logo" className="nav-logo" />
          <span>Oris</span>
        </Link>

        <button className={`nav-mobile-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/')}`} onClick={closeMenu}>
            Home
          </Link>
          <Link to="/products" className={`nav-link ${isActive('/products')}`} onClick={closeMenu}>
            Products
          </Link>
          <Link to="/store" className={`nav-link ${isActive('/store')}`} onClick={closeMenu}>
            Store
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about')}`} onClick={closeMenu}>
            About Us
          </Link>
          <Link
            to="/cart"
            className={`nav-cart-link ${isActive('/cart')}`}
            onClick={closeMenu}
            aria-label={`Cart with ${cart.cartCount} item${cart.cartCount === 1 ? '' : 's'}`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cart.cartCount > 0 && (
              <span className={`nav-cart-badge ${bounce ? 'bump' : ''}`}>{cart.cartCount}</span>
            )}
          </Link>
          {auth && auth.user ? (
            <div className="nav-auth">
              <span className="nav-user">Hello, {auth.user.name}</span>
              <button className="nav-logout" onClick={() => { auth.logout(); closeMenu(); }}>
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className={`nav-link auth-cta ${isActive('/auth')}`}
              onClick={closeMenu}
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;