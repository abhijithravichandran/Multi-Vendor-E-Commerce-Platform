export type UserRole = 'customer' | 'seller' | 'delivery' | 'admin';

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  label: 'Home' | 'Work' | 'Other';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  status: 'active' | 'blocked' | 'pending';
  addresses: Address[];
  createdAt: string;
}

export interface BankAccount {
  holder: string;
  number: string;
  ifsc: string;
}

export interface Seller {
  id: string;
  userId: string;
  storeName: string;
  storeSlug: string;
  logo: string;
  banner: string;
  gstin: string;
  pan: string;
  bankAccount: BankAccount;
  pickupAddress: Address;
  kycStatus: 'pending' | 'approved' | 'rejected' | 'resubmit';
  adminRemarks?: string;
  commissionPct: number;
  rating: number;
  payoutBalance: number;
  holidayMode?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  icon: string;
  commissionPct: number;
  attributeSchema: {
    key: string;
    label: string;
    type: 'text' | 'number' | 'select' | 'boolean';
    options?: string[];
  }[];
}

export interface ProductVariant {
  sku: string;
  options: Record<string, string>;
  price: number;
  mrp: number;
  stock: number;
}

export interface Product {
  id: string;
  sellerId: string;
  categoryId: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  brand: string;
  attributes: Record<string, any>;
  variants: ProductVariant[];
  basePrice: number;
  mrp: number;
  taxPct: number;
  status: 'draft' | 'pending_review' | 'active' | 'rejected' | 'out_of_stock' | 'archived';
  adminRemarks?: string;
  ratingAvg: number;
  ratingCount: number;
  tags: string[];
}

export interface Inventory {
  id: string;
  productId: string;
  sku: string;
  sellerId: string;
  qtyAvailable: number;
  qtyReserved: number;
  lowStockThreshold: number;
  warehouse: string;
}

export interface CartItem {
  productId: string;
  sku: string;
  sellerId: string;
  qty: number;
  priceSnapshot: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  couponCode?: string;
  totals: {
    subtotal: number;
    discount: number;
    tax: number;
    shipping: number;
    grandTotal: number;
  };
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  sku: string;
  sellerId: string;
  qty: number;
  unitPrice: number;
  tax: number;
  status: 'pending' | 'accepted' | 'packed' | 'shipped' | 'delivered' | 'cancelled' | 'return_requested' | 'returned' | 'refunded';
  shipmentId?: string;
}

export interface Order {
  id: string;
  orderNo: string;
  customerId: string;
  shippingAddress: Address;
  billingAddress: Address;
  items: OrderItem[];
  paymentId: string;
  couponCode?: string;
  totals: {
    subtotal: number;
    discount: number;
    tax: number;
    shipping: number;
    grandTotal: number;
  };
  status: 'placed' | 'confirmed' | 'partially_shipped' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'returned';
  placedAt: string;
}

export interface Payment {
  id: string;
  orderId: string;
  method: 'upi' | 'card' | 'netbanking' | 'wallet' | 'cod';
  status: 'pending' | 'authorized' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';
  txnRef: string;
  amount: number;
  paidAt?: string;
}

export interface ShipmentTimeline {
  status: string;
  ts: string;
  note: string;
  geo?: string;
}

export interface Shipment {
  id: string;
  orderId: string;
  sellerId: string;
  deliveryPartnerId?: string;
  awb: string;
  items: string[];
  status: 'created' | 'pickup_scheduled' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed' | 'rto';
  timeline: ShipmentTimeline[];
  otp: string;
  codAmount: number;
}

export interface Review {
  id: string;
  productId: string;
  orderItemId: string;
  customerId: string;
  rating: number;
  title: string;
  body: string;
  images: string[];
  status: 'pending' | 'published' | 'flagged' | 'removed';
  sellerReply?: {
    text: string;
    ts: string;
  };
  helpfulCount: number;
}

export interface Coupon {
  id: string;
  code: string;
  scope: 'platform' | 'seller';
  sellerId?: string;
  type: 'percent' | 'flat' | 'free_shipping';
  value: number;
  maxDiscount: number;
  minOrderValue: number;
  usageLimit: number;
  perUserLimit: number;
  validFrom: string;
  validTo: string;
  applicableCategories: string[];
  status: 'active' | 'expired' | 'disabled';
}

export interface ReturnRequest {
  id: string;
  orderItemId: string;
  customerId: string;
  sellerId: string;
  reason: string;
  description: string;
  images: string[];
  type: 'refund' | 'replacement';
  status: 'requested' | 'approved' | 'rejected' | 'pickup_scheduled' | 'picked_up' | 'received' | 'refunded' | 'replaced' | 'disputed';
  refundAmount: number;
  timeline: ShipmentTimeline[];
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  body: string;
  icon: string;
  deepLink?: string;
  read: boolean;
  createdAt: string;
  priority: 'low' | 'normal' | 'high' | 'critical';
}
