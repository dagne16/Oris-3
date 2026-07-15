import { API_BASE } from './client';

export type StaticProduct = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

// Shown immediately on page load — no backend dependency, so the store
// always looks populated even if the API/database isn't reachable yet.
export const STATIC_PRODUCTS: StaticProduct[] = [
  {
    id: 1,
    name: 'Traditional Habesha Dress',
    price: 89.99,
    category: 'Dresses',
    description: 'Beautiful handwoven traditional Ethiopian dress with intricate patterns',
    image: '/image1.png'
  },
  {
    id: 2,
    name: 'Ethiopian Cotton Scarf',
    price: 34.99,
    category: 'Accessories',
    description: 'Soft cotton scarf with traditional Ethiopian patterns',
    image: '/image%2012.png'
  },
  {
    id: 3,
    name: 'Handwoven Tunic',
    price: 79.99,
    category: 'Tops',
    description: 'Comfortable tunic made from handwoven Ethiopian fabric',
    image: '/image%2013.png'
  },
  {
    id: 4,
    name: 'Traditional Netela',
    price: 59.99,
    category: 'Wraps',
    description: 'Authentic netela wrap, perfect for ceremonies and daily wear',
    image: '/image%2014.png'
  },
  {
    id: 5,
    name: 'Embroidered Shirt',
    price: 69.99,
    category: 'Tops',
    description: 'Elegant shirt with traditional Ethiopian embroidery',
    image: '/image%2015.png'
  },
  {
    id: 6,
    name: 'Habesha Wedding Dress',
    price: 149.99,
    category: 'Dresses',
    description: 'Stunning wedding dress with traditional Habesha design',
    image: '/image%2016.png'
  },
  {
    id: 7,
    name: 'Cotton Gabi',
    price: 94.99,
    category: 'Wraps',
    description: 'Warm and comfortable cotton gabi wrap',
    image: '/image%2017.png'
  },
  {
    id: 8,
    name: 'Traditional Headwrap',
    price: 29.99,
    category: 'Accessories',
    description: 'Beautiful headwrap with traditional Ethiopian patterns',
    image: '/image%2018.png'
  },
  {
    id: 9,
    name: "Men's Traditional Shirt",
    price: 64.99,
    category: 'Tops',
    description: 'Classic traditional shirt for men with authentic design',
    image: '/image%2019.png'
  },
  {
    id: 10,
    name: 'Silk Habesha Dress',
    price: 129.99,
    category: 'Dresses',
    description: 'Luxurious silk dress with traditional Habesha design',
    image: '/image%2020.png'
  },
  {
    id: 11,
    name: 'Woven Shawl',
    price: 44.99,
    category: 'Accessories',
    description: 'Handwoven shawl with traditional Ethiopian patterns',
    image: '/image%2021.png'
  },
  {
    id: 12,
    name: 'Traditional Kuta',
    price: 84.99,
    category: 'Wraps',
    description: 'Authentic kuta wrap with traditional design',
    image: '/image%2022.png'
  }
];

export type ResolvedProduct = { _id: string; price: number } | null;

// Cache so we only ever hit the backend once per product name, no matter
// how many times "Add to Cart" is clicked.
const resolveCache = new Map<string, Promise<ResolvedProduct>>();

/**
 * Looks up the real backend product (Mongo _id + live price) that matches a
 * static product's name. Only called at "Add to Cart" click time, never on
 * page load, so browsing the store never depends on the API being up.
 */
export function resolveBackendProduct(name: string): Promise<ResolvedProduct> {
  if (!resolveCache.has(name)) {
    const promise = (async (): Promise<ResolvedProduct> => {
      try {
        const res = await fetch(`${API_BASE}/products?search=${encodeURIComponent(name)}&limit=5`);
        if (!res.ok) return null;
        const json = await res.json();
        const list = json.data ?? [];
        const match = list.find((p: any) => p.name === name) ?? list[0];
        return match ? { _id: match._id, price: match.price } : null;
      } catch (err) {
        console.error('Could not reach backend to resolve product', name, err);
        return null;
      }
    })();
    resolveCache.set(name, promise);
  }
  return resolveCache.get(name)!;
}
