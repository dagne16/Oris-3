import React, { createContext, useState, useEffect, useContext, useCallback, ReactNode, useRef } from 'react';
import { API_BASE } from '../api/client';
import AuthContext from './AuthContext';

export type CartLineItem = {
  key: string;          // unique key: productId + size + color
  productId: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  size?: string;
  color?: string;
};

type AddToCartInput = {
  _id: string;
  name: string;
  price: number;
  image?: string;
  size?: string;
  color?: string;
};

type CartContextType = {
  items: CartLineItem[];
  cartCount: number;      // total number of units across all products
  totalPrice: number;
  loading: boolean;
  isGuest: boolean;
  bump: number;           // increments every time the cart changes, used to trigger badge animation
  addToCart: (product: AddToCartInput, quantity?: number) => Promise<void>;
  updateQuantity: (key: string, quantity: number) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  clearCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType>({
  items: [],
  cartCount: 0,
  totalPrice: 0,
  loading: false,
  isGuest: true,
  bump: 0,
  addToCart: async () => {},
  updateQuantity: async () => {},
  removeItem: async () => {},
  clearCart: async () => {}
});

const GUEST_KEY = 'oris_guest_cart';
const lineKey = (productId: string, size?: string, color?: string) => `${productId}::${size ?? ''}::${color ?? ''}`;

const readGuestCart = (): CartLineItem[] => {
  try {
    const raw = localStorage.getItem(GUEST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeGuestCart = (items: CartLineItem[]) => {
  localStorage.setItem(GUEST_KEY, JSON.stringify(items));
};

// Normalize a server cart (populated with product docs) into flat line items
const normalizeServerCart = (cart: any): CartLineItem[] => {
  if (!cart?.items) return [];
  return cart.items.map((item: any) => {
    const product = item.product ?? {};
    const image = product.images && product.images.length && product.images[0].url
      ? product.images[0].url
      : undefined;
    return {
      key: lineKey(product._id ?? item.product, item.size, item.color),
      productId: product._id ?? item.product,
      name: product.name ?? 'Product',
      price: item.price ?? product.price ?? 0,
      image,
      quantity: item.quantity,
      size: item.size,
      color: item.color
    };
  });
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useContext(AuthContext);
  const token = auth?.token ?? null;

  const [items, setItems] = useState<CartLineItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [bump, setBump] = useState(0);
  const hasMergedRef = useRef(false);

  const triggerBump = () => setBump(b => b + 1);

  const fetchServerCart = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (res.ok) {
        setItems(normalizeServerCart(json.data));
      }
    } catch (err) {
      console.error('Failed to fetch cart', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Merge any guest cart items into the backend cart once the user logs in
  const mergeGuestCartIntoServer = useCallback(async () => {
    if (!token) return;
    const guestItems = readGuestCart();
    if (guestItems.length === 0) {
      await fetchServerCart();
      return;
    }
    setLoading(true);
    try {
      for (const gi of guestItems) {
        await fetch(`${API_BASE}/cart/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            productId: gi.productId,
            quantity: gi.quantity,
            size: gi.size,
            color: gi.color
          })
        });
      }
      writeGuestCart([]);
    } catch (err) {
      console.error('Failed to merge guest cart', err);
    } finally {
      await fetchServerCart();
    }
  }, [token, fetchServerCart]);

  useEffect(() => {
    if (token) {
      if (!hasMergedRef.current) {
        hasMergedRef.current = true;
        mergeGuestCartIntoServer();
      } else {
        fetchServerCart();
      }
    } else {
      hasMergedRef.current = false;
      setItems(readGuestCart());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const addToCart = useCallback(async (product: AddToCartInput, quantity: number = 1) => {
    if (token) {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/cart/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            productId: product._id,
            quantity,
            size: product.size,
            color: product.color
          })
        });
        const json = await res.json();
        if (res.ok) {
          setItems(normalizeServerCart(json.data));
          triggerBump();
        } else {
          throw new Error(json.message || 'Failed to add to cart');
        }
      } finally {
        setLoading(false);
      }
    } else {
      const key = lineKey(product._id, product.size, product.color);
      setItems(prev => {
        const existing = prev.find(i => i.key === key);
        let next: CartLineItem[];
        if (existing) {
          next = prev.map(i => i.key === key ? { ...i, quantity: i.quantity + quantity } : i);
        } else {
          next = [...prev, {
            key,
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
            size: product.size,
            color: product.color
          }];
        }
        writeGuestCart(next);
        return next;
      });
      triggerBump();
    }
  }, [token]);

  const updateQuantity = useCallback(async (key: string, quantity: number) => {
    const target = items.find(i => i.key === key);
    if (!target) return;

    if (token) {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/cart/${target.productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ quantity })
        });
        const json = await res.json();
        if (res.ok) setItems(normalizeServerCart(json.data));
      } finally {
        setLoading(false);
      }
    } else {
      setItems(prev => {
        const next = quantity <= 0
          ? prev.filter(i => i.key !== key)
          : prev.map(i => i.key === key ? { ...i, quantity } : i);
        writeGuestCart(next);
        return next;
      });
    }
  }, [items, token]);

  const removeItem = useCallback(async (key: string) => {
    const target = items.find(i => i.key === key);
    if (!target) return;

    if (token) {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/cart/${target.productId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        if (res.ok) setItems(normalizeServerCart(json.data));
      } finally {
        setLoading(false);
      }
    } else {
      setItems(prev => {
        const next = prev.filter(i => i.key !== key);
        writeGuestCart(next);
        return next;
      });
    }
  }, [items, token]);

  const clearCart = useCallback(async () => {
    if (token) {
      setLoading(true);
      try {
        await fetch(`${API_BASE}/cart`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        setItems([]);
      } finally {
        setLoading(false);
      }
    } else {
      writeGuestCart([]);
      setItems([]);
    }
  }, [token]);

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.quantity * i.price, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        totalPrice,
        loading,
        isGuest: !token,
        bump,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
