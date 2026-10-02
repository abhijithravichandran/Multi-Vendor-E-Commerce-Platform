import React, { useState } from 'react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  BarChart3, TrendingUp, TrendingDown, DollarSign, 
  ShoppingCart, Users, Store, Package, Truck, 
  Download, Calendar, Filter, CheckCircle2, AlertCircle, 
  Clock, ArrowUpRight, ArrowDownRight, Layers, FileSpreadsheet, 
  FileText, Check, ChevronRight
} from 'lucide-react';

export const ReportsAnalyticsView = () => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'sales' | 'revenue' | 'orders' | 'customers' | 'sellers' | 'products' | 'delivery' | 'export'
  const [timeFilter, setTimeFilter] = useState('7d'); // 'today' | '7d' | '30d' | '3m' | '1y' | 'custom'

  // Export filters
  const [exportType, setExportType] = useState('sales');
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportNotice, setExportNotice] = useState(null);

  const handleExport = (reportName, format) => {
    setExportNotice(`Generated & Downloaded ${reportName}.${format.toLowerCase()}`);
    setTimeout(() => setExportNotice(null), 3500);
  };

  // Trend data for main chart
  const trendData = [
    { day: 'Mon', sales: 480000, revenue: 48000, heightSales: '52%', heightRev: '42%' },
    { day: 'Tue', sales: 560000, revenue: 56000, heightSales: '64%', heightRev: '50%' },
    { day: 'Wed', sales: 620000, revenue: 62000, heightSales: '72%', heightRev: '60%' },
    { day: 'Thu', sales: 780000, revenue: 78000, heightSales: '88%', heightRev: '74%' },
    { day: 'Fri', sales: 920000, revenue: 92000, heightSales: '98%', heightRev: '85%' },
    { day: 'Sat', sales: 840000, revenue: 84000, heightSales: '90%', heightRev: '78%' }
  ];

  return (
    <div className="space-y-6">
      {/* 9-Tab Sub-navigation matching Exact Recommended Structure */}
      <div className="flex flex-wrap gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs font-bold">
        {[
          { id: 'overview', label: '📈 Overview' },
          { id: 'sales', label: '💰 Sales' },
          { id: 'revenue', label: '💵 Revenue' },
          { id: 'orders', label: '🛒 Orders' },
          { id: 'customers', label: '👥 Customers' },
          { id: 'sellers', label: '🏪 Sellers' },
          { id: 'products', label: '📦 Products' },
          { id: 'delivery', label: '🚚 Delivery' },
          { id: 'export', label: '📥 Export Reports' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-violet-600 text-white shadow-md font-extrabold' 
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-850'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Export notification popup if triggered */}
      {exportNotice && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center gap-2 text-emerald-300 text-xs font-bold animate-pulse">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>✓ {exportNotice}</span>
        </div>
      )}

      {/* 1. 📈 OVERVIEW MAIN ANALYTICS DASHBOARD */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top 6 KPI Cards (2 rows of 3) matching exact user ASCII diagram */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs">Total Sales</span>
              <p className="text-2xl font-extrabold text-white">₹48.5L</p>
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> 12.5% vs last period
              </span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs">Revenue</span>
              <p className="text-2xl font-extrabold text-amber-300">₹4.5L</p>
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> 8.2% margin rate
              </span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs">Orders</span>
              <p className="text-2xl font-extrabold text-white">12,450</p>
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> 15.4% order volume
              </span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs">Customers</span>
              <p className="text-2xl font-extrabold text-white">25,420</p>
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> 9.2% customer growth
              </span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs">Sellers</span>
              <p className="text-2xl font-extrabold text-white">1,250</p>
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> 6.4% verified stores
              </span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs">Products</span>
              <p className="text-2xl font-extrabold text-white">18,540</p>
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> 11.8% catalog expansion
              </span>
            </div>
          </div>

          {/* Main Chart: Sales & Revenue Trend with Filter Bar */}
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-5 shadow-xl font-serif">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-white text-base">Sales & Revenue Trend</h4>
                <p className="text-xs text-slate-400 mt-0.5">Comparing gross marketplace sales vs platform commissions over time.</p>
              </div>

              {/* Time Range Filter Bar matching spec */}
              <div className="flex flex-wrap gap-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs font-bold">
                {[
                  { id: 'today', label: 'Today' },
                  { id: '7d', label: '7 Days' },
                  { id: '30d', label: '30 Days' },
                  { id: '3m', label: '3 Months' },
                  { id: '1y', label: '1 Year' },
                  { id: 'custom', label: 'Custom' }
                ].map(tf => (
                  <button
                    key={tf.id}
                    onClick={() => setTimeFilter(tf.id)}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      timeFilter === tf.id ? 'bg-violet-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="h-48 flex items-end justify-between gap-3 pt-6 px-4 border-b border-slate-800 pb-3">
              {trendData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold">
                    <span className="text-teal-800">₹{(d.sales / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="w-full flex items-end justify-center gap-1.5 h-full">
                    {/* Gross Sales Bar */}
                    <div 
                      className="w-1/2 bg-gradient-to-t from-teal-700 via-[#00c2ae] to-cyan-400 rounded-t-lg transition-all hover:brightness-110 shadow-sm"
                      style={{ height: d.heightSales }}
                      title={`Sales: ₹${d.sales.toLocaleString()}`}
                    ></div>
                    {/* Platform Revenue Bar */}
                    <div 
                      className="w-1/3 bg-gradient-to-t from-amber-500 to-amber-300 rounded-t-lg transition-all hover:brightness-110 shadow-sm"
                      style={{ height: d.heightRev }}
                      title={`Revenue: ₹${d.revenue.toLocaleString()}`}
                    ></div>
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">{d.day}</span>
                </div>
              ))}
            </div>

            {/* Chart Legend */}
            <div className="flex items-center gap-6 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#00c2ae]"></div>
                <span>Gross Sales Volume (₹)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-amber-400"></div>
                <span>Platform Net Commission (₹)</span>
              </div>
            </div>
          </div>

          {/* Additional Overview Table (Matching spec table) */}
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
            <h4 className="font-bold text-white text-sm">Comprehensive Marketplace Health Indicators</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Total Sales', val: '₹48.5L', sub: 'Total value of products sold' },
                { label: 'Net Revenue', val: '₹4.5L', sub: 'Platform revenue after deductions' },
                { label: 'Total Orders', val: '12,450', sub: 'Number of customer orders' },
                { label: 'Avg Order Value', val: '₹1,560', sub: 'Average cart spend per order' },
                { label: 'New Customers', val: '1,240', sub: 'Newly registered customer accounts' },
                { label: 'Active Sellers', val: '1,250', sub: 'Currently active sellers' },
                { label: 'Products Sold', val: '32,450', sub: 'Number of units sold' },
                { label: 'Return Rate', val: '2.1%', sub: 'Healthy minimal return rate' }
              ].map((item, i) => (
                <div key={i} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[11px]">{item.label}</span>
                  <p className="text-base font-extrabold text-white">{item.val}</p>
                  <p className="text-[10px] text-slate-500">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. 💰 SALES REPORT */}
      {activeTab === 'sales' && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-5 shadow-xl text-xs font-serif">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-lg text-white">Product Sales Report</h3>
              <p className="text-slate-400 mt-0.5">Deep focus on product sales velocity, categories, and top sellers.</p>
            </div>
            {/* Filter Pill Controls */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 font-semibold">Date: This Month</span>
              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 font-semibold">All Categories</span>
              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 font-semibold">All Sellers</span>
            </div>
          </div>

          {/* 3 Summary Cards matching spec */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Total Sales</span>
              <p className="text-2xl font-extrabold text-white mt-1">₹48.5L</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Units Sold</span>
              <p className="text-2xl font-extrabold text-emerald-400 mt-1">32,450</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Avg Order Value</span>
              <p className="text-2xl font-extrabold text-violet-400 mt-1">₹1,560</p>
            </div>
          </div>

          {/* Sales Table matching spec */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">🏆 Top Selling Products</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-3 px-3">Product</th>
                    <th className="py-3 px-3">Seller</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Units Sold</th>
                    <th className="py-3 px-3 text-right">Sales</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { product: 'Wireless ANC Headphones', seller: 'ABC Electronics', category: 'Electronics', units: 856, sales: '₹12.8L' },
                    { product: 'Kanjivaram Silk Saree', seller: 'Royal Rajasthan Handlooms', category: 'Fashion & Handloom', units: 542, sales: '₹8.4L' },
                    { product: 'Handmade Kundan Choker', seller: 'Mysore Pure Silks', category: 'Accessories', units: 420, sales: '₹5.4L' },
                    { product: 'Handcrafted Terracotta Urli', seller: 'Clay & Craft Pottery Co.', category: 'Terracotta & Pottery', units: 380, sales: '₹3.2L' },
                    { product: 'Brass Diya & Bell Set', seller: 'Deccan Brassware', category: 'Metalcraft', units: 310, sales: '₹1.9L' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-white">{row.product}</td>
                      <td className="py-3.5 px-3 text-slate-300 font-semibold">{row.seller}</td>
                      <td className="py-3.5 px-3 text-slate-400">{row.category}</td>
                      <td className="py-3.5 px-3 font-bold text-emerald-400">{row.units.toLocaleString()}</td>
                      <td className="py-3.5 px-3 font-extrabold text-white text-right">{row.sales}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. 💵 REVENUE REPORT */}
      {activeTab === 'revenue' && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-xl text-xs font-serif">
          <div>
            <h3 className="font-bold text-lg text-white">Platform Revenue & Financial Split</h3>
            <p className="text-slate-400 mt-0.5">Where the platform's money originates, seller disbursements, and retained commission.</p>
          </div>

          {/* Revenue Breakdown Flow Chart matching spec */}
          <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="text-center">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Marketplace Gross Sales</span>
              <p className="text-3xl font-extrabold text-white mt-1">₹48.5L</p>
            </div>

            <div className="flex items-center justify-center gap-2 text-slate-500 font-bold text-lg">
              ↓
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-xs font-semibold">Seller Share</span>
                <p className="text-xl font-extrabold text-white">₹39.2L</p>
                <p className="text-[10px] text-slate-500">Gross vendor payout</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-violet-500/30 space-y-1">
                <span className="text-violet-300 text-xs font-semibold">Platform Commission</span>
                <p className="text-xl font-extrabold text-amber-300">₹4.5L</p>
                <p className="text-[10px] text-emerald-400">10% Standard fee</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-xs font-semibold">Delivery & Other Fees</span>
                <p className="text-xl font-extrabold text-violet-400">₹4.8L</p>
                <p className="text-[10px] text-slate-500">Fleet & convenience fee</p>
              </div>
            </div>
          </div>

          {/* Revenue Cards matching spec */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Gross Sales', val: '₹48.5L' },
              { label: 'Seller Share', val: '₹39.2L' },
              { label: 'Platform Commission', val: '₹4.5L' },
              { label: 'Delivery Fees', val: '₹2.1L' },
              { label: 'Other Fees', val: '₹2.7L' },
              { label: 'Refunds', val: '−₹1.2L', color: 'text-rose-400' },
              { label: 'Net Platform Revenue', val: '₹4.5L', color: 'text-emerald-400' }
            ].map((rc, i) => (
              <div key={i} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-400 text-[11px]">{rc.label}</span>
                <p className={`text-base font-extrabold mt-1 ${rc.color || 'text-white'}`}>{rc.val}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. 🛒 ORDERS REPORT */}
      {activeTab === 'orders' && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-5 shadow-xl text-xs font-serif">
          <div>
            <h3 className="font-bold text-lg text-white">Orders Report & Lifecycle</h3>
            <p className="text-slate-400 mt-0.5">End-to-end fulfillment status from placement to doorstep delivery.</p>
          </div>

          {/* Order Status Cards (Exact 6 cards matching spec) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { status: 'New', count: 125, color: 'text-cyan-400' },
              { status: 'Processing', count: 320, color: 'text-amber-400' },
              { status: 'Shipped', count: 540, color: 'text-violet-400' },
              { status: 'Delivered', count: '11,250', color: 'text-emerald-400' },
              { status: 'Cancelled', count: 125, color: 'text-rose-400' },
              { status: 'Returned', count: 90, color: 'text-rose-400' }
            ].map((sc, i) => (
              <div key={i} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-400 text-[11px]">{sc.status}</span>
                <p className={`text-xl font-extrabold mt-1 ${sc.color}`}>{sc.count}</p>
              </div>
            ))}
          </div>

          {/* Orders Table matching spec */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Recent Order Logs</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-3 px-3">Order ID</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Seller</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { id: '#ORD1024', customer: 'Vidhya Shri', seller: 'ABC Store', amount: '₹2,499', status: 'Delivered', date: 'Oct 1' },
                    { id: '#ORD1025', customer: 'Arun Sharma', seller: 'Fashion Hub', amount: '₹1,899', status: 'Shipped', date: 'Oct 1' },
                    { id: '#ORD1026', customer: 'Priya Patel', seller: 'Clay & Craft', amount: '₹1,450', status: 'Processing', date: 'Oct 1' },
                    { id: '#ORD1027', customer: 'Rahul Verma', seller: 'Royal Rajasthan', amount: '₹3,200', status: 'Delivered', date: 'Sep 30' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-violet-300">{row.id}</td>
                      <td className="py-3.5 px-3 font-bold text-white">{row.customer}</td>
                      <td className="py-3.5 px-3 text-slate-300 font-semibold">{row.seller}</td>
                      <td className="py-3.5 px-3 font-extrabold text-emerald-400">{row.amount}</td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-300' :
                          row.status === 'Shipped' ? 'bg-violet-500/20 text-violet-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-400 text-right">{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. 👥 CUSTOMER ANALYTICS */}
      {activeTab === 'customers' && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-5 shadow-xl text-xs font-serif">
          <div>
            <h3 className="font-bold text-lg text-white">Customer Analytics & Behavior</h3>
            <p className="text-slate-400 mt-0.5">Acquisition, retention, customer lifetime value, and cohort spending.</p>
          </div>

          {/* 7 KPI Cards matching spec */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Total Customers', val: '25,420' },
              { label: 'New Customers', val: '1,240' },
              { label: 'Active Customers', val: '18,540' },
              { label: 'Returning Customers', val: '12,450' },
              { label: 'Average Spend', val: '₹4,820' },
              { label: 'Average Orders', val: '3.4 orders' },
              { label: 'Customer Retention', val: '68%', color: 'text-emerald-400' }
            ].map((c, i) => (
              <div key={i} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-400 text-[11px]">{c.label}</span>
                <p className={`text-base font-extrabold mt-1 ${c.color || 'text-white'}`}>{c.val}</p>
              </div>
            ))}
          </div>

          {/* Top Customers Leaderboard matching spec */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Top Customers by Lifetime Value</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Orders</th>
                    <th className="py-3 px-3">Total Spent</th>
                    <th className="py-3 px-3 text-right">Last Purchase</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { customer: 'Vidhya Shri', orders: 24, spent: '₹38,450', last: 'Today' },
                    { customer: 'Priya Patel', orders: 18, spent: '₹29,800', last: 'Sep 29' },
                    { customer: 'Arun Sharma', orders: 15, spent: '₹24,500', last: 'Sep 27' },
                    { customer: 'Rahul Verma', orders: 14, spent: '₹21,900', last: 'Sep 25' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-white">{row.customer}</td>
                      <td className="py-3.5 px-3 text-slate-300 font-semibold">{row.orders} orders</td>
                      <td className="py-3.5 px-3 font-extrabold text-emerald-400">{row.spent}</td>
                      <td className="py-3.5 px-3 text-slate-400 text-right">{row.last}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 6. 🏪 SELLER ANALYTICS */}
      {activeTab === 'sellers' && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-5 shadow-xl text-xs font-serif">
          <div>
            <h3 className="font-bold text-lg text-white">Seller Analytics & Performance</h3>
            <p className="text-slate-400 mt-0.5">Multi-vendor sales throughput, store ratings, and fulfillment rates.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: 'Total Sellers', val: '1,250' },
              { label: 'Active Sellers', val: '1,180' },
              { label: 'New Sellers', val: '64' },
              { label: 'Top Sellers', val: '85' },
              { label: 'Pending Approvals', val: '14' }
            ].map((s, i) => (
              <div key={i} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-400 text-[11px]">{s.label}</span>
                <p className="text-base font-extrabold text-white mt-1">{s.val}</p>
              </div>
            ))}
          </div>

          {/* Seller Performance Table matching spec */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Store Performance & Benchmark</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-3 px-3">Seller</th>
                    <th className="py-3 px-3">Orders</th>
                    <th className="py-3 px-3">Sales</th>
                    <th className="py-3 px-3">Commission</th>
                    <th className="py-3 px-3">Rating</th>
                    <th className="py-3 px-3 text-right">Returns</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { seller: 'ABC Electronics', orders: 856, sales: '₹12.8L', commission: '₹1.28L', rating: '⭐ 4.6', returns: '2.1%' },
                    { seller: 'Fashion Hub', orders: 542, sales: '₹8.4L', commission: '₹84K', rating: '⭐ 4.4', returns: '3.2%' },
                    { seller: 'Royal Rajasthan Handlooms', orders: 412, sales: '₹6.5L', commission: '₹65K', rating: '⭐ 4.8', returns: '1.4%' },
                    { seller: 'Clay & Craft Pottery', orders: 290, sales: '₹3.8L', commission: '₹38K', rating: '⭐ 4.9', returns: '0.8%' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-white">{row.seller}</td>
                      <td className="py-3.5 px-3 text-slate-300 font-semibold">{row.orders}</td>
                      <td className="py-3.5 px-3 font-bold text-emerald-400">{row.sales}</td>
                      <td className="py-3.5 px-3 font-bold text-violet-400">{row.commission}</td>
                      <td className="py-3.5 px-3 text-amber-300 font-bold">{row.rating}</td>
                      <td className="py-3.5 px-3 text-slate-400 text-right">{row.returns}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 7. 📦 PRODUCT ANALYTICS */}
      {activeTab === 'products' && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-5 shadow-xl text-xs font-serif">
          <div>
            <h3 className="font-bold text-lg text-white">Product Analytics & Conversion Funnel</h3>
            <p className="text-slate-400 mt-0.5">Inspect catalog performance and identify drop-off stages in customer conversion.</p>
          </div>

          {/* Product KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: 'Total Products', val: '18,540' },
              { label: 'Products Sold', val: '32,450' },
              { label: 'Best Sellers', val: '120' },
              { label: 'Low Performing', val: '45' },
              { label: 'Out of Stock', val: '18' }
            ].map((p, i) => (
              <div key={i} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-400 text-[11px]">{p.label}</span>
                <p className="text-base font-extrabold text-white mt-1">{p.val}</p>
              </div>
            ))}
          </div>

          {/* Top Products Table matching spec */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Top Performing Products</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-3 px-3">Product</th>
                    <th className="py-3 px-3">Views</th>
                    <th className="py-3 px-3">Cart Adds</th>
                    <th className="py-3 px-3">Orders</th>
                    <th className="py-3 px-3">Units Sold</th>
                    <th className="py-3 px-3 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { product: 'Wireless ANC Headphones', views: '12,450', cart: '1,120', orders: 856, units: '1,024', rev: '₹12.8L' },
                    { product: 'Kanjivaram Silk Saree', views: '9,840', cart: '820', orders: 620, units: '710', rev: '₹8.2L' },
                    { product: 'Handmade Kundan Choker', views: '7,540', cart: '640', orders: 380, units: '420', rev: '₹4.1L' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-white">{row.product}</td>
                      <td className="py-3.5 px-3 text-slate-300 font-semibold">{row.views}</td>
                      <td className="py-3.5 px-3 text-violet-400 font-bold">{row.cart}</td>
                      <td className="py-3.5 px-3 text-white font-bold">{row.orders}</td>
                      <td className="py-3.5 px-3 text-emerald-400 font-bold">{row.units}</td>
                      <td className="py-3.5 px-3 font-extrabold text-amber-300 text-right">{row.rev}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Product Conversion Funnel Diagram matching spec */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="font-bold text-white text-sm">Product Conversion Funnel</h4>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px]">Product Views</span>
                <p className="font-bold text-white mt-0.5">100% (12.4k)</p>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px]">Add to Cart</span>
                <p className="font-bold text-violet-400 mt-0.5">28% (3.4k)</p>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px]">Checkout</span>
                <p className="font-bold text-indigo-400 mt-0.5">18% (2.2k)</p>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px]">Payment</span>
                <p className="font-bold text-amber-400 mt-0.5">14% (1.7k)</p>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px]">Order Created</span>
                <p className="font-bold text-emerald-400 mt-0.5">12% (1.4k)</p>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px]">Delivered</span>
                <p className="font-bold text-emerald-300 mt-0.5">11.8% (1.4k)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. 🚚 DELIVERY ANALYTICS */}
      {activeTab === 'delivery' && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-5 shadow-xl text-xs font-serif">
          <div>
            <h3 className="font-bold text-lg text-white">Delivery Fleet Analytics</h3>
            <p className="text-slate-400 mt-0.5">Fleet turnaround, route fulfillment, failed deliveries, and SLA metrics.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {[
              { label: 'Total Deliveries', val: '12,450' },
              { label: 'Completed', val: '11,850', color: 'text-emerald-400' },
              { label: 'Active', val: '320', color: 'text-violet-400' },
              { label: 'Failed', val: '125', color: 'text-rose-400' },
              { label: 'Cancelled', val: '155', color: 'text-amber-400' },
              { label: 'Avg Delivery Time', val: '32 min' },
              { label: 'On-Time Rate', val: '94%', color: 'text-emerald-400' }
            ].map((d, i) => (
              <div key={i} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-400 text-[11px]">{d.label}</span>
                <p className={`text-base font-extrabold mt-1 ${d.color || 'text-white'}`}>{d.val}</p>
              </div>
            ))}
          </div>

          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-white text-sm">Delivery Performance & Fleet Benchmarks</h4>
            <p className="text-slate-400">
              94% of marketplace orders are fulfilled on or before ETA. Real-time GPS routing ensures minimal route friction across Bangalore, Mumbai, Delhi, Hyderabad, and Chennai.
            </p>
          </div>
        </div>
      )}

      {/* 9. 📥 EXPORT REPORTS */}
      {activeTab === 'export' && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-xl text-xs font-serif">
          <div>
            <h3 className="font-bold text-lg text-white">Export & Download Marketplace Reports</h3>
            <p className="text-slate-400 mt-0.5">Filter by date, category, or seller before generating Excel, CSV, or PDF exports.</p>
          </div>

          {/* Export Grid Options matching exact spec */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Sales Report', icon: '📊', desc: 'Product sales volume, categories, and top sellers', formats: ['CSV', 'Excel', 'PDF'] },
              { name: 'Revenue Report', icon: '💰', desc: 'Commissions, seller payouts, refunds, and deductions', formats: ['CSV', 'Excel', 'PDF'] },
              { name: 'Orders Report', icon: '🛒', desc: 'Complete order lifecycle records with status & payments', formats: ['CSV', 'Excel'] },
              { name: 'Customer Report', icon: '👥', desc: 'Customer accounts, lifetime value, and order history', formats: ['CSV', 'Excel'] },
              { name: 'Seller Report', icon: '🏪', desc: 'Vendor performance, gross sales, and commission payouts', formats: ['CSV', 'Excel'] },
              { name: 'Product Report', icon: '📦', desc: 'Catalog inventory, conversion rates, and stock alerts', formats: ['CSV', 'Excel'] },
              { name: 'Delivery Report', icon: '🚚', desc: 'Fleet fulfillment times, partner earnings, and on-time rate', formats: ['CSV', 'Excel'] }
            ].map((rep, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center font-bold text-lg">
                    {rep.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{rep.name}</h4>
                    <p className="text-slate-400 text-[11px] mt-0.5">{rep.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {rep.formats.map(fmt => (
                    <button
                      key={fmt}
                      onClick={() => handleExport(rep.name, fmt)}
                      className="bg-slate-800 hover:bg-violet-600 text-slate-200 hover:text-white px-2.5 py-1 rounded-lg font-bold transition-all text-[11px]"
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
