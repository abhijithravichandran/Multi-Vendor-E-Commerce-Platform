import React, { useState } from 'react';
import { 
  DollarSign, ShoppingCart, Users, Store, Package, 
  TrendingUp, ArrowUpRight, ArrowDownRight, Clock, 
  AlertTriangle, CheckCircle2, ChevronDown, BarChart3, 
  Layers, Truck, RefreshCcw, ShieldCheck, ExternalLink
} from 'lucide-react';

export const DashboardOverview = ({ setActiveTab, setAdminHubSubTab }) => {
  const [timeRange, setTimeRange] = useState('Today');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  // Sales Trend Chart Data adapting to light green theme
  const trendData = [
    { day: 'Mon', sales: 28000, revenue: 3200, heightSales: '48%', heightRev: '35%' },
    { day: 'Tue', sales: 34000, revenue: 4100, heightSales: '58%', heightRev: '42%' },
    { day: 'Wed', sales: 31000, revenue: 3900, heightSales: '52%', heightRev: '38%' },
    { day: 'Thu', sales: 46000, revenue: 5800, heightSales: '78%', heightRev: '60%' },
    { day: 'Fri', sales: 52000, revenue: 6900, heightSales: '90%', heightRev: '72%' },
    { day: 'Sat', sales: 54000, revenue: 7600, heightSales: '96%', heightRev: '78%' }
  ];

  return (
    <div className="space-y-6">
      {/* Greeting Header & Time Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 border border-slate-800 p-6 rounded-3xl shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Good Morning, Admin <span className="inline-block animate-bounce">👋</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Here's what's happening on your marketplace today.
          </p>
        </div>

        {/* Time Selector Dropdown */}
        <div className="relative self-start sm:self-auto">
          <button
            onClick={() => setShowTimeDropdown(!showTimeDropdown)}
            className="flex items-center gap-2 bg-slate-900 border border-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold hover:border-teal-500/50 transition-all shadow-sm"
          >
            <span>{timeRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showTimeDropdown && (
            <div className="absolute right-0 mt-2 w-36 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-1.5 z-40 text-xs">
              {['Today', '7 Days', '30 Days', '3 Months', '1 Year'].map(range => (
                <button
                  key={range}
                  onClick={() => {
                    setTimeRange(range);
                    setShowTimeDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-xl font-medium transition-all ${
                    timeRange === range ? 'bg-[#00c2ae] text-white font-bold' : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 1. 📌 Top 4 KPI Cards (Total Sales, Orders, Customers, Sellers) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Sales */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-3xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Sales</span>
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-teal-700" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <h3 className="text-2xl font-extrabold text-white">₹2.45 L</h3>
            <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-0.5 bg-emerald-500/10 px-2 py-0.5 rounded-lg">
              <ArrowUpRight className="w-3 h-3" /> 12.5%
            </span>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-3xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Orders</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-cyan-700" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <h3 className="text-2xl font-extrabold text-white">1,248</h3>
            <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-0.5 bg-emerald-500/10 px-2 py-0.5 rounded-lg">
              <ArrowUpRight className="w-3 h-3" /> 8.2%
            </span>
          </div>
        </div>

        {/* Customers */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-3xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Customers</span>
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 flex items-center justify-center">
              <Users className="w-4 h-4 text-sky-700" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <h3 className="text-2xl font-extrabold text-white">8,420</h3>
            <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-0.5 bg-emerald-500/10 px-2 py-0.5 rounded-lg">
              <ArrowUpRight className="w-3 h-3" /> 5.4%
            </span>
          </div>
        </div>

        {/* Sellers */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-3xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Sellers</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Store className="w-4 h-4 text-amber-700" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <h3 className="text-2xl font-extrabold text-white">324</h3>
            <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-0.5 bg-emerald-500/10 px-2 py-0.5 rounded-lg">
              <ArrowUpRight className="w-3 h-3" /> 3.2%
            </span>
          </div>
        </div>
      </div>

      {/* 2. 📈 Sales Overview & 🛒 Order Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Overview Chart */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-teal-700" /> Sales Overview
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Weekly volume comparison & revenue growth</p>
            </div>
            <span className="text-xs font-bold text-teal-800 bg-teal-500/10 px-3 py-1 rounded-xl">
              +12.5% Growth
            </span>
          </div>

          {/* Bar Chart Visual */}
          <div className="h-44 flex items-end justify-between gap-3 pt-6 px-3 border-b border-slate-800 pb-3">
            {trendData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <span className="text-[10px] text-teal-800 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹{(d.sales / 1000).toFixed(0)}k
                </span>
                <div className="w-full flex items-end justify-center gap-1 h-full">
                  <div 
                    className="w-1/2 bg-gradient-to-t from-teal-700 via-[#00c2ae] to-cyan-400 rounded-t-lg transition-all shadow-sm hover:brightness-110"
                    style={{ height: d.heightSales }}
                  ></div>
                  <div 
                    className="w-1/3 bg-gradient-to-t from-amber-500 to-amber-300 rounded-t-lg transition-all shadow-sm hover:brightness-110"
                    style={{ height: d.heightRev }}
                  ></div>
                </div>
                <span className="text-xs text-slate-400 font-semibold">{d.day}</span>
              </div>
            ))}
          </div>

          {/* Chart Legend & Summary */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs pt-1">
            <div className="flex items-center gap-4 text-slate-400">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-[#00c2ae]"></div>
                <span>Total Sales</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-amber-400"></div>
                <span>Platform Revenue</span>
              </div>
            </div>
            <div className="text-slate-400">
              Avg Day: <strong className="text-white">₹40,830</strong>
            </div>
          </div>
        </div>

        {/* Order Overview Status Breakdown */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-cyan-700" /> Order Overview
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Active order fulfillment status</p>
            </div>
            <span className="text-xs font-bold text-slate-300">1,248 Total</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="font-semibold text-white">🟡 Pending</span>
              </div>
              <span className="font-extrabold text-amber-700 text-sm">120</span>
            </div>

            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                <span className="font-semibold text-white">🔵 Processing</span>
              </div>
              <span className="font-extrabold text-sky-700 text-sm">85</span>
            </div>

            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="font-semibold text-white">🟢 Delivered</span>
              </div>
              <span className="font-extrabold text-emerald-700 text-sm">920</span>
            </div>

            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="font-semibold text-white">🔴 Cancelled</span>
              </div>
              <span className="font-extrabold text-rose-700 text-sm">43</span>
            </div>
          </div>

          <div className="pt-2 flex justify-between text-[11px] text-slate-400 border-t border-slate-800">
            <span>Ready for Pickup: <strong className="text-white">65</strong></span>
            <span>In Transit: <strong className="text-white">60</strong></span>
            <span>Returned: <strong className="text-white">15</strong></span>
          </div>
        </div>
      </div>

      {/* 3. 📦 Top Selling Products & 🏪 Top Sellers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Package className="w-4 h-4 text-teal-700" /> Top Selling Products
            </h3>
            <span className="text-xs text-slate-400">By sales volume</span>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { rank: '1', name: 'Product A (Wireless ANC Headphones)', sold: 320, rev: '₹48,000', category: 'Electronics' },
              { rank: '2', name: 'Product B (Pure Silk Zari Saree)', sold: 280, rev: '₹42,000', category: 'Fashion' },
              { rank: '3', name: 'Product C (Handcrafted Terracotta Urli)', sold: 245, rev: '₹36,750', category: 'Handicrafts' }
            ].map((p, idx) => (
              <div key={idx} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between hover:border-teal-500/40 transition-all">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-teal-500/10 text-teal-800 font-extrabold flex items-center justify-center text-xs">
                    {p.rank}
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-xs">{p.name}</h4>
                    <span className="text-[11px] text-slate-400">{p.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-teal-800">{p.sold} sold</p>
                  <p className="text-[11px] text-slate-400">{p.rev}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Sellers */}
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Store className="w-4 h-4 text-amber-700" /> Top Sellers
            </h3>
            <span className="text-xs text-slate-400">By gross revenue</span>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { rank: '1', name: 'Seller A (Royal Rajasthan Handlooms)', sales: '₹82,400', orders: 245, rating: '⭐ 4.7' },
              { rank: '2', name: 'Seller B (ABC Electronics)', sales: '₹71,200', orders: 210, rating: '⭐ 4.6' },
              { rank: '3', name: 'Seller C (Mysore Pure Silks)', sales: '₹64,800', orders: 190, rating: '⭐ 4.5' }
            ].map((s, idx) => (
              <div key={idx} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between hover:border-amber-500/40 transition-all">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-700 font-extrabold flex items-center justify-center text-xs">
                    {s.rank}
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-xs">{s.name}</h4>
                    <span className="text-[11px] text-slate-400">{s.orders} orders • <strong className="text-amber-700">{s.rating}</strong></span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-emerald-700 text-sm">{s.sales}</p>
                  <span className="text-[10px] text-slate-400">Gross Sales</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. ⚠️ Action Required (Alerts & Action Items) */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700" /> ⚠️ Action Required
          </h3>
          <span className="text-xs text-rose-700 font-bold bg-rose-500/10 px-2.5 py-1 rounded-xl">
            Attention Needed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <button
            onClick={() => {
              if (setActiveTab) setActiveTab('admin-hub');
              if (setAdminHubSubTab) setAdminHubSubTab('products');
            }}
            className="p-3.5 bg-slate-900 hover:bg-slate-850 rounded-2xl border border-slate-800 flex items-center justify-between transition-all text-left group"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span className="font-bold text-white group-hover:text-teal-800 transition-colors">12 Out of Stock</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-700" />
          </button>

          <button
            onClick={() => {
              if (setActiveTab) setActiveTab('admin-hub');
              if (setAdminHubSubTab) setAdminHubSubTab('sellers');
            }}
            className="p-3.5 bg-slate-900 hover:bg-slate-850 rounded-2xl border border-slate-800 flex items-center justify-between transition-all text-left group"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="font-bold text-white group-hover:text-teal-800 transition-colors">18 Seller Approvals</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-700" />
          </button>

          <button
            onClick={() => {
              if (setActiveTab) setActiveTab('complaints');
            }}
            className="p-3.5 bg-slate-900 hover:bg-slate-850 rounded-2xl border border-slate-800 flex items-center justify-between transition-all text-left group"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="font-bold text-white group-hover:text-teal-800 transition-colors">32 Returns</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-700" />
          </button>

          <button
            onClick={() => {
              if (setActiveTab) setActiveTab('payments');
            }}
            className="p-3.5 bg-slate-900 hover:bg-slate-850 rounded-2xl border border-slate-800 flex items-center justify-between transition-all text-left group"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span className="font-bold text-white group-hover:text-teal-800 transition-colors">5 Failed Payments</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-700" />
          </button>
        </div>
      </div>

      {/* 5. 🕒 Recent Activity (Connected to Audit Logs) */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-700" /> 🕒 Recent Activity
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Live event stream from administrative audit log</p>
          </div>
          <button
            onClick={() => setActiveTab && setActiveTab('audit-logs')}
            className="text-xs font-bold text-teal-800 hover:text-teal-700 flex items-center gap-1"
          >
            View All → Audit Logs
          </button>
        </div>

        <div className="space-y-2.5 text-xs">
          {[
            { action: 'Seller approved (Royal Rajasthan Handlooms KYC Verified)', time: '10:42 AM', type: 'seller' },
            { action: 'New product added (Wireless Noise Cancelling Earbuds)', time: '10:35 AM', type: 'product' },
            { action: 'Refund processed (Order #ORD-4480 ₹2,999 credited)', time: '10:28 AM', type: 'payment' },
            { action: 'New order received (#ORD-4521 Vidhya Shri ₹2,499)', time: '10:20 AM', type: 'order' },
            { action: 'Delivery partner completed delivery (Ramesh Kumar DEL-8492)', time: '10:18 AM', type: 'delivery' },
            { action: 'Admin updated platform settings (Standard commission adjusted)', time: '10:10 AM', type: 'system' }
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#00c2ae]"></div>
                <span className="font-medium text-white">{item.action}</span>
              </div>
              <span className="text-slate-400 font-semibold text-[11px] whitespace-nowrap ml-4">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
