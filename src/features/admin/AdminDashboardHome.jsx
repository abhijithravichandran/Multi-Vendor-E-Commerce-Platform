import React, { useState } from 'react';
import { 
  DollarSign, ShoppingCart, Users, Store, Package, 
  Truck, ArrowUpRight, Clock, AlertTriangle, AlertCircle, 
  CheckCircle2, RefreshCcw, Star, ChevronDown, ArrowRight, 
  TrendingUp, Shield, BarChart3, CreditCard, Tag
} from 'lucide-react';

export const AdminDashboardHome = ({ onNavigate }) => {
  const [timeFilter, setTimeFilter] = useState('today'); // 'today' | '7d' | '30d' | '3m' | '1y'

  // Trend Data for Sales & Revenue in harmonious teal, cyan, and amber gradients
  const chartData = [
    { day: 'Mon', sales: 180000, revenue: 18000, height: '48%', heightRev: '35%' },
    { day: 'Tue', sales: 210000, revenue: 21000, height: '58%', heightRev: '42%' },
    { day: 'Wed', sales: 245000, revenue: 24500, height: '70%', heightRev: '52%' },
    { day: 'Thu', sales: 290000, revenue: 29000, height: '85%', heightRev: '68%' },
    { day: 'Fri', sales: 340000, revenue: 34000, height: '98%', heightRev: '82%' },
    { day: 'Sat', sales: 310000, revenue: 31000, height: '88%', heightRev: '74%' }
  ];

  return (
    <div className="space-y-6 font-serif">
      {/* 1. GREETING & TIMEFRAME HEADER */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Good Morning, Admin 👋
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Here's what's happening on your marketplace today. Real-time platform pulse across India.
          </p>
        </div>

        {/* Time Selector */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-xs font-sans">Period:</span>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-white rounded-xl px-3.5 py-1.5 text-xs font-bold focus:outline-none focus:border-[#00C2AE]"
          >
            <option value="today">Today ▼</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="3m">Last 3 Months</option>
            <option value="1y">This Year</option>
          </select>
        </div>
      </div>

      {/* 2. TOP 6 PRIMARY KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-sans">💰 Sales</span>
            <DollarSign className="w-3.5 h-3.5 text-teal-700" />
          </div>
          <p className="text-xl font-extrabold text-white">₹2.45 L</p>
          <span className="text-[10px] text-teal-700 font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> +12.5% ↑
          </span>
        </div>

        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-sans">💵 Revenue</span>
            <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <p className="text-xl font-extrabold text-amber-500">₹31,500</p>
          <span className="text-[10px] text-teal-700 font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> +10.2% ↑
          </span>
        </div>

        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-sans">🛒 Orders</span>
            <ShoppingCart className="w-3.5 h-3.5 text-cyan-700" />
          </div>
          <p className="text-xl font-extrabold text-white">1,248</p>
          <span className="text-[10px] text-teal-700 font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> +8.2% ↑
          </span>
        </div>

        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-sans">👥 Users</span>
            <Users className="w-3.5 h-3.5 text-sky-700" />
          </div>
          <p className="text-xl font-extrabold text-white">8,420</p>
          <span className="text-[10px] text-teal-700 font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> +5.4% ↑
          </span>
        </div>

        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-sans">🏪 Sellers</span>
            <Store className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <p className="text-xl font-extrabold text-white">324</p>
          <span className="text-[10px] text-teal-700 font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> +3.2% ↑
          </span>
        </div>

        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-sans">📦 Products</span>
            <Package className="w-3.5 h-3.5 text-teal-700" />
          </div>
          <p className="text-xl font-extrabold text-white">1,850</p>
          <span className="text-[10px] text-teal-700 font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> +4.8% ↑
          </span>
        </div>
      </div>

      {/* 3. MAIN ANALYTICS ROW: SALES/REVENUE CHART + ORDER STATUS BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Sales & Revenue Trend Chart */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-white text-base">📈 Sales & Revenue Velocity</h3>
              <p className="text-slate-400 text-[11px] mt-0.5">Marketplace gross sales volume vs retained 10% platform commission.</p>
            </div>
            {/* Quick time toggles */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 font-sans text-[11px] font-bold">
              {['Today', '7 Days', '30 Days', '3 Months', '1 Year'].map(t => (
                <button
                  key={t}
                  onClick={() => setTimeFilter(t.toLowerCase())}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    timeFilter === t.toLowerCase() ? 'bg-[#00C2AE] text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Dual Bars in Teal & Golden Amber */}
          <div className="h-48 flex items-end justify-between gap-4 pt-6 px-4 border-b border-slate-800 pb-3">
            {chartData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="text-[10px] text-teal-800 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹{(d.sales / 1000).toFixed(0)}k
                </div>
                <div className="w-full flex items-end justify-center gap-1.5 h-full">
                  {/* Sales Bar in Teal to Aqua */}
                  <div
                    className="w-1/2 bg-gradient-to-t from-teal-700 via-[#00c2ae] to-cyan-400 rounded-t-lg transition-all hover:brightness-110 shadow-sm"
                    style={{ height: d.height }}
                    title={`Sales: ₹${d.sales.toLocaleString()}`}
                  ></div>
                  {/* Revenue Bar in Warm Amber */}
                  <div
                    className="w-1/3 bg-gradient-to-t from-amber-500 to-amber-300 rounded-t-lg transition-all hover:brightness-110 shadow-sm"
                    style={{ height: d.heightRev }}
                    title={`Revenue: ₹${d.revenue.toLocaleString()}`}
                  ></div>
                </div>
                <span className="text-[11px] text-slate-400 font-semibold">{d.day}</span>
              </div>
            ))}
          </div>

          {/* Chart Legend & Summary Counters */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-[11px]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#00C2AE]"></div>
                <span className="text-slate-300 font-semibold">Total Sales (₹2.45 L)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-amber-400"></div>
                <span className="text-slate-300 font-semibold">Platform Revenue (₹31,500)</span>
              </div>
            </div>
            <span className="text-teal-700 font-bold">+18.4% weekly growth rate</span>
          </div>
        </div>

        {/* Right: Order Status Breakdown matching exact spec */}
        <div className="lg:col-span-4 bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-base">🛒 Order Status</h3>
            <button 
              onClick={() => onNavigate && onNavigate('orders')}
              className="text-[#00C2AE] hover:underline font-bold text-[11px] flex items-center gap-1"
            >
              All Orders <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {[
              { status: 'New', count: 120, total: 1248, color: 'bg-cyan-500', text: 'text-cyan-700' },
              { status: 'Processing', count: 85, total: 1248, color: 'bg-amber-500', text: 'text-amber-700' },
              { status: 'Ready for Pickup', count: 65, total: 1248, color: 'bg-sky-500', text: 'text-sky-700' },
              { status: 'In Transit', count: 60, total: 1248, color: 'bg-[#00C2AE]', text: 'text-teal-700' },
              { status: 'Delivered', count: 920, total: 1248, color: 'bg-emerald-500', text: 'text-emerald-700' },
              { status: 'Cancelled', count: 43, total: 1248, color: 'bg-rose-500', text: 'text-rose-700' },
              { status: 'Returned', count: 15, total: 1248, color: 'bg-rose-400', text: 'text-rose-600' }
            ].map((ord, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-300 font-semibold">{ord.status}</span>
                  <span className={`font-bold ${ord.text}`}>{ord.count}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${ord.color} rounded-full`}
                    style={{ width: `${(ord.count / ord.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. MARKETPLACE PERFORMANCE: TOP SELLERS & TOP PRODUCTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Top Sellers */}
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-base">🏪 Top Sellers</h3>
            <button 
              onClick={() => onNavigate && onNavigate('sellers')}
              className="text-[#00C2AE] hover:underline font-bold text-[11px] flex items-center gap-1"
            >
              View Sellers <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {[
              { name: 'ABC Electronics', orders: 245, sales: '₹82,400', rating: '4.7 ⭐', cat: 'Electronics & Audio' },
              { name: 'Fashion Hub', orders: 210, sales: '₹71,200', rating: '4.6 ⭐', cat: 'Apparel & Silks' },
              { name: 'Royal Rajasthan Handlooms', orders: 190, sales: '₹64,800', rating: '4.5 ⭐', cat: 'Kanjivaram Handloom' },
              { name: 'Deccan Brass & Bronzeware', orders: 160, sales: '₹52,100', rating: '4.8 ⭐', cat: 'Metal Crafts' }
            ].map((s, idx) => (
              <div key={idx} className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white text-xs">{s.name}</p>
                  <p className="text-slate-400 text-[11px]">{s.orders} orders • {s.cat}</p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-teal-800 text-xs">{s.sales}</p>
                  <span className="text-[10px] text-amber-500 font-bold">{s.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-base">📦 Top Products</h3>
            <button 
              onClick={() => onNavigate && onNavigate('products')}
              className="text-[#00C2AE] hover:underline font-bold text-[11px] flex items-center gap-1"
            >
              Catalog <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {[
              { name: 'Wireless ANC Headphones', seller: 'ABC Electronics', sold: 320, rev: '₹48,000' },
              { name: 'Kanjivaram Silk Saree', seller: 'Royal Rajasthan Handlooms', sold: 280, rev: '₹42,000' },
              { name: 'Handmade Kundan Choker', seller: 'Fashion Hub', sold: 245, rev: '₹36,750' },
              { name: 'Terracotta Handcrafted Urli', seller: 'Clay & Craft Pottery Co.', sold: 198, rev: '₹29,700' }
            ].map((p, idx) => (
              <div key={idx} className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white text-xs">{p.name}</p>
                  <p className="text-slate-400 text-[11px]">{p.seller}</p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-white text-xs">{p.sold} sold</p>
                  <span className="text-[10px] text-teal-800 font-bold">{p.rev}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. OPERATIONS: DELIVERY PERFORMANCE & CUSTOMER ACTIVITY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Delivery Performance */}
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-base">🚚 Delivery Performance</h3>
            <button 
              onClick={() => onNavigate && onNavigate('deliveries')}
              className="text-[#00C2AE] hover:underline font-bold text-[11px] flex items-center gap-1"
            >
              Fleet Console <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-slate-400 text-[10px]">Active Deliveries</span>
              <p className="text-lg font-extrabold text-teal-800 mt-0.5">84</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-slate-400 text-[10px]">Completed</span>
              <p className="text-lg font-extrabold text-emerald-700 mt-0.5">920</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-slate-400 text-[10px]">Failed</span>
              <p className="text-lg font-extrabold text-rose-600 mt-0.5">12</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-slate-400 text-[10px]">On-Time Rate</span>
              <p className="text-lg font-extrabold text-teal-700 mt-0.5">94%</p>
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center text-[11px]">
            <span className="text-slate-300">Average Delivery Fulfillment Time:</span>
            <strong className="text-white">32 minutes across metros</strong>
          </div>
        </div>

        {/* Customer Activity */}
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-base">👥 Customer Activity</h3>
            <button 
              onClick={() => onNavigate && onNavigate('users')}
              className="text-[#00C2AE] hover:underline font-bold text-[11px] flex items-center gap-1"
            >
              Users <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-slate-400 text-[10px]">New Customers</span>
              <p className="text-lg font-extrabold text-cyan-700 mt-0.5">125</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-slate-400 text-[10px]">Active Users</span>
              <p className="text-lg font-extrabold text-teal-800 mt-0.5">2,840</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-slate-400 text-[10px]">Returning Users</span>
              <p className="text-lg font-extrabold text-emerald-700 mt-0.5">1,240</p>
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center text-[11px]">
            <span className="text-slate-300">Total Customer Lifetime Spend:</span>
            <strong className="text-teal-800">₹48.5 L (68% Retention)</strong>
          </div>
        </div>
      </div>

      {/* 6. FINANCIAL SUMMARY CARD */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="font-bold text-white text-base">💳 Marketplace Financial Summary</h3>
          <button 
            onClick={() => onNavigate && onNavigate('payments')}
            className="text-[#00C2AE] hover:underline font-bold text-[11px] flex items-center gap-1"
          >
            Payments & Payouts <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {[
            { label: 'Customer Payments', val: '₹2.45 L', color: 'text-white' },
            { label: 'Seller Payouts', val: '₹1.95 L', color: 'text-teal-800' },
            { label: 'Delivery Earnings', val: '₹18,500', color: 'text-sky-700' },
            { label: 'Platform Revenue', val: '₹31,500', color: 'text-amber-500' },
            { label: 'Pending Payouts', val: '₹24,000', color: 'text-amber-600' },
            { label: 'Refunds Processed', val: '₹8,500', color: 'text-rose-600' },
            { label: 'Failed Payments', val: '12', color: 'text-rose-700' }
          ].map((f, idx) => (
            <div key={idx} className="p-3 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] block line-clamp-1">{f.label}</span>
              <p className={`text-base font-extrabold ${f.color}`}>{f.val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 7. ACTION REQUIRED & RETURNS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs">
        {/* Left: Action Required (Direct Clickable Alert Pills) */}
        <div className="md:col-span-8 bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> ⚠️ Action Required
            </h3>
            <span className="text-slate-400 text-[11px]">Click any item to resolve directly</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              onClick={() => onNavigate && onNavigate('inventory')}
              className="p-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-2xl flex items-center justify-between transition-all text-left"
            >
              <span className="font-bold text-rose-700 flex items-center gap-2">
                <span>🔴</span> 12 Products Out of Stock
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-rose-600" />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('sellers')}
              className="p-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-2xl flex items-center justify-between transition-all text-left"
            >
              <span className="font-bold text-amber-700 flex items-center gap-2">
                <span>🟠</span> 18 Seller Verifications Pending
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('returns')}
              className="p-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-2xl flex items-center justify-between transition-all text-left"
            >
              <span className="font-bold text-amber-700 flex items-center gap-2">
                <span>🟠</span> 32 Return Requests Pending
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('payments')}
              className="p-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-2xl flex items-center justify-between transition-all text-left"
            >
              <span className="font-bold text-rose-700 flex items-center gap-2">
                <span>🔴</span> 5 Failed Payouts
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-rose-600" />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('inventory')}
              className="p-3 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-2xl flex items-center justify-between transition-all text-left"
            >
              <span className="font-bold text-yellow-800 flex items-center gap-2">
                <span>🟡</span> 24 Low Stock Products
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-yellow-700" />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('complaints')}
              className="p-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-2xl flex items-center justify-between transition-all text-left"
            >
              <span className="font-bold text-amber-700 flex items-center gap-2">
                <span>🟠</span> 8 Customer Complaints
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
            </button>
          </div>
        </div>

        {/* Right: Returns & Refunds Summary */}
        <div className="md:col-span-4 bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-base">🔄 Returns & Refunds</h3>
            <button 
              onClick={() => onNavigate && onNavigate('returns')}
              className="text-[#00C2AE] hover:underline font-bold text-[11px] flex items-center gap-1"
            >
              Details <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            {[
              { label: 'Return Requests', val: 32 },
              { label: 'Pending Approval', val: 18, color: 'text-amber-700' },
              { label: 'Approved', val: 10, color: 'text-emerald-700' },
              { label: 'Rejected', val: 4, color: 'text-rose-600' }
            ].map((ret, idx) => (
              <div key={idx} className="flex justify-between items-center p-2.5 bg-slate-900 rounded-xl">
                <span className="text-slate-300">{ret.label}</span>
                <strong className={ret.color || 'text-white'}>{ret.val}</strong>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center text-[11px]">
            <span className="text-slate-400">Refunds Processed:</span>
            <strong className="text-teal-800">₹8,500</strong>
          </div>
        </div>
      </div>

      {/* 8. RECENT ACTIVITY (CONNECTED DIRECTLY WITH AUDIT LOGS) */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-white text-base">🕒 Recent Activity</h3>
            <p className="text-slate-400 text-[11px]">Live feed synchronized with audit trails.</p>
          </div>
          <button 
            onClick={() => onNavigate && onNavigate('audit-logs')}
            className="bg-[#00C2AE] hover:bg-teal-600 text-white px-3 py-1.5 rounded-xl font-bold transition-all shadow text-[11px] flex items-center gap-1"
          >
            View All → Audit Logs
          </button>
        </div>

        <div className="space-y-2.5">
          {[
            { time: '10:42 AM', action: 'Admin SuperAdmin approved Seller ABC Electronics (#SR-102)', badge: 'Admin' },
            { time: '10:38 AM', action: 'Seller Fashion Hub added new product "Kanjivaram Silk Saree"', badge: 'Seller' },
            { time: '10:31 AM', action: 'Admin approved refund of ₹5,200 for Order #ORD-4480', badge: 'Refund' },
            { time: '10:25 AM', action: 'Customer Vidhya Shri placed order #ORD-4521 (₹2,499 via UPI)', badge: 'Order' },
            { time: '10:18 AM', action: 'Delivery Partner Ramesh Kumar completed delivery #DEL-501', badge: 'Fleet' },
            { time: '10:10 AM', action: 'Admin updated platform commission settings to 10% flat', badge: 'Settings' }
          ].map((act, idx) => (
            <div key={idx} className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  act.badge === 'Admin' ? 'bg-teal-500/20 text-teal-800' :
                  act.badge === 'Seller' ? 'bg-amber-500/20 text-amber-700' :
                  act.badge === 'Order' ? 'bg-cyan-500/20 text-cyan-700' : 'bg-emerald-500/20 text-emerald-700'
                }`}>
                  {act.badge}
                </span>
                <span className="font-medium text-slate-200">{act.action}</span>
              </div>
              <span className="text-slate-400 font-sans text-[11px] whitespace-nowrap">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
