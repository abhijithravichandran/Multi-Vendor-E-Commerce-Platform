import React, { useState } from 'react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  Layers, Package, ShoppingBag, DollarSign, Users, 
  TrendingUp, Tag, Star, Eye, ArrowRight, Check, Edit, Plus
} from 'lucide-react';

export const CategoryManagementModal = ({ category, onClose, onUpdateStatus }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!category) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-serif">
        {/* Header Card Matching Exact User Spec */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-violet-600/20 text-violet-400 font-extrabold flex items-center justify-center text-2xl border border-violet-500/30">
                {category.icon || '📱'}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-xl text-white">{category.name}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    category.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {category.status === 'Active' ? '✓ Active' : 'Inactive'}
                  </span>
                  <span className="text-xs text-slate-400">Display Priority: #{category.priority || 1}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {category.description || 'Primary marketplace department organizing multi-vendor listings.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateStatus && onUpdateStatus(category.id, category.status === 'Active' ? 'Inactive' : 'Active')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  category.status === 'Active' ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30' : 'bg-emerald-600 text-white hover:bg-emerald-500'
                }`}
              >
                {category.status === 'Active' ? 'Deactivate' : 'Activate'}
              </button>
              <button 
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm ml-2"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Key Category Stat Bar (Products, Orders, Revenue | Views, Sellers, Sub-Categories) */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-3 border-t border-slate-800 text-xs">
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Products</span>
              <p className="text-base font-extrabold text-white mt-0.5">{category.productsCount.toLocaleString()}</p>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Orders</span>
              <p className="text-base font-extrabold text-white mt-0.5">{category.ordersCount.toLocaleString()}</p>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Revenue</span>
              <p className="text-base font-extrabold text-amber-400 mt-0.5">₹{category.revenue}</p>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Views</span>
              <p className="text-base font-extrabold text-white mt-0.5">{category.views.toLocaleString()}</p>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Sellers</span>
              <p className="text-base font-extrabold text-white mt-0.5">{category.sellersCount}</p>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Sub-Categories</span>
              <p className="text-base font-extrabold text-violet-400 mt-0.5">{category.subCategories.length}</p>
            </div>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex border-b border-slate-800 px-6 overflow-x-auto gap-2 py-2 bg-slate-950 text-xs">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'products', label: 'Products' },
            { id: 'subcategories', label: 'Sub-Categories' },
            { id: 'sellers', label: 'Sellers' },
            { id: 'analytics', label: 'Analytics' },
            { id: 'offers', label: 'Offers & Discounts' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-violet-600 text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-white text-sm mb-3">Department Summary & Structure</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                    <span className="text-slate-400">Average Order Value</span>
                    <p className="text-xl font-bold text-white mt-1">₹{category.avgOrderValue || '1,850'}</p>
                  </div>
                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                    <span className="text-slate-400">Conversion Rate</span>
                    <p className="text-xl font-bold text-emerald-400 mt-1">{category.conversionRate || '8.2'}%</p>
                  </div>
                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                    <span className="text-slate-400">Active Campaign</span>
                    <p className="text-xl font-bold text-amber-400 mt-1">{category.activeOffer || 'Up to 30% OFF'}</p>
                  </div>
                </div>
              </div>

              {/* Sub-categories Preview */}
              <div className="space-y-3">
                <h4 className="font-bold text-white text-sm">Managed Sub-Categories ({category.subCategories.length})</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {category.subCategories.map((sub, idx) => (
                    <div key={idx} className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                      <span className="font-bold text-white">{sub.name}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">{sub.count} items</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Top Products in {category.name}</h4>
              <div className="space-y-2">
                {[
                  { name: `Premium ${category.name} Edition A`, seller: 'ABC Enterprises', price: '₹2,490', orders: 420 },
                  { name: `Handcrafted ${category.name} Selection B`, seller: 'Royal Craft Studios', price: '₹1,850', orders: 310 },
                  { name: `Signature ${category.name} Collection C`, seller: 'Artisanal Guild', price: '₹3,200', orders: 195 }
                ].map((p, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{p.name}</p>
                      <p className="text-slate-400">Seller: {p.seller} • Price: {p.price}</p>
                    </div>
                    <span className="text-amber-400 font-bold">{p.orders} sold</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'subcategories' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm">Sub-Categories Breakdown</h4>
                <button className="bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow text-xs">
                  <Plus className="w-3.5 h-3.5" /> Add Sub-Category
                </button>
              </div>
              <div className="space-y-2">
                {category.subCategories.map((sub, i) => (
                  <div key={i} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{sub.name}</p>
                      <p className="text-slate-400">{sub.count} products currently listed • Active</p>
                    </div>
                    <button className="text-violet-400 hover:text-violet-300 font-bold text-xs">Edit</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sellers' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Active Sellers in {category.name} ({category.sellersCount})</h4>
              <div className="space-y-2">
                {['ABC Electronics', 'Royal Rajasthan Handlooms', 'Clay & Craft Pottery Co.', 'Deccan Brass'].map((s, i) => (
                  <div key={i} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <span className="font-bold text-white">{s}</span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">Verified Seller</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Monthly Category Sales Trend</h4>
              <div className="h-40 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-800 pb-3">
                {[
                  { month: 'Jan', val: '4.8L', height: '40%' },
                  { month: 'Feb', val: '6.2L', height: '55%' },
                  { month: 'Mar', val: '7.8L', height: '68%' },
                  { month: 'Apr', val: '9.4L', height: '80%' },
                  { month: 'May', val: '11.2L', height: '90%' },
                  { month: 'Jun', val: '12.8L', height: '100%' }
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[10px] text-amber-300 font-bold opacity-0 group-hover:opacity-100">₹{bar.val}</span>
                    <div className="w-full bg-gradient-to-t from-violet-600 to-amber-400 rounded-t-xl" style={{ height: bar.height }}></div>
                    <span className="text-xs text-slate-400 font-semibold">{bar.month}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'offers' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Category-Level Promotional Campaigns</h4>
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Festive Special (FESTIVE20)</p>
                  <p className="text-slate-400">Flat 20% discount on all items in {category.name} • Active</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-xl font-bold">Active</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
