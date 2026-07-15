import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();

const products = [
  {
    name: 'Traditional Habesha Dress',
    description: 'Beautiful handwoven traditional Ethiopian dress with intricate patterns',
    price: 89.99,
    category: 'Dresses',
    stock: 10,
    sizes: ['S', 'M', 'L'],
    colors: ['White', 'Red', 'Gold'],
    images: [{ url: 'placeholder' }]
  },
  {
    name: 'Ethiopian Cotton Scarf',
    description: 'Soft cotton scarf with traditional Ethiopian patterns',
    price: 34.99,
    category: 'Accessories',
    stock: 20,
    sizes: ['One Size'],
    colors: ['Multi-color'],
    images: [{ url: 'placeholder' }]
  },
  {
    name: 'Handwoven Tunic',
    description: 'Comfortable tunic made from handwoven Ethiopian fabric',
    price: 79.99,
    category: 'Tops',
    stock: 15,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Green'],
    images: [{ url: 'placeholder' }]
  },
  {
    name: 'Traditional Netela',
    description: 'Authentic netela wrap, perfect for ceremonies and daily wear',
    price: 59.99,
    category: 'Wraps',
    stock: 12,
    sizes: ['One Size'],
    colors: ['White', 'Gold'],
    images: [{ url: 'placeholder' }]
  },
  {
    name: 'Embroidered Shirt',
    description: 'Elegant shirt with traditional Ethiopian embroidery',
    price: 69.99,
    category: 'Tops',
    stock: 18,
    sizes: ['S', 'M', 'L'],
    colors: ['White', 'Cream'],
    images: [{ url: 'placeholder' }]
  },
  {
    name: 'Habesha Wedding Dress',
    description: 'Stunning wedding dress with traditional Habesha design',
    price: 149.99,
    category: 'Dresses',
    stock: 5,
    sizes: ['S', 'M', 'L'],
    colors: ['White', 'Gold'],
    images: [{ url: 'placeholder' }]
  },
  {
    name: 'Cotton Gabi',
    description: 'Warm and comfortable cotton gabi wrap',
    price: 94.99,
    category: 'Wraps',
    stock: 14,
    sizes: ['One Size'],
    colors: ['White'],
    images: [{ url: 'placeholder' }]
  },
  {
    name: 'Traditional Headwrap',
    description: 'Beautiful headwrap with traditional Ethiopian patterns',
    price: 29.99,
    category: 'Accessories',
    stock: 25,
    sizes: ['One Size'],
    colors: ['Multi-color'],
    images: [{ url: 'placeholder' }]
  },
  {
    name: "Men's Traditional Shirt",
    description: 'Classic traditional shirt for men with authentic design',
    price: 64.99,
    category: 'Tops',
    stock: 16,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Cream'],
    images: [{ url: 'placeholder' }]
  },
  {
    name: 'Silk Habesha Dress',
    description: 'Luxurious silk dress with traditional Habesha design',
    price: 129.99,
    category: 'Dresses',
    stock: 8,
    sizes: ['S', 'M', 'L'],
    colors: ['White', 'Gold'],
    images: [{ url: 'placeholder' }]
  },
  {
    name: 'Woven Shawl',
    description: 'Handwoven shawl with traditional Ethiopian patterns',
    price: 44.99,
    category: 'Accessories',
    stock: 20,
    sizes: ['One Size'],
    colors: ['Multi-color'],
    images: [{ url: 'placeholder' }]
  },
  {
    name: 'Traditional Kuta',
    description: 'Authentic kuta wrap with traditional design',
    price: 84.99,
    category: 'Wraps',
    stock: 11,
    sizes: ['One Size'],
    colors: ['White', 'Gold'],
    images: [{ url: 'placeholder' }]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Cleared existing data');

    // Insert products
    await Product.insertMany(products);
    console.log('✅ Products seeded successfully');

    // Create admin user
    await User.create({
      name: 'Admin',
      email: 'admin@oris.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('✅ Admin user created: admin@oris.com / admin123');

    process.exit();
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();