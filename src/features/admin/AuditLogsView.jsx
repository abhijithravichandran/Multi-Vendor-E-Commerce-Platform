import React, { useState } from 'react';
import { 
  FileText, Shield, User, Store, Truck, 
  CreditCard, Package, RefreshCcw, Settings, 
  AlertTriangle, CheckCircle2, XCircle, Search, 
  Filter, Download, ArrowUpRight, Clock, Eye, 
  Laptop, MapPin, Key, Layers, ChevronRight
} from 'lucide-react';

export const AuditLogsView = () => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'all' | 'admin' | 'user' | 'seller' | 'order' | 'payment' | 'delivery' | 'returns' | 'system' | 'security'
  const [selectedLog, setSelectedLog] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [exportNotice, setExportNotice] = useState(null);

  // Comprehensive Real Audit Logs Database
  const [auditLogsList, setAuditLogsList] = useState([
    {
      id: 'LOG-10245',
      time: '02 Oct 2026, 10:42 AM',
      rawTime: '10:42',
      user: 'SuperAdmin John',
      role: 'Administrator',
      category: 'admin',
      action: 'UPDATE',
      module: 'Product',
      target: 'iPhone 17 Pro (#P1023)',
      status: 'Success',
      ip: '103.24.120.45',
      device: 'Chrome 128 / Windows 11',
      location: 'Bangalore, India',
      sessionId: 'SES-98421-ZENVORA',
      changes: [
        { field: 'Price', before: '₹1,24,999', after: '₹1,19,999' },
        { field: 'Stock', before: '25', after: '30' },
        { field: 'Status', before: 'Draft', after: 'Active' }
      ]
    },
    {
      id: 'LOG-10244',
      time: '02 Oct 2026, 10:38 AM',
      rawTime: '10:38',
      user: 'Pawan Verma (ABC Electronics)',
      role: 'Seller',
      category: 'seller',
      action: 'CREATE',
      module: 'Product',
      target: 'Wireless Noise Cancelling Earbuds (#P1044)',
      status: 'Success',
      ip: '49.37.192.11',
      device: 'Firefox 130 / macOS',
      location: 'Mumbai, India',
      sessionId: 'SES-98418-VENDOR',
      changes: [
        { field: 'Listing Status', before: 'None', after: 'Submitted for KYC Approval' },
        { field: 'Base Price', before: '₹0', after: '₹2,499' }
      ]
    },
    {
      id: 'LOG-10243',
      time: '02 Oct 2026, 10:31 AM',
      rawTime: '10:31',
      user: 'Finance Admin Priya',
      role: 'Administrator',
      category: 'admin',
      action: 'DELETE',
      module: 'Coupons',
      target: 'Coupon #FESTIVE30',
      status: 'Success',
      ip: '103.24.120.48',
      device: 'Edge 128 / Windows 11',
      location: 'Bangalore, India',
      sessionId: 'SES-98412-FIN',
      changes: [
        { field: 'Active State', before: 'Active', after: 'Deactivated & Archived' }
      ]
    },
    {
      id: 'LOG-10242',
      time: '02 Oct 2026, 10:25 AM',
      rawTime: '10:25',
      user: 'SuperAdmin John',
      role: 'Administrator',
      category: 'security',
      action: 'LOGIN',
      module: 'Security',
      target: 'Admin Console Access',
      status: 'Success',
      ip: '103.24.120.45',
      device: 'Chrome 128 / Windows 11',
      location: 'Bangalore, India',
      sessionId: 'SES-98421-ZENVORA',
      changes: [
        { field: '2FA TOTP', before: 'Pending', after: 'Verified' }
      ]
    },
    {
      id: 'LOG-10241',
      time: '02 Oct 2026, 10:15 AM',
      rawTime: '10:15',
      user: 'Vidhya Shri',
      role: 'Customer',
      category: 'user',
      action: 'PAYMENT',
      module: 'Payment',
      target: 'Order #ORD-4521 (₹2,499)',
      status: 'Success',
      ip: '157.48.21.90',
      device: 'Mobile Safari / iOS 18',
      location: 'Chennai, India',
      sessionId: 'SES-98399-CUST',
      changes: [
        { field: 'Payment Status', before: 'Initiated', after: 'Escrow Secured (UPI)' }
      ]
    },
    {
      id: 'LOG-10240',
      time: '02 Oct 2026, 09:58 AM',
      rawTime: '09:58',
      user: 'Ramesh Kumar (DEL-8492)',
      role: 'Delivery Partner',
      category: 'delivery',
      action: 'STATUS CHANGE',
      module: 'Delivery',
      target: 'Order #ORD-4518',
      status: 'Success',
      ip: '42.108.77.23',
      device: 'Zenvora Partner App / Android 14',
      location: 'Bangalore, India',
      sessionId: 'SES-98380-RIDER',
      changes: [
        { field: 'Trip Status', before: 'Picked Up', after: 'Delivered (OTP Verified)' }
      ]
    },
    {
      id: 'LOG-10239',
      time: '02 Oct 2026, 09:40 AM',
      rawTime: '09:40',
      user: 'Unknown Actor',
      role: 'Unknown',
      category: 'security',
      action: 'LOGIN',
      module: 'Security',
      target: 'Admin Auth Gateway',
      status: 'Failed',
      ip: '185.220.101.4',
      device: 'Python Requests / Tor Exit Node',
      location: 'Frankfurt, Germany',
      sessionId: 'BLOCKED-ATTEMPT',
      changes: [
        { field: 'IP Whitelist Check', before: 'Attempted', after: 'Blocked by Firewall (Geo-IP)' }
      ]
    },
    {
      id: 'LOG-10238',
      time: '02 Oct 2026, 09:12 AM',
      rawTime: '09:12',
      user: 'Operations Lead Rahul',
      role: 'Administrator',
      category: 'returns',
      action: 'REFUND',
      module: 'Returns',
      target: 'Return #REF-8491 (₹5,200)',
      status: 'Success',
      ip: '103.24.120.50',
      device: 'Chrome 128 / macOS',
      location: 'Bangalore, India',
      sessionId: 'SES-98360-OPS',
      changes: [
        { field: 'Refund Approval', before: 'Pending Inspection', after: 'Approved & Credited to Source' }
      ]
    },
    {
      id: 'LOG-10237',
      time: '02 Oct 2026, 08:30 AM',
      rawTime: '08:30',
      user: 'System Cron',
      role: 'System',
      category: 'system',
      action: 'PAYOUT',
      module: 'Payouts',
      target: 'Weekly Seller Batch #PO-8491',
      status: 'Success',
      ip: '10.0.4.12 (Internal RPC)',
      device: 'Server Background Worker',
      location: 'Cloud SQL Asia-South',
      sessionId: 'CRON-SETTLEMENT-RUN',
      changes: [
        { field: 'Settlement Ledger', before: 'Pending Batch', after: 'Dispatched to Bank HDFC NEFT' }
      ]
    },
    {
      id: 'LOG-10236',
      time: '02 Oct 2026, 08:00 AM',
      rawTime: '08:00',
      user: 'System Daemon',
      role: 'System',
      category: 'system',
      action: 'BACKUP',
      module: 'System',
      target: 'PostgreSQL Database Snapshot',
      status: 'Success',
      ip: '10.0.1.2',
      device: 'Automated Snapshot Service',
      location: 'Google Cloud Asia',
      sessionId: 'DAILY-SNAPSHOT-8492',
      changes: [
        { field: 'Backup File', before: 'None', after: 'db_zenvora_20261002.enc (1.4 GB)' }
      ]
    }
  ]);

  const handleExportCSV = () => {
    setExportNotice('Exported 12,450 audit records to zenvora_audit_logs.csv');
    setTimeout(() => setExportNotice(null), 3500);
  };

  // Filtered Logs
  const filteredLogs = auditLogsList.filter(log => {
    if (activeTab === 'admin' && log.category !== 'admin') return false;
    if (activeTab === 'user' && log.category !== 'user') return false;
    if (activeTab === 'seller' && log.category !== 'seller') return false;
    if (activeTab === 'order' && log.module !== 'Order' && !log.target.includes('ORD')) return false;
    if (activeTab === 'payment' && log.module !== 'Payment' && log.module !== 'Payouts') return false;
    if (activeTab === 'delivery' && log.module !== 'Delivery') return false;
    if (activeTab === 'returns' && log.module !== 'Returns') return false;
    if (activeTab === 'system' && log.category !== 'system') return false;
    if (activeTab === 'security' && log.category !== 'security') return false;

    if (moduleFilter !== 'all' && log.module.toLowerCase() !== moduleFilter.toLowerCase()) return false;
    if (actionFilter !== 'all' && log.action.toLowerCase() !== actionFilter.toLowerCase()) return false;
    if (statusFilter !== 'all' && log.status.toLowerCase() !== statusFilter.toLowerCase()) return false;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const match = log.id.toLowerCase().includes(term) ||
                    log.user.toLowerCase().includes(term) ||
                    log.target.toLowerCase().includes(term) ||
                    log.module.toLowerCase().includes(term);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Sub-navigation matching exact structure */}
      <div className="flex flex-wrap gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs font-bold">
        {[
          { id: 'overview', label: '📊 Overview' },
          { id: 'all', label: '📋 All Logs' },
          { id: 'admin', label: '👤 Admin Activity' },
          { id: 'user', label: '👥 User Activity' },
          { id: 'seller', label: '🏪 Seller Activity' },
          { id: 'order', label: '📦 Order Activity' },
          { id: 'payment', label: '💳 Payment Activity' },
          { id: 'delivery', label: '🚚 Delivery Activity' },
          { id: 'returns', label: '🔄 Return & Refund Activity' },
          { id: 'system', label: '⚙️ System Activity' },
          { id: 'security', label: '🚨 Security Activity' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSearchTerm(''); }}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-violet-600 text-white shadow-md font-extrabold' 
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Export notification popup */}
      {exportNotice && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center gap-2 text-emerald-300 text-xs font-bold animate-pulse">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>✓ {exportNotice}</span>
        </div>
      )}

      {/* 📊 OVERVIEW SECTION */}
      {activeTab === 'overview' && (
        <div className="space-y-6 font-serif">
          {/* Top Summary Cards (Exact Spec) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { label: 'Total Activities', val: '12,450', color: 'text-white' },
              { label: 'Admin Actions', val: '3,240', color: 'text-violet-400' },
              { label: 'Seller Actions', val: '5,180', color: 'text-amber-300' },
              { label: 'User Actions', val: '2,890', color: 'text-cyan-400' },
              { label: 'Security Events', val: '86', color: 'text-rose-400' },
              { label: 'Failed Actions', val: '54', color: 'text-rose-500' }
            ].map((c, i) => (
              <div key={i} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 font-sans">{c.label}</span>
                <p className={`text-xl font-extrabold ${c.color}`}>{c.val}</p>
              </div>
            ))}
          </div>

          {/* Mini Strip Card matching ASCII diagram */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-white text-base">Audit Trail Monitoring</h3>
              <p className="text-xs text-slate-400">Tamper-evident logs tracking administrative and marketplace activity.</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleExportCSV}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Export Logs
              </button>
              <button 
                onClick={() => setActiveTab('all')}
                className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-1.5 rounded-xl font-bold text-xs shadow"
              >
                View All Logs
              </button>
            </div>
          </div>

          {/* 2 Visual Cards: Activity Trend & Activity by User Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Activity Trend Card */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-3xl space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm">Activity Trend (Last 24 Hours)</h4>
                <span className="text-emerald-400 font-bold">● High throughput</span>
              </div>
              <div className="h-32 flex items-end justify-between gap-2 pt-4 px-2 border-b border-slate-800 pb-2">
                {[
                  { hour: '00:00', height: '25%', color: 'from-teal-700 to-teal-500' },
                  { hour: '04:00', height: '15%', color: 'from-emerald-600 to-teal-400' },
                  { hour: '08:00', height: '65%', color: 'from-cyan-600 to-sky-400' },
                  { hour: '10:00', height: '95%', color: 'from-teal-600 via-[#00c2ae] to-emerald-300' },
                  { hour: '12:00', height: '80%', color: 'from-emerald-600 to-teal-400' },
                  { hour: '14:00', height: '88%', color: 'from-amber-500 to-amber-300' },
                  { hour: '16:00', height: '70%', color: 'from-teal-600 to-cyan-400' },
                  { hour: '20:00', height: '50%', color: 'from-sky-600 to-teal-400' }
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <div className={`w-full bg-gradient-to-t ${bar.color} rounded-t-md shadow-sm`} style={{ height: bar.height }}></div>
                    <span className="text-[9px] text-slate-500">{bar.hour}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity by User Type Bar Distribution */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-3xl space-y-3 shadow-xl">
              <h4 className="font-bold text-white text-sm">Activity by User Type</h4>
              <div className="space-y-3 pt-1">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-300 font-bold">Seller Actions (5,180)</span>
                    <span className="text-amber-500 font-bold">45%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-300 font-bold">Admin Actions (3,240)</span>
                    <span className="text-teal-700 font-bold">35%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00c2ae] rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-300 font-bold">Customer Actions (2,890)</span>
                    <span className="text-sky-600 font-bold">20%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities Table matching spec */}
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-sm">Recent Activities</h4>
              <span className="text-slate-400 text-[11px]">Real-time audit stream</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">Time</th>
                    <th className="py-2.5 px-3">User</th>
                    <th className="py-2.5 px-3">Action</th>
                    <th className="py-2.5 px-3">Module</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {auditLogsList.slice(0, 4).map((row, i) => (
                    <tr key={i} className="hover:bg-slate-900/40">
                      <td className="py-3 px-3 font-semibold text-slate-400">{row.rawTime}</td>
                      <td className="py-3 px-3 font-bold text-white">{row.user}</td>
                      <td className="py-3 px-3 text-violet-300 font-bold">{row.action}</td>
                      <td className="py-3 px-3 text-slate-300">{row.module}</td>
                      <td className="py-3 px-3 text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 📋 ALL LOGS (AND FILTERED TABS) TABLE VIEW */}
      {activeTab !== 'overview' && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-xs font-serif">
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-lg text-white">
                {activeTab === 'all' ? 'All Audit Logs' :
                 activeTab === 'admin' ? 'Admin Activity Logs' :
                 activeTab === 'user' ? 'Customer Activity Logs' :
                 activeTab === 'seller' ? 'Seller Activity Logs' :
                 activeTab === 'order' ? 'Order Activity Logs' :
                 activeTab === 'payment' ? 'Payment Activity Logs' :
                 activeTab === 'delivery' ? 'Delivery Fleet Activity Logs' :
                 activeTab === 'returns' ? 'Return & Refund Logs' :
                 activeTab === 'system' ? 'System Process Logs' : 'Security Event Logs'}
              </h3>
              <p className="text-slate-400 mt-0.5">Showing {filteredLogs.length} recorded events matching current filter criteria.</p>
            </div>

            <button 
              onClick={handleExportCSV}
              className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl font-bold shadow flex items-center gap-1.5 self-start sm:self-auto text-xs"
            >
              <Download className="w-3.5 h-3.5" /> Export Filtered Logs
            </button>
          </div>

          {/* Filter Bar (Date, User, Module, Action, Status, Search) matching spec */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-2 border-t border-slate-800">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search Log ID, User, Target..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white text-xs"
              />
            </div>

            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-semibold"
            >
              <option value="all">All Modules</option>
              <option value="product">Product</option>
              <option value="security">Security</option>
              <option value="payment">Payment</option>
              <option value="delivery">Delivery</option>
              <option value="returns">Returns</option>
              <option value="system">System</option>
              <option value="coupons">Coupons</option>
            </select>

            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-semibold"
            >
              <option value="all">All Actions</option>
              <option value="update">UPDATE</option>
              <option value="create">CREATE</option>
              <option value="delete">DELETE</option>
              <option value="login">LOGIN</option>
              <option value="payment">PAYMENT</option>
              <option value="refund">REFUND</option>
              <option value="payout">PAYOUT</option>
              <option value="status change">STATUS CHANGE</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-semibold"
            >
              <option value="all">All Statuses</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Audit Logs Table matching exact spec */}
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                  <th className="py-3 px-3">Log ID</th>
                  <th className="py-3 px-3">Date & Time</th>
                  <th className="py-3 px-3">User</th>
                  <th className="py-3 px-3">Role</th>
                  <th className="py-3 px-3">Action</th>
                  <th className="py-3 px-3">Module</th>
                  <th className="py-3 px-3">Target</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">IP Address</th>
                  <th className="py-3 px-3 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredLogs.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-violet-400">{row.id}</td>
                    <td className="py-3.5 px-3 text-slate-400 whitespace-nowrap">{row.time}</td>
                    <td className="py-3.5 px-3 font-bold text-white whitespace-nowrap">{row.user}</td>
                    <td className="py-3.5 px-3 text-slate-300 font-semibold">{row.role}</td>
                    <td className="py-3.5 px-3 font-extrabold text-amber-300">{row.action}</td>
                    <td className="py-3.5 px-3 text-slate-300">{row.module}</td>
                    <td className="py-3.5 px-3 font-medium text-slate-200">{row.target}</td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.status === 'Success' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 font-mono text-[10px]">{row.ip}</td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => setSelectedLog(row)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-xl font-bold transition-all text-[11px]"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 🔐 AUDIT LOG DETAILS MODAL / DRAWER (Matching Exact Spec) */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-serif text-xs">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-white">🔐 Audit Log Details</h3>
                <p className="text-slate-400 mt-0.5">Immutable record: <span className="text-violet-400 font-bold">{selectedLog.id}</span></p>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Event Attributes Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 text-[10px]">Date & Time</span>
                  <p className="font-bold text-white mt-0.5">{selectedLog.time}</p>
                </div>
                <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 text-[10px]">Performed By</span>
                  <p className="font-bold text-white mt-0.5">{selectedLog.user}</p>
                </div>
                <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 text-[10px]">Action & Module</span>
                  <p className="font-bold text-amber-300 mt-0.5">{selectedLog.action} / {selectedLog.module}</p>
                </div>
                <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 text-[10px]">Execution Status</span>
                  <p className="font-bold text-emerald-400 mt-0.5">{selectedLog.status}</p>
                </div>
              </div>

              {/* Target */}
              <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 text-[10px]">Target Resource / Entity</span>
                <p className="font-bold text-white mt-0.5 text-sm">{selectedLog.target}</p>
              </div>

              {/* Changed Fields (Matching Spec Table) */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">Changed Fields (Audit Diff)</h4>
                <div className="border border-slate-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 text-[11px]">
                        <th className="py-2.5 px-3">Field</th>
                        <th className="py-2.5 px-3">Before</th>
                        <th className="py-2.5 px-3">After</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {selectedLog.changes.map((ch, i) => (
                        <tr key={i} className="hover:bg-slate-900/30">
                          <td className="py-2.5 px-3 font-bold text-slate-300">{ch.field}</td>
                          <td className="py-2.5 px-3 text-rose-400 font-mono text-[11px]">{ch.before}</td>
                          <td className="py-2.5 px-3 text-emerald-400 font-mono text-[11px]">{ch.after}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Technical Details (Matching Spec) */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">Technical Details</h4>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2 text-slate-300">
                  <p>IP Address: <strong className="text-white font-mono">{selectedLog.ip}</strong></p>
                  <p>Client Device: <strong className="text-white">{selectedLog.device}</strong></p>
                  <p>Geo Location: <strong className="text-white">{selectedLog.location}</strong></p>
                  <p>Session ID: <strong className="text-violet-300 font-mono">{selectedLog.sessionId}</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
