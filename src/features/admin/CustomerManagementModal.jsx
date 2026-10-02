import React, { useState } from 'react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  BarChart3, ShoppingBag, CreditCard, Heart, Star, 
  RotateCcw, HelpCircle, Activity, Eye, TrendingUp, Calendar, 
  Tag, Clock, CheckCircle2, Package
} from 'lucide-react';

export const CustomerManagementModal = ({ customer, onClose, orders = [] }) => {
  const [customerModalTab, setCustomerModalTab] = useState('overview');

  if (!customer) return null;

  // Category breakdown for products viewed
  const categoryViews = [
    { category: 'Fashion & Apparel', views: 128, percentage: 37, color: 'from-fuchsia-500 to-pink-500', icon: '👗' },
    { category: 'Fashion Accessories & Jewelry', views: 86, percentage: 25, color: 'from-amber-400 to-yellow-500', icon: '💍' },
    { category: 'Handloom & Textiles', views: 54, percentage: 16, color: 'from-indigo-500 to-violet-500', icon: '🧵' },
    { category: 'Terracotta & Pottery', views: 42, percentage: 12, color: 'from-emerald-500 to-teal-500', icon: '🏺' },
    { category: 'Brassware & Home Decor', views: 32, percentage: 10, color: 'from-orange-500 to-amber-600', icon: '🪔' }
  ];

  // Monthly payments and spending data
  const monthlySpending = [
    { month: 'Jan', spend: 3200, height: '35%' },
    { month: 'Feb', spend: 4800, height: '52%' },
    { month: 'Mar', spend: 6100, height: '65%' },
    { month: 'Apr', spend: 7400, height: '78%' },
    { month: 'May', spend: 8100, height: '86%' },
    { month: 'Jun', spend: 8850, height: '94%' }
  ];

  // Category spending share
  const categoryOrders = [
    { category: 'Fashion & Apparel', ordersCount: 9, amount: '₹14,500' },
    { category: 'Accessories & Jewelry', ordersCount: 7, amount: '₹11,200' },
    { category: 'Handloom Sarees', ordersCount: 4, amount: '₹7,450' },
    { category: 'Home & Handicrafts', ordersCount: 4, amount: '₹5,300' }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-serif">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-600 text-white font-extrabold flex items-center justify-center text-xl shadow-lg border border-violet-500/30">
              {customer.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-lg text-white">{customer.name}</h3>
                <StatusBadge status={customer.status === 'Active' ? 'delivered' : 'pending'} />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Joined: {customer.joined} · {customer.location} · {customer.email}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Quick Metrics Bar matching User Spec */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-4 bg-slate-900/30 border-b border-slate-800 text-xs">
          <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-slate-400">Total Orders</span>
            <p className="text-lg font-extrabold text-white mt-0.5">{customer.totalOrders}</p>
          </div>
          <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-slate-400">Total Spent</span>
            <p className="text-lg font-extrabold text-violet-400 mt-0.5">₹{customer.totalSpent.toLocaleString()}</p>
          </div>
          <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-slate-400">Total Logins</span>
            <p className="text-lg font-extrabold text-white mt-0.5">{customer.totalLogins}</p>
          </div>
          <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-slate-400">Last Login</span>
            <p className="text-sm font-bold text-emerald-400 mt-0.5">{customer.lastLogin}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 px-6 overflow-x-auto gap-2 py-2 bg-slate-950 text-xs">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'activity', label: 'Activity' },
            { id: 'orders', label: 'Orders' },
            { id: 'payments', label: 'Payments' },
            { id: 'cart', label: 'Cart & Wishlist' },
            { id: 'reviews', label: 'Reviews' },
            { id: 'returns', label: 'Returns' },
            { id: 'support', label: 'Support' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCustomerModalTab(tab.id)}
              className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                customerModalTab === tab.id ? 'bg-violet-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {customerModalTab === 'overview' && (
            <div className="space-y-6">
              {/* Overview Metrics Cards */}
              <div>
                <h4 className="font-bold text-white text-sm mb-3">📈 Overview Analytics & Summary</h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { label: 'Total Orders', val: customer.totalOrders },
                    { label: 'Total Spent', val: `₹${customer.totalSpent.toLocaleString()}` },
                    { label: 'Avg Order Value', val: `₹${customer.avgOrderVal}` },
                    { label: 'Total Logins', val: customer.totalLogins },
                    { label: 'Products Viewed', val: customer.productsViewed },
                    { label: 'Wishlist Items', val: customer.wishlistItems },
                    { label: 'Cart Items', val: customer.cartItems },
                    { label: 'Reviews Given', val: customer.reviewsGiven },
                    { label: 'Returns', val: customer.returns },
                    { label: 'Coupons Used', val: customer.couponsUsed }
                  ].map((item, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800">
                      <span className="text-slate-400 text-[11px]">{item.label}</span>
                      <p className="text-base font-extrabold text-white mt-1">{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* PRODUCTS VIEWED GRAPH FOR FASHION, ACCESSORIES & JEWELRY */}
              <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-violet-400" />
                    <h4 className="font-bold text-white text-sm">Products Viewed Analytics (by Category)</h4>
                  </div>
                  <span className="text-[11px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded-xl">
                    Total: {customer.productsViewed} Views
                  </span>
                </div>

                <p className="text-slate-400">
                  Detailed browsing interest across Fashion, Accessories, Handloom, Pottery and Brassware.
                </p>

                {/* Progress bar visual distribution */}
                <div className="space-y-3 pt-1">
                  {categoryViews.map((cat, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                          <span>{cat.icon}</span> {cat.category}
                        </span>
                        <span className="text-slate-400 font-bold">
                          {cat.views} views ({cat.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className={`h-full bg-gradient-to-r ${cat.color} rounded-full transition-all duration-500`}
                          style={{ width: `${cat.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PAYMENTS & SPENDING TREND GRAPH */}
              <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <h4 className="font-bold text-white text-sm">Monthly Payments & Spending Graph</h4>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-xl">
                    Total: ₹{customer.totalSpent.toLocaleString()}
                  </span>
                </div>

                <div className="h-40 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-800 pb-3">
                  {monthlySpending.map((m, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <span className="text-[10px] text-teal-800 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        ₹{m.spend}
                      </span>
                      <div 
                        className="w-full bg-gradient-to-t from-teal-700 via-[#00c2ae] to-cyan-400 rounded-t-xl transition-all hover:brightness-110 shadow-sm"
                        style={{ height: m.height }}
                      ></div>
                      <span className="text-xs text-slate-400 font-semibold">{m.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {customerModalTab === 'activity' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">🔥 Recent Activity Timeline</h4>
              <div className="space-y-3">
                {[
                  { time: customer.lastLogin, action: 'Logged in to storefront from Chrome (Mobile)' },
                  { time: '8:35 PM', action: 'Viewed “Zari Border Kanjivaram Silk Saree” (Fashion)' },
                  { time: '8:31 PM', action: 'Added “Handmade Kundan Choker Necklace” to cart (Accessories)' },
                  { time: '8:20 PM', action: 'Explored Traditional Fashion & Jewelry category' },
                  { time: 'Yesterday', action: 'Purchased “Handcrafted Terracotta Planter” (₹1,450)' },
                  { time: '3 days ago', action: 'Added “Pure Brass Pooja Urli” to wishlist' },
                  { time: 'Sep 25', action: 'Redeemed coupon FESTIVE20 on Fashion order' }
                ].map((act, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-white flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-violet-400" /> {act.action}
                    </span>
                    <span className="text-slate-400 text-[11px]">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {customerModalTab === 'orders' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm">Purchase History ({customer.totalOrders} Orders)</h4>
                <span className="text-emerald-400 font-bold">22 Completed • 2 Returned</span>
              </div>

              {/* Category-wise Order Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categoryOrders.map((co, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 text-[11px]">{co.category}</span>
                    <p className="text-sm font-extrabold text-white mt-0.5">{co.ordersCount} Orders</p>
                    <p className="text-[11px] text-violet-400 font-semibold">{co.amount}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5">
                {[
                  { orderNo: 'ORD-2026-9481', items: 'Kanjivaram Silk Saree + Matching Bangles', category: 'Fashion & Accessories', amount: '₹4,890', date: 'Oct 01, 2026', status: 'delivered' },
                  { orderNo: 'ORD-2026-9412', items: 'Terracotta Handpainted Planters Set', category: 'Home & Pottery', amount: '₹1,450', date: 'Sep 28, 2026', status: 'delivered' },
                  { orderNo: 'ORD-2026-9380', items: 'Handmade Silver Anklets Pair', category: 'Jewelry & Accessories', amount: '₹2,600', date: 'Sep 20, 2026', status: 'delivered' },
                  { orderNo: 'ORD-2026-9290', items: 'Embroidered Kashmiri Shawl', category: 'Fashion', amount: '₹3,500', date: 'Sep 12, 2026', status: 'delivered' }
                ].map((ord, idx) => (
                  <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white text-sm">{ord.orderNo} — {ord.items}</p>
                      <p className="text-slate-400 mt-0.5">
                        Category: <span className="text-slate-300 font-semibold">{ord.category}</span> • Placed {ord.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-white text-sm">{ord.amount}</span>
                      <StatusBadge status={ord.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {customerModalTab === 'payments' && (
            <div className="space-y-5">
              <h4 className="font-bold text-white text-sm">Payments, Spend & Methods</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Total Lifetime Spend</span>
                  <p className="text-2xl font-extrabold text-violet-400 mt-1">₹{customer.totalSpent.toLocaleString()}</p>
                  <p className="text-[10px] text-emerald-400 mt-1">100% On-time settlements</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Payment Modes Used</span>
                  <p className="text-sm font-bold text-white mt-1">UPI (Google Pay / PhonePe) — 75%</p>
                  <p className="text-xs text-slate-400">Credit Card — 25%</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Refunds Processed</span>
                  <p className="text-2xl font-extrabold text-emerald-400 mt-1">₹2,800</p>
                  <p className="text-[10px] text-slate-400 mt-1">2 returned items refunded</p>
                </div>
              </div>

              {/* Transactions List */}
              <div className="space-y-2">
                <h5 className="font-bold text-slate-300">Recent Payment Transactions</h5>
                {[
                  { txnId: 'TXN-9021849', desc: 'Payment for ORD-2026-9481', mode: 'UPI (GPay)', amount: '₹4,890', date: 'Oct 01, 2026', status: 'Success' },
                  { txnId: 'TXN-9018492', desc: 'Payment for ORD-2026-9412', mode: 'HDFC Credit Card', amount: '₹1,450', date: 'Sep 28, 2026', status: 'Success' },
                  { txnId: 'REF-8492019', desc: 'Refund for returned brass bowl', mode: 'Direct Bank Credit', amount: '₹1,400', date: 'Sep 22, 2026', status: 'Refunded' }
                ].map((txn, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{txn.txnId} — {txn.desc}</p>
                      <p className="text-slate-400">{txn.mode} • {txn.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">{txn.amount}</p>
                      <span className={`text-[10px] font-bold ${txn.status === 'Success' ? 'text-emerald-400' : 'text-cyan-400'}`}>
                        {txn.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {customerModalTab === 'cart' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Current Cart & Saved Wishlist Items</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4 text-violet-400" /> Active Cart ({customer.cartItems} Items)
                    </span>
                    <span className="text-violet-300 font-bold">Total: ₹5,490</span>
                  </div>
                  <div className="space-y-2 text-slate-300">
                    <p className="p-2 bg-slate-950 rounded-xl border border-slate-800">
                      • Handloom Banarasi Silk Saree (₹3,890)
                    </p>
                    <p className="p-2 bg-slate-950 rounded-xl border border-slate-800">
                      • Kundan Studded Jhumkas (₹1,600)
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-rose-400" /> Wishlist ({customer.wishlistItems} Items)
                    </span>
                    <span className="text-slate-400">High Purchase Intent</span>
                  </div>
                  <div className="space-y-2 text-slate-300">
                    <p className="p-2 bg-slate-950 rounded-xl border border-slate-800">
                      • Hand-carved Brass Urli with Bells (₹2,850)
                    </p>
                    <p className="p-2 bg-slate-950 rounded-xl border border-slate-800">
                      • Terracotta Table Lamp (₹1,250)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {customerModalTab === 'reviews' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Customer Reviews & Ratings ({customer.reviewsGiven} Reviews)</h4>
              <div className="space-y-2.5">
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
                    ★★★★★ <span className="text-white text-sm">Stunning silk texture & rich zari!</span>
                  </div>
                  <p className="text-slate-300">"Wore it for festive pooja, received numerous compliments. Real artisan craft."</p>
                  <p className="text-[10px] text-slate-500 mt-1">Reviewed on Handloom Banarasi Saree (Fashion)</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
                    ★★★★★ <span className="text-white text-sm">Perfect match for traditional ethnic wear</span>
                  </div>
                  <p className="text-slate-300">"The necklace has genuine weight and high polish. Came in velvet box."</p>
                  <p className="text-[10px] text-slate-500 mt-1">Reviewed on Handmade Kundan Choker (Accessories)</p>
                </div>
              </div>
            </div>
          )}

          {customerModalTab === 'returns' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Returns & Refunds ({customer.returns} Handled)</h4>
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Return #RET-201 · Order #ORD-2026-8910</p>
                  <p className="text-slate-400">Handloom Kurta · Reason: Blouse size alteration needed</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-xl font-bold">
                  Refunded ₹1,400 to UPI
                </span>
              </div>
            </div>
          )}

          {customerModalTab === 'support' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Customer Support Inquiries & Tickets</h4>
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Ticket #CUST-901 · Delivery ETA confirmation</p>
                  <p className="text-slate-400">Raised for Diwali gift dispatch • Resolved in under 2 hours</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-xl font-bold">
                  Resolved
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
