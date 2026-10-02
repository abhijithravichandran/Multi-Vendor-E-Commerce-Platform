export const MOCK_USERS = [
  {
    id: 'u-cust-1',
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    phone: '+919876543210',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    status: 'active',
    addresses: [
      {
        id: 'addr-1',
        name: 'Aarav Sharma',
        phone: '+919876543210',
        addressLine1: 'Flat 402, Sunshine Apartments',
        addressLine2: 'MG Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560001',
        isDefault: true,
        label: 'Home'
      }
    ],
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'u-seller-1',
    name: 'Rajesh Mehta',
    email: 'rajesh@fabindia.com',
    phone: '+919876543211',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    status: 'active',
    addresses: [],
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'u-delivery-1',
    name: 'Suresh Kumar',
    email: 'suresh@markethive.com',
    phone: '+919876543212',
    role: 'delivery',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    status: 'active',
    addresses: [],
    createdAt: '2026-01-12T10:00:00Z'
  },
  {
    id: 'u-admin-1',
    name: 'Priya Admin',
    email: 'admin@markethive.com',
    phone: '+919876543213',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    status: 'active',
    addresses: [],
    createdAt: '2025-12-01T10:00:00Z'
  }
];

export const MOCK_SELLERS = [
  {
    id: 'seller-1',
    userId: 'u-seller-1',
    storeName: 'Royal Ethnic & Apparels',
    storeSlug: 'royal-ethnic',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150',
    banner: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200',
    gstin: '29AAAAA0000A1Z5',
    pan: 'ABCDE1234F',
    bankAccount: { holder: 'Royal Ethnic Pvt Ltd', number: '123456789012', ifsc: 'HDFC0001234' },
    pickupAddress: { id: 'p-addr-1', name: 'Warehouse 1', phone: '+919876543211', addressLine1: 'Indiranagar 100ft Road', city: 'Bengaluru', state: 'Karnataka', pincode: '560038', isDefault: true, label: 'Work' },
    kycStatus: 'approved',
    commissionPct: 10,
    rating: 4.8,
    payoutBalance: 45200
  },
  {
    id: 'seller-2',
    userId: 'u-seller-2',
    storeName: 'TechVibe Gadgets',
    storeSlug: 'techvibe',
    logo: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=150',
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200',
    gstin: '29BBBBB1111B2Z6',
    pan: 'FGHIJ5678K',
    bankAccount: { holder: 'TechVibe India', number: '987654321098', ifsc: 'ICIC0005678' },
    pickupAddress: { id: 'p-addr-2', name: 'TechHub Warehouse', phone: '+919876543222', addressLine1: 'Cyber City Phase 2', city: 'Gurugram', state: 'Haryana', pincode: '122002', isDefault: true, label: 'Work' },
    kycStatus: 'approved',
    commissionPct: 8,
    rating: 4.6,
    payoutBalance: 89000
  },
  {
    id: 'seller-3',
    userId: 'u-seller-3',
    storeName: 'HomeDecor Artisans',
    storeSlug: 'homedecor',
    logo: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=150',
    banner: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200',
    gstin: '27CCCCC2222C3Z7',
    pan: 'KLMNO9012L',
    bankAccount: { holder: 'Artisan Guild', number: '456789012345', ifsc: 'SBIN0004321' },
    pickupAddress: { id: 'p-addr-3', name: 'Artisan Hub', phone: '+919876543233', addressLine1: 'Bandra West', city: 'Mumbai', state: 'Maharashtra', pincode: '400050', isDefault: true, label: 'Work' },
    kycStatus: 'approved',
    commissionPct: 12,
    rating: 4.5,
    payoutBalance: 32000
  }
];

export const MOCK_CATEGORIES = [
  { id: 'cat-1', name: 'Electronics', slug: 'electronics', icon: 'Laptop', commissionPct: 8 },
  { id: 'cat-2', name: 'Fashion & Apparel', slug: 'fashion', icon: 'Shirt', commissionPct: 15 },
  { id: 'cat-3', name: 'Home & Kitchen', slug: 'home-kitchen', icon: 'Home', commissionPct: 12 },
  { id: 'cat-4', name: 'Beauty & Personal Care', slug: 'beauty', icon: 'Sparkles', commissionPct: 12 },
  { id: 'cat-5', name: 'Grocery & Gourmet', slug: 'grocery', icon: 'Apple', commissionPct: 6 }
];

export const MOCK_PRODUCTS = Array.from({ length: 40 }).map((_, index) => {
  const id = `prod-${index + 1}`;
  const sellerId = `seller-${(index % 3) + 1}`;
  const categoryId = `cat-${(index % 5) + 1}`;
  const categories = ['Electronics', 'Fashion & Apparel', 'Home & Kitchen', 'Beauty & Personal Care', 'Grocery & Gourmet'];
  const catName = categories[index % 5];
  
  let title = `${catName} Item ${index + 1}`;
  let brand = 'BrandX';
  let basePrice = Math.floor(Math.random() * 4000) + 499;
  let mrp = Math.floor(basePrice * 1.3);
  let images = [
    `https://images.unsplash.com/photo-${1500000000000 + (index * 123456)}?w=600`,
    `https://images.unsplash.com/photo-${1500000000000 + (index * 654321)}?w=600`
  ];

  if (index % 5 === 0) {
    title = `Wireless Noise-Cancelling Headphones Pro ${index}`;
    brand = 'TechVibe';
    basePrice = 3499;
    mrp = 5999;
    images = ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'];
  } else if (index % 5 === 1) {
    title = `Handcrafted Silk Kurta Set ${index}`;
    brand = 'Royal Ethnic';
    basePrice = 2199;
    mrp = 3999;
    images = ['https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600'];
  } else if (index % 5 === 2) {
    title = `Ceramic Dinnerware Set 16-Pc ${index}`;
    brand = 'Artisans';
    basePrice = 1899;
    mrp = 2999;
    images = ['https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600'];
  } else if (index % 5 === 3) {
    title = `Organic Radiance Face Serum ${index}`;
    brand = 'Glow Labs';
    basePrice = 899;
    mrp = 1499;
    images = ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600'];
  } else {
    title = `Artisanal Kashmiri Saffron 5g ${index}`;
    brand = 'SpiceCo';
    basePrice = 699;
    mrp = 999;
    images = ['https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600'];
  }

  return {
    id,
    sellerId,
    categoryId,
    title,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: `High-quality ${title} sourced directly from verified artisans and manufacturers. Tested for supreme quality, durability, and customer satisfaction.`,
    images,
    brand,
    variants: [{ sku: `SKU-${id}-1`, price: basePrice, mrp, stock: 50 }],
    basePrice,
    mrp,
    taxPct: 18,
    status: 'active',
    ratingAvg: Number((4 + Math.random()).toFixed(1)),
    ratingCount: Math.floor(Math.random() * 200) + 12
  };
});

export const MOCK_ORDERS = Array.from({ length: 25 }).map((_, index) => {
  const id = `ord-${index + 1}`;
  const orderNo = `MH-${2026000 + index + 1}`;
  const prod = MOCK_PRODUCTS[index % MOCK_PRODUCTS.length];
  const unitPrice = prod.basePrice;
  const qty = (index % 3) + 1;
  const subtotal = unitPrice * qty;
  const tax = Math.round(subtotal * 0.18);
  const shipping = 50;
  const grandTotal = subtotal + tax + shipping;

  const statuses = ['placed', 'confirmed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'];
  const status = statuses[index % statuses.length];

  return {
    id,
    orderNo,
    customerId: 'u-cust-1',
    shippingAddress: {
      id: 'addr-1',
      name: 'Aarav Sharma',
      phone: '+919876543210',
      addressLine1: 'Flat 402, Sunshine Apartments',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
      isDefault: true,
      label: 'Home'
    },
    items: [
      {
        id: `item-${index}`,
        orderId: id,
        productId: prod.id,
        sku: prod.variants[0].sku,
        sellerId: prod.sellerId,
        qty,
        unitPrice,
        tax,
        status: status === 'delivered' ? 'delivered' : status === 'shipped' ? 'shipped' : 'packed'
      }
    ],
    totals: { subtotal, discount: 0, tax, shipping, grandTotal },
    status,
    placedAt: new Date(Date.now() - index * 86400000 * 0.5).toISOString()
  };
});

export const MOCK_NOTIFICATIONS = [
  {
    id: 'notif-1',
    userId: 'u-cust-1',
    type: 'order',
    title: 'Order Confirmed!',
    body: 'Your order #MH-2026001 has been confirmed by the seller.',
    icon: 'CheckCircle',
    read: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'notif-2',
    userId: 'u-seller-1',
    type: 'order',
    title: 'New Order Received!',
    body: 'You received a new order #MH-2026002 worth ₹3,499. Please accept within 4 hours.',
    icon: 'ShoppingBag',
    read: false,
    createdAt: new Date().toISOString()
  }
];
