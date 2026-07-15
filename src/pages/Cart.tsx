import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';
import ColorStrip from '../components/ColorStrip';
import './Cart.css';

const Cart: React.FC = () => {
  const cart = useContext(CartContext);

  return (
    <section className="cart-page">
      <div className="cart-header">
        <h2 className="cart-title">
          Your <span className="highlight">Cart</span>
        </h2>
        <p className="cart-subtitle">
          {cart.cartCount > 0
            ? `${cart.cartCount} item${cart.cartCount === 1 ? '' : 's'} ready for checkout`
            : 'Your cart is empty'}
        </p>
      </div>
      <ColorStrip color="#FFF3E0" className="gap-bottom" />

      {cart.isGuest && (
        <div className="cart-guest-note">
          You're shopping as a guest. <Link to="/auth">Log in</Link> to save your cart to your account.
        </div>
      )}

      {cart.items.length === 0 ? (
        <div className="cart-empty">
          <p>You haven't added anything yet.</p>
          <Link to="/products" className="cart-continue-btn">Browse Products</Link>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cart.items.map(item => (
              <div key={item.key} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image || '/image1.png'} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  {(item.size || item.color) && (
                    <p className="cart-item-meta">
                      {item.size ? `Size: ${item.size}` : ''}{item.size && item.color ? ' · ' : ''}{item.color ? `Color: ${item.color}` : ''}
                    </p>
                  )}
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-qty">
                  <button
                    className="cart-qty-btn"
                    onClick={() => cart.updateQuantity(item.key, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="cart-qty-value">{item.quantity}</span>
                  <button
                    className="cart-qty-btn"
                    onClick={() => cart.updateQuantity(item.key, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => cart.removeItem(item.key)}
                  aria-label={`Remove ${item.name}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <button className="cart-clear-btn" onClick={() => cart.clearCart()}>
              Clear Cart
            </button>
            <div className="cart-total">
              <span>Total</span>
              <span className="cart-total-value">${cart.totalPrice.toFixed(2)}</span>
            </div>
            <button className="cart-checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
