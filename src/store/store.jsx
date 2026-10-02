import React, { createContext, useContext, useState } from 'react';
import { MOCK_USERS, MOCK_SELLERS, MOCK_CATEGORIES, MOCK_PRODUCTS, MOCK_ORDERS, MOCK_NOTIFICATIONS } from '../api/mockData';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(MOCK_USERS[0]);
  const [currentRole, setCurrentRole] = useState('customer');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to landing page when not logged in
  const [users, setUsers] = useState(MOCK_USERS);
  const [sellers] = useState(MOCK_SELLERS);
  const [categories] = useState(MOCK_CATEGORIES);
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [cart, setCart] = useState({
    items: [],
    totals: { subtotal: 0, discount: 0, tax: 0, shipping: 0, grandTotal: 0 }
  });
  const [wishlist, setWishlist] = useState(['prod-1', 'prod-3']);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [highContrast, setHighContrast] = useState(false);

  const setRole = (role) => {
    setCurrentRole(role);
    const u = users.find(user => user.role === role) || users[0];
    setCurrentUser(u);
    setIsLoggedIn(true);
  };

  const registerUser = (name, email, password, role) => {
    const newUser = {
      id: `u-${role}-${Date.now()}`,
      name,
      email,
      phone: '+919876543210',
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      status: 'active',
      addresses: [
        {
          id: 'addr-1',
          name,
          phone: '+919876543210',
          addressLine1: 'Main Street',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560001',
          isDefault: true,
          label: 'Home'
        }
      ],
      createdAt: new Date().toISOString()
    };
    setUsers([newUser, ...users]);
    setCurrentUser(newUser);
    setCurrentRole(role);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const toggleHighContrast = () => setHighContrast(!highContrast);

  const addToCart = (productId, sku, sellerId, qty, price) => {
    setCart(prev => {
      const items = [...prev.items];
      const existing = items.find(i => i.productId === productId && i.sku === sku);
      if (existing) {
        existing.qty += qty;
      } else {
        items.push({ productId, sku, sellerId, qty, priceSnapshot: price });
      }
      const subtotal = items.reduce((sum, item) => sum + (item.priceSnapshot * item.qty), 0);
      const tax = Math.round(subtotal * 0.18);
      const shipping = items.length > 0 ? 50 : 0;
      const grandTotal = subtotal + tax + shipping;
      return { items, totals: { subtotal, discount: 0, tax, shipping, grandTotal } };
    });
  };

  const removeFromCart = (productId, sku) => {
    setCart(prev => {
      const items = prev.items.filter(i => !(i.productId === productId && i.sku === sku));
      const subtotal = items.reduce((sum, item) => sum + (item.priceSnapshot * item.qty), 0);
      const tax = Math.round(subtotal * 0.18);
      const shipping = items.length > 0 ? 50 : 0;
      const grandTotal = subtotal + tax + shipping;
      return { items, totals: { subtotal, discount: 0, tax, shipping, grandTotal } };
    });
  };

  const updateCartQty = (productId, sku, qty) => {
    setCart(prev => {
      const items = prev.items.map(item => item.productId === productId && item.sku === sku ? { ...item, qty: Math.max(1, qty) } : item);
      const subtotal = items.reduce((sum, item) => sum + (item.priceSnapshot * item.qty), 0);
      const tax = Math.round(subtotal * 0.18);
      const shipping = items.length > 0 ? 50 : 0;
      const grandTotal = subtotal + tax + shipping;
      return { items, totals: { subtotal, discount: 0, tax, shipping, grandTotal } };
    });
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const placeOrder = (shippingAddressId, paymentMethod) => {
    const newId = `ord-${Date.now()}`;
    const newOrderNo = `MH-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const newOrd = {
      id: newId,
      orderNo: newOrderNo,
      customerId: currentUser.id,
      shippingAddress: currentUser.addresses[0] || { name: currentUser.name, addressLine1: 'MG Road', city: 'Bengaluru', pincode: '560001' },
      items: cart.items.map((ci, idx) => ({
        id: `item-${newId}-${idx}`,
        orderId: newId,
        productId: ci.productId,
        sku: ci.sku,
        sellerId: ci.sellerId,
        qty: ci.qty,
        unitPrice: ci.priceSnapshot,
        tax: Math.round(ci.priceSnapshot * ci.qty * 0.18),
        status: 'pending'
      })),
      totals: { ...cart.totals },
      status: 'placed',
      placedAt: new Date().toISOString()
    };

    setOrders(prev => [newOrd, ...prev]);
    setCart({ items: [], totals: { subtotal: 0, discount: 0, tax: 0, shipping: 0, grandTotal: 0 } });
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        userId: currentUser.id,
        type: 'order',
        title: 'Order Placed Successfully!',
        body: `Order ${newOrderNo} has been placed successfully.`,
        icon: 'ShoppingBag',
        read: false,
        createdAt: new Date().toISOString()
      },
      ...prev
    ]);
    return newOrd;
  };

  const addProduct = (prodData) => {
    const newP = {
      id: `prod-${Date.now()}`,
      sellerId: prodData.sellerId || currentUser.id,
      categoryId: prodData.categoryId || 'cat-1',
      title: prodData.title || 'New Product',
      slug: (prodData.title || 'new-product').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: prodData.description || 'Quality product description',
      images: prodData.images || ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'],
      brand: prodData.brand || 'MarketHive',
      variants: [{ sku: `SKU-${Date.now()}`, price: prodData.basePrice || 999, mrp: (prodData.basePrice || 999) * 1.3, stock: 50 }],
      basePrice: prodData.basePrice || 999,
      mrp: (prodData.basePrice || 999) * 1.3,
      taxPct: 18,
      status: 'active',
      ratingAvg: 4.5,
      ratingCount: 10
    };
    setProducts(prev => [newP, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <StoreContext.Provider value={{
      currentUser, currentRole, isLoggedIn, users, sellers, categories, products, orders,
      cart, wishlist, notifications, highContrast, setRole, toggleHighContrast,
      addToCart, removeFromCart, updateCartQty, toggleWishlist, placeOrder,
      addProduct, markNotificationRead, registerUser, logout
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
