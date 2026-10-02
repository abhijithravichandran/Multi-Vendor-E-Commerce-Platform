import React, { useState } from 'react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  Store, CheckCircle, Clock, AlertTriangle, XCircle, 
  DollarSign, Package, ClipboardList, TrendingUp, Star, 
  Percent, ArrowRight, User, MapPin, Phone, Mail, FileText, 
  CreditCard, ShieldCheck, Check, Ban
} from 'lucide-react';

export const SellerManagementModal = ({ seller, onClose, onUpdateStatus }) => {
  const [modalTab, setModalTab] = useState('overview');

  if (!seller) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-serif">
        {/* Header Card Matching Exact Spec */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 font-extrabold flex items-center justify-center text-2xl border border-amber-500/30">
                🏪
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-xl text-white">{seller.storeName}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                    seller.kycStatus === 'Verified' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {seller.kycStatus === 'Verified' ? '✓ Verified' : '⏳ Pending KYC'}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    seller.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 
                    seller.status === 'Suspended' ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {seller.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Owner: {seller.ownerName} • Joined {seller.joined} • {seller.city}, India
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {seller.kycStatus !== 'Verified' && (
                <button
                  onClick={() => onUpdateStatus && onUpdateStatus(seller.id, 'Verified', 'Active')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow"
                >
                  Approve KYC
                </button>
              )}
              {seller.status === 'Active' ? (
                <button
                  onClick={() => onUpdateStatus && onUpdateStatus(seller.id, seller.kycStatus, 'Blocked')}
                  className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border border-rose-500/30"
                >
                  Block Seller
                </button>
              ) : (
                <button
                  onClick={() => onUpdateStatus && onUpdateStatus(seller.id, seller.kycStatus, 'Active')}
                  className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border border-emerald-500/30"
                >
                  Unblock Seller
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

          {/* Key Stat Summary Bar (Products, Orders, Revenue | Rating, Returns, Cancellation) */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-3 border-t border-slate-800 text-xs">
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Products</span>
              <p className="text-base font-extrabold text-white mt-0.5">{seller.totalProducts}</p>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Orders</span>
              <p className="text-base font-extrabold text-white mt-0.5">{seller.totalOrders.toLocaleString()}</p>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Revenue</span>
              <p className="text-base font-extrabold text-amber-400 mt-0.5">₹{seller.totalRevenue}</p>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Rating</span>
              <p className="text-base font-extrabold text-amber-300 mt-0.5">{seller.rating} ⭐</p>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Returns</span>
              <p className="text-base font-extrabold text-white mt-0.5">{seller.returnRate}%</p>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Cancellation</span>
              <p className="text-base font-extrabold text-white mt-0.5">{seller.cancellationRate}%</p>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-800 px-6 overflow-x-auto gap-2 py-2 bg-slate-950 text-xs">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'products', label: 'Products' },
            { id: 'inventory', label: 'Inventory' },
            { id: 'orders', label: 'Orders' },
            { id: 'sales', label: 'Sales & Revenue' },
            { id: 'payments', label: 'Payments & Payouts' },
            { id: 'performance', label: 'Performance' },
            { id: 'reviews', label: 'Reviews' },
            { id: 'returns', label: 'Returns' },
            { id: 'activity', label: 'Activity' },
            { id: 'verification', label: 'Verification' },
            { id: 'support', label: 'Support & Disputes' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setModalTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                modalTab === tab.id ? 'bg-amber-600 text-slate-950 shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {modalTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-white text-sm mb-3">🔥 Seller Performance Overview</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Total Products', val: seller.totalProducts },
                    { label: 'Active Products', val: seller.activeProducts },
                    { label: 'Total Orders', val: seller.totalOrders.toLocaleString() },
                    { label: 'Completed Orders', val: seller.completedOrders.toLocaleString() },
                    { label: 'Total Revenue', val: `₹${seller.totalRevenue}` },
                    { label: 'Seller Earnings', val: `₹${seller.sellerEarnings}` },
                    { label: 'Platform Commission', val: `₹${seller.platformCommission}` },
                    { label: 'Average Order Value', val: `₹${seller.avgOrderValue}` },
                    { label: 'Customer Rating', val: `⭐ ${seller.rating}` },
                    { label: 'Cancellation Rate', val: `${seller.cancellationRate}%` },
                    { label: 'Return Rate', val: `${seller.returnRate}%` },
                    { label: 'Pending Payout', val: `₹${seller.pendingPayout}` }
                  ].map((metric, i) => (
                    <div key={i} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800">
                      <span className="text-slate-400 text-[11px]">{metric.label}</span>
                      <p className="text-base font-extrabold text-white mt-1">{metric.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seller Business Details */}
              <div className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-sm">Business Contact & Tax Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300">
                  <div>
                    <span className="text-slate-500">Business Address</span>
                    <p className="font-semibold text-white mt-0.5">{seller.address}, {seller.city}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Contact Email & Phone</span>
                    <p className="font-semibold text-white mt-0.5">{seller.email}</p>
                    <p className="font-semibold text-slate-400">{seller.phone}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">GSTIN & PAN</span>
                    <p className="font-semibold text-white mt-0.5">GSTIN: {seller.gstin}</p>
                    <p className="font-semibold text-slate-400">PAN: {seller.pan}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {modalTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm">Listed Catalog Products ({seller.totalProducts})</h4>
                <span className="text-emerald-400 font-semibold">{seller.activeProducts} Active Listed</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { name: `${seller.storeName} Flagship Product A`, price: '₹1,499', stock: 45, status: 'Active', category: seller.category },
                  { name: `${seller.storeName} Artisan Edition B`, price: '₹2,890', stock: 12, status: 'Active', category: seller.category },
                  { name: `${seller.storeName} Craft Special C`, price: '₹950', stock: 4, status: 'Low Stock', category: seller.category },
                  { name: `${seller.storeName} Heritage Collection D`, price: '₹4,200', stock: 0, status: 'Out of Stock', category: seller.category }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{item.name}</p>
                      <p className="text-slate-400 mt-0.5">Category: {item.category} • Price: {item.price}</p>
                      <span className={`text-[10px] font-bold ${
                        item.stock > 10 ? 'text-emerald-400' : item.stock > 0 ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        Stock: {item.stock} units
                      </span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold ${
                      item.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' :
                      item.status === 'Low Stock' ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {modalTab === 'inventory' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Inventory & Stock Tracking</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Total Stocked Items</span>
                  <p className="text-xl font-bold text-white mt-1">{seller.activeProducts} Items</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Low Stock Alert (&lt;5 units)</span>
                  <p className="text-xl font-bold text-amber-400 mt-1">{seller.lowStockProducts} Items</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Out of Stock</span>
                  <p className="text-xl font-bold text-rose-400 mt-1">{seller.outOfStockProducts} Items</p>
                </div>
              </div>
              <p className="text-slate-400">Automated restock threshold alert is configured for inventory counts below 5 units.</p>
            </div>
          )}

          {modalTab === 'orders' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Order Fulfillment & History ({seller.totalOrders.toLocaleString()} Total Orders)</h4>
              <div className="space-y-2">
                {[
                  { orderNo: 'ORD-9821', item: 'Artisanal Craft Set', amount: '₹2,499', status: 'delivered', date: 'Oct 01, 2026' },
                  { orderNo: 'ORD-9815', item: 'Handmade Planter', amount: '₹1,200', status: 'shipped', date: 'Sep 30, 2026' },
                  { orderNo: 'ORD-9802', item: 'Traditional Textile Piece', amount: '₹3,450', status: 'delivered', date: 'Sep 29, 2026' },
                  { orderNo: 'ORD-9788', item: 'Brass Artifact', amount: '₹1,850', status: 'cancelled', date: 'Sep 28, 2026' }
                ].map((ord, i) => (
                  <div key={i} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{ord.orderNo} — {ord.item}</p>
                      <p className="text-slate-400">{ord.date} • Amount: {ord.amount}</p>
                    </div>
                    <StatusBadge status={ord.status} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {modalTab === 'sales' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Sales & Revenue Breakdown</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Total Gross Merchandise</span>
                  <p className="text-xl font-extrabold text-amber-400 mt-1">₹{seller.totalRevenue}</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Seller Net Earnings</span>
                  <p className="text-xl font-extrabold text-white mt-1">₹{seller.sellerEarnings}</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Platform Commission (10%)</span>
                  <p className="text-xl font-extrabold text-violet-400 mt-1">₹{seller.platformCommission}</p>
                </div>
              </div>
            </div>
          )}

          {modalTab === 'payments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm">Payments, Settlements & Bank Account</h4>
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold shadow text-xs">
                  Release Payout (₹{seller.pendingPayout})
                </button>
              </div>
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                <p className="font-bold text-white">Bank: {seller.bankName}</p>
                <p className="text-slate-300">Account: •••• •••• {seller.accountNo.slice(-4)} • IFSC: {seller.ifsc}</p>
                <p className="text-slate-400">Completed Historical Payouts: ₹{seller.completedPayouts}</p>
              </div>
            </div>
          )}

          {modalTab === 'performance' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Operational Performance & SLA Compliance</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Order Success Rate</span>
                  <p className="text-lg font-extrabold text-emerald-400 mt-1">{seller.successRate}%</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Cancellation Rate</span>
                  <p className="text-lg font-extrabold text-white mt-1">{seller.cancellationRate}%</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Return Rate</span>
                  <p className="text-lg font-extrabold text-white mt-1">{seller.returnRate}%</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Dispatch SLA</span>
                  <p className="text-lg font-extrabold text-amber-300 mt-1">&lt; 24h</p>
                </div>
              </div>
            </div>
          )}

          {modalTab === 'reviews' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Customer Reviews & Feedback ({seller.rating} ★ based on {seller.reviewsCount} reviews)</h4>
              <div className="space-y-2">
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">★★★★★ <span className="text-white">Authentic high quality craftsmanship</span></div>
                  <p className="text-slate-300">"Packed with immense care and arrived faster than promised."</p>
                  <span className="text-[10px] text-slate-500">By Vidhya S. on Oct 01, 2026</span>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">★★★★☆ <span className="text-white">Loved the finish</span></div>
                  <p className="text-slate-300">"Colors match exactly what was displayed on the photos."</p>
                  <span className="text-[10px] text-slate-500">By Rahul S. on Sep 29, 2026</span>
                </div>
              </div>
            </div>
          )}

          {modalTab === 'returns' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Returns & Refunds ({seller.returnRate}% Return Rate)</h4>
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Return #RET-109 • Order #ORD-9801</p>
                  <p className="text-slate-400">Reason: Size mismatch • Refund processed back to customer</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-xl font-bold">Resolved</span>
              </div>
            </div>
          )}

          {modalTab === 'activity' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">🕐 Recent Seller Activity Timeline</h4>
              <div className="space-y-2.5">
                {seller.activity.map((act, i) => (
                  <div key={i} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <span className="font-bold text-white">{act.action}</span>
                    <span className="text-slate-400 text-[11px]">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {modalTab === 'verification' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">KYC Documents & Verification Dossier</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                  <p className="font-bold text-white">GSTIN Certificate</p>
                  <p className="text-slate-400">GSTIN: {seller.gstin}</p>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">Verified & Valid</span>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                  <p className="font-bold text-white">PAN Card Dossier</p>
                  <p className="text-slate-400">PAN: {seller.pan}</p>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">Verified</span>
                </div>
              </div>
            </div>
          )}

          {modalTab === 'support' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Seller Complaints & Dispute Tickets</h4>
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Ticket #SR-492: Commission query for festive sale</p>
                  <p className="text-slate-400">Submitted 2 days ago • Resolution delivered by Admin</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-xl font-bold">Closed</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
