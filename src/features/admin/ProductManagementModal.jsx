import React, { useState } from 'react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  Package, CheckCircle2, AlertTriangle, XCircle, DollarSign, 
  TrendingUp, Star, Eye, ShoppingCart, Heart, RefreshCcw, 
  BarChart3, Tag, Layers, ArrowUpRight, Check, Ban
} from 'lucide-react';

export const ProductManagementModal = ({ product, onClose, onUpdateStatus }) => {
  const [modalTab, setModalTab] = useState('overview');

  if (!product) return null;

  // Monthly views and sales trend for this product
  const performanceTrend = [
    { month: 'Jan', views: 1800, orders: 120, height: '40%' },
    { month: 'Feb', views: 2400, orders: 165, height: '55%' },
    { month: 'Mar', views: 3100, orders: 210, height: '70%' },
    { month: 'Apr', views: 3900, orders: 260, height: '85%' },
    { month: 'May', views: 4200, orders: 285, height: '92%' },
    { month: 'Jun', views: 4850, orders: 324, height: '100%' }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-serif">
        {/* Header Card Matching Exact Spec */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 shrink-0">
                <img 
                  src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200'} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="font-bold text-xl text-white">{product.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    product.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    product.status === 'Pending Approval' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {product.status === 'Active' ? '✓ Active' : product.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Category: <span className="text-slate-300 font-semibold">{product.category}</span> • Seller: <span className="text-amber-400 font-semibold">{product.sellerName}</span> • SKU: #{product.sku || 'SKU-8921'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {product.status === 'Pending Approval' && (
                <button
                  onClick={() => onUpdateStatus && onUpdateStatus(product.id, 'Active')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow"
                >
                  Approve Product
                </button>
              )}
              {product.status === 'Active' ? (
                <button
                  onClick={() => onUpdateStatus && onUpdateStatus(product.id, 'Blocked')}
                  className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border border-rose-500/30"
                >
                  Block Listing
                </button>
              ) : (
                <button
                  onClick={() => onUpdateStatus && onUpdateStatus(product.id, 'Active')}
                  className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border border-emerald-500/30"
                >
                  Make Active
                </button>
              )}
              <button 
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm ml-2"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Key Metric Bar (Views, Orders, Revenue | Rating, Stock, Returns) */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-3 border-t border-slate-800 text-xs">
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Views</span>
              <p className="text-base font-extrabold text-white mt-0.5">{product.views.toLocaleString()}</p>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Orders</span>
              <p className="text-base font-extrabold text-white mt-0.5">{product.ordersCount.toLocaleString()}</p>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Revenue</span>
              <p className="text-base font-extrabold text-amber-400 mt-0.5">₹{product.revenue}</p>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Rating</span>
              <p className="text-base font-extrabold text-amber-300 mt-0.5">{product.rating} ⭐</p>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Stock</span>
              <p className={`text-base font-extrabold mt-0.5 ${product.stock < 10 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {product.stock}
              </p>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Returns</span>
              <p className="text-base font-extrabold text-white mt-0.5">{product.returnRate}%</p>
            </div>
          </div>
        </div>

        {/* Product Navigation Tabs */}
        <div className="flex border-b border-slate-800 px-6 overflow-x-auto gap-2 py-2 bg-slate-950 text-xs">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'details', label: 'Details & Description' },
            { id: 'inventory', label: 'Inventory' },
            { id: 'pricing', label: 'Pricing & Offers' },
            { id: 'orders', label: 'Orders' },
            { id: 'analytics', label: 'Analytics' },
            { id: 'reviews', label: 'Reviews' },
            { id: 'returns', label: 'Returns' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setModalTab(tab.id)}
              className={`px-4 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                modalTab === tab.id ? 'bg-violet-600 text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {modalTab === 'overview' && (
            <div className="space-y-6">
              {/* Product Analytics Metric Grid */}
              <div>
                <h4 className="font-bold text-white text-sm mb-3">🔥 Product Performance Summary</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Total Views', val: product.views.toLocaleString() },
                    { label: 'Unique Visitors', val: (product.views * 0.72).toFixed(0) },
                    { label: 'Total Orders', val: product.ordersCount.toLocaleString() },
                    { label: 'Units Sold', val: (product.ordersCount * 1.2).toFixed(0) },
                    { label: 'Revenue', val: `₹${product.revenue}` },
                    { label: 'Current Stock', val: `${product.stock} units` },
                    { label: 'Wishlist Adds', val: product.wishlistAdds },
                    { label: 'Cart Adds', val: product.cartAdds },
                    { label: 'Average Rating', val: `⭐ ${product.rating}` },
                    { label: 'Reviews', val: product.reviewsCount },
                    { label: 'Return Rate', val: `${product.returnRate}%` },
                    { label: 'Conversion Rate', val: `${product.conversionRate}%` }
                  ].map((m, i) => (
                    <div key={i} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800">
                      <span className="text-slate-400 text-[11px]">{m.label}</span>
                      <p className="text-base font-extrabold text-white mt-1">{m.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Views and Orders Trend Graph */}
              <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-violet-400" />
                    <h4 className="font-bold text-white text-sm">Monthly Views & Engagement Trend</h4>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-xl">
                    +{product.conversionRate}% Conversion
                  </span>
                </div>

                <div className="h-40 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-800 pb-3">
                  {performanceTrend.map((t, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <span className="text-[10px] text-teal-800 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        {t.views} views
                      </span>
                      <div 
                        className="w-full bg-gradient-to-t from-cyan-600 via-[#00c2ae] to-emerald-400 rounded-t-xl transition-all hover:brightness-110 shadow-sm"
                        style={{ height: t.height }}
                      ></div>
                      <span className="text-xs text-slate-400 font-semibold">{t.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {modalTab === 'details' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Product Specifications & Information</h4>
              <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3 text-slate-300">
                <p><strong className="text-white">Title:</strong> {product.title}</p>
                <p><strong className="text-white">Description:</strong> {product.description || 'Premium quality handcrafted goods crafted by verified marketplace artisans with certified standard materials.'}</p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="text-slate-500">Category & Sub-category</span>
                    <p className="font-semibold text-white mt-0.5">{product.category}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Brand / Maker</span>
                    <p className="font-semibold text-white mt-0.5">{product.brand || product.sellerName}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Weight / Dimensions</span>
                    <p className="font-semibold text-white mt-0.5">{product.weight || '650 grams • Standard'}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Origin</span>
                    <p className="font-semibold text-white mt-0.5">India (Handmade / Verified)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {modalTab === 'inventory' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Inventory & Stock Tracking</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Available Stock</span>
                  <p className="text-2xl font-bold text-white mt-1">{product.stock} Units</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Low Stock Alert Threshold</span>
                  <p className="text-2xl font-bold text-amber-400 mt-1">10 Units</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Stock Status</span>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">
                    {product.stock > 10 ? 'Healthy' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {modalTab === 'pricing' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Pricing, MRP & Active Discounts</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Selling Price</span>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">₹{product.price}</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">MRP</span>
                  <p className="text-2xl font-bold text-slate-400 line-through mt-1">₹{product.mrp}</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Discount Offered</span>
                  <p className="text-2xl font-bold text-amber-400 mt-1">{product.discount}% OFF</p>
                </div>
              </div>
            </div>
          )}

          {modalTab === 'orders' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Order Fulfillment ({product.ordersCount.toLocaleString()} Total Orders)</h4>
              <div className="space-y-2">
                {[
                  { orderNo: 'ORD-9842', customer: 'Vidhya Shri', amount: `₹${product.price}`, date: 'Oct 01, 2026', status: 'delivered' },
                  { orderNo: 'ORD-9810', customer: 'Rahul Sharma', amount: `₹${product.price}`, date: 'Sep 30, 2026', status: 'delivered' },
                  { orderNo: 'ORD-9792', customer: 'Priya Patel', amount: `₹${product.price * 2}`, date: 'Sep 28, 2026', status: 'delivered' }
                ].map((o, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{o.orderNo} — Buyer: {o.customer}</p>
                      <p className="text-slate-400">{o.date} • Total: {o.amount}</p>
                    </div>
                    <StatusBadge status={o.status} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {modalTab === 'analytics' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Conversion Funnel & Analytics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Views</span>
                  <p className="text-lg font-bold text-white mt-1">{product.views.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Cart Adds</span>
                  <p className="text-lg font-bold text-amber-400 mt-1">{product.cartAdds}</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Wishlist Adds</span>
                  <p className="text-lg font-bold text-pink-400 mt-1">{product.wishlistAdds}</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Sales Conversion</span>
                  <p className="text-lg font-bold text-emerald-400 mt-1">{product.conversionRate}%</p>
                </div>
              </div>
            </div>
          )}

          {modalTab === 'reviews' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Customer Ratings ({product.rating} ★ based on {product.reviewsCount} reviews)</h4>
              <div className="space-y-2">
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
                    ★★★★★ <span className="text-white">Authentic & worth every rupee</span>
                  </div>
                  <p className="text-slate-300">"Finish is exceptional, arrived quickly with premium packaging."</p>
                  <span className="text-[10px] text-slate-500">Verified Buyer • 2 days ago</span>
                </div>
              </div>
            </div>
          )}

          {modalTab === 'returns' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Product Returns ({product.returnRate}% Return Rate)</h4>
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Return #RET-842 · Ordered by Amit K.</p>
                  <p className="text-slate-400">Reason: Color shade preference mismatch • Refund settled</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-xl font-bold">Resolved</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
