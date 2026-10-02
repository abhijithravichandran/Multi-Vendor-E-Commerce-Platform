import React, { useState } from 'react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  CreditCard, DollarSign, Store, Truck, RefreshCcw, 
  ArrowUpRight, ArrowDownLeft, CheckCircle2, Clock, 
  AlertCircle, ShieldCheck, Download, Search, Check, 
  Ban, Settings, Sliders, Layers, User, Eye, ArrowRight, 
  RotateCcw, Sparkles
} from 'lucide-react';
import { CustomerPaymentModal } from './CustomerPaymentModal';
import { SellerPaymentModal } from './SellerPaymentModal';
import { DeliveryPaymentModal } from './DeliveryPaymentModal';

export const PaymentManagementView = () => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'customers' | 'sellers' | 'delivery' | 'payouts' | 'settings'

  // Sub-filters for individual sections
  const [customerFilter, setCustomerFilter] = useState('all'); // 'all' | 'successful' | 'pending' | 'failed' | 'refunds'
  const [sellerFilter, setSellerFilter] = useState('all'); // 'all' | 'pending' | 'completed' | 'commission' | 'refunds'
  const [deliveryFilter, setDeliveryFilter] = useState('all'); // 'all' | 'pending' | 'completed' | 'incentives'
  const [payoutFilter, setPayoutFilter] = useState('all'); // 'all' | 'seller' | 'delivery'

  // Selected modals
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [selectedDeliveryPartner, setSelectedDeliveryPartner] = useState(null);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // 1. CUSTOMER TRANSACTIONS
  const [customerTransactions, setCustomerTransactions] = useState([
    { txnId: '#PAY1024', customer: 'Vidhya Shri', customerId: 'CUS1024', email: 'vidhyashri8126@gmail.com', order: '#ORD4521', amount: 2499, method: 'UPI (GPay)', status: 'Paid', date: 'Oct 1', totalOrders: 24, totalPaid: 38450, refunds: 2500 },
    { txnId: '#PAY1025', customer: 'Arun Sharma', customerId: 'CUS1025', email: 'arun.sharma@gmail.com', order: '#ORD4522', amount: 1299, method: 'Card (HDFC)', status: 'Pending', date: 'Oct 1', totalOrders: 14, totalPaid: 19800, refunds: 0 },
    { txnId: '#PAY1026', customer: 'Priya Patel', customerId: 'CUS1026', email: 'priya.patel@gmail.com', order: '#ORD4523', amount: 899, method: 'UPI (PhonePe)', status: 'Failed', date: 'Sep 30', totalOrders: 18, totalPaid: 26400, refunds: 899 },
    { txnId: '#PAY1027', customer: 'Rahul Verma', customerId: 'CUS1027', email: 'rahul.verma@gmail.com', order: '#ORD4524', amount: 3450, method: 'UPI (Paytm)', status: 'Paid', date: 'Sep 29', totalOrders: 31, totalPaid: 52100, refunds: 1800 },
    { txnId: '#PAY1028', customer: 'Sneha Gupta', customerId: 'CUS1028', email: 'sneha.gupta@gmail.com', order: '#ORD4525', amount: 5200, method: 'Card (Axis)', status: 'Refunded', date: 'Sep 28', totalOrders: 9, totalPaid: 14200, refunds: 5200 },
    { txnId: '#PAY1029', customer: 'Vikram Singh', customerId: 'CUS1029', email: 'vikram.singh@gmail.com', order: '#ORD4526', amount: 1850, method: 'Net Banking', status: 'Paid', date: 'Sep 27', totalOrders: 6, totalPaid: 8900, refunds: 0 },
    { txnId: '#PAY1030', customer: 'Ananya Iyer', customerId: 'CUS1030', email: 'ananya.iyer@gmail.com', order: '#ORD4527', amount: 2890, method: 'UPI (GPay)', status: 'Paid', date: 'Sep 26', totalOrders: 22, totalPaid: 41300, refunds: 1200 }
  ]);

  // 2. SELLER PAYMENTS DATA
  const [sellerPaymentsList, setSellerPaymentsList] = useState([
    { id: 1, sellerId: 'SEL1024', storeName: 'ABC Electronics', orders: 856, grossSalesDisplay: '₹12.8L', grossSales: 1280000, commissionDisplay: '₹1.28L', commission: 128000, refundsDisplay: '₹20K', refunds: 20000, netEarningsDisplay: '₹11.32L', netEarnings: 1132000, paidDisplay: '₹10.9L', pendingDisplay: '₹42K', pendingPayout: 42000, status: 'Pending', bank: 'HDFC Bank (•••• 4829)' },
    { id: 2, sellerId: 'SEL1025', storeName: 'Fashion Hub', orders: 542, grossSalesDisplay: '₹8.4L', grossSales: 840000, commissionDisplay: '₹84K', commission: 84000, refundsDisplay: '₹12K', refunds: 12000, netEarningsDisplay: '₹7.44L', netEarnings: 744000, paidDisplay: '₹7.26L', pendingDisplay: '₹18K', pendingPayout: 18000, status: 'Ready', bank: 'ICICI Bank (•••• 2018)' },
    { id: 3, sellerId: 'SEL1026', storeName: 'Royal Rajasthan Handlooms', orders: 412, grossSalesDisplay: '₹6.5L', grossSales: 650000, commissionDisplay: '₹65K', commission: 65000, refundsDisplay: '₹8K', refunds: 8000, netEarningsDisplay: '₹5.77L', netEarnings: 577000, paidDisplay: '₹5.53L', pendingDisplay: '₹24K', pendingPayout: 24000, status: 'Pending', bank: 'SBI (•••• 9018)' },
    { id: 4, sellerId: 'SEL1027', storeName: 'Clay & Craft Pottery Co.', orders: 290, grossSalesDisplay: '₹3.8L', grossSales: 380000, commissionDisplay: '₹38K', commission: 38000, refundsDisplay: '₹5K', refunds: 5000, netEarningsDisplay: '₹3.37L', netEarnings: 337000, paidDisplay: '₹3.37L', pendingDisplay: '₹0', pendingPayout: 0, status: 'Paid', bank: 'Axis Bank (•••• 8918)' },
    { id: 5, sellerId: 'SEL1028', storeName: 'Deccan Brass & Bronzeware', orders: 380, grossSalesDisplay: '₹5.9L', grossSales: 590000, commissionDisplay: '₹59K', commission: 59000, refundsDisplay: '₹7K', refunds: 7000, netEarningsDisplay: '₹5.24L', netEarnings: 524000, paidDisplay: '₹4.93L', pendingDisplay: '₹31K', pendingPayout: 31000, status: 'Pending', bank: 'Canara Bank (•••• 3190)' }
  ]);

  // 3. DELIVERY PARTNER PAYMENTS DATA
  const [deliveryPaymentsList, setDeliveryPaymentsList] = useState([
    { id: 1, partnerId: 'DP1024', name: 'Arun Kumar', deliveries: 245, baseEarnings: 18375, incentives: 2000, deductions: 0, totalEarnings: 20375, pending: 4500, status: 'Pending', upi: 'arun@okhdfcbank' },
    { id: 2, partnerId: 'DP1025', name: 'Ravi S', deliveries: 198, baseEarnings: 14850, incentives: 1500, deductions: 200, totalEarnings: 16150, pending: 0, status: 'Paid', upi: 'ravi@oksbi' },
    { id: 3, partnerId: 'DP1026', name: 'Mohammad Tariq', deliveries: 210, baseEarnings: 15750, incentives: 1800, deductions: 0, totalEarnings: 17550, pending: 3200, status: 'Pending', upi: 'tariq@hdfc' },
    { id: 4, partnerId: 'DP1027', name: 'Satish Goud', deliveries: 280, baseEarnings: 21000, incentives: 2400, deductions: 100, totalEarnings: 23300, pending: 4100, status: 'Pending', upi: 'satish@ybl' },
    { id: 5, partnerId: 'DP1028', name: 'Karthik Raja', deliveries: 165, baseEarnings: 12375, incentives: 1200, deductions: 0, totalEarnings: 13575, pending: 2800, status: 'Pending', upi: 'karthik@icici' }
  ]);

  // 4. UNIFIED PAYOUTS QUEUE
  const [payoutsQueue, setPayoutsQueue] = useState([
    { id: '#PO1024', recipient: 'ABC Electronics', type: 'Seller', amount: 42000, method: 'Bank Transfer (NEFT)', status: 'Pending', date: 'Oct 1' },
    { id: '#PO1025', recipient: 'Arun Kumar', type: 'Delivery', amount: 4500, method: 'UPI (Auto-Pay)', status: 'Paid', date: 'Oct 1' },
    { id: '#PO1026', recipient: 'Fashion Hub', type: 'Seller', amount: 18000, method: 'Bank Transfer (RTGS)', status: 'Processing', date: 'Oct 1' },
    { id: '#PO1027', recipient: 'Satish Goud', type: 'Delivery', amount: 4100, method: 'UPI', status: 'Pending', date: 'Oct 1' },
    { id: '#PO1028', recipient: 'Deccan Brassware', type: 'Seller', amount: 31000, method: 'Bank Transfer', status: 'Pending', date: 'Oct 1' },
    { id: '#PO1029', recipient: 'Mohammad Tariq', type: 'Delivery', amount: 3200, method: 'UPI', status: 'Processing', date: 'Oct 1' }
  ]);

  // Handlers for state updates
  const handleReleaseSellerPayout = (id) => {
    setSellerPaymentsList(prev => prev.map(s => s.id === id ? { ...s, pendingDisplay: '₹0', pendingPayout: 0, status: 'Paid' } : s));
    if (selectedSeller && selectedSeller.id === id) {
      setSelectedSeller(prev => ({ ...prev, pendingDisplay: '₹0', pendingPayout: 0, status: 'Paid' }));
    }
  };

  const handleSettleDeliveryPayout = (id) => {
    setDeliveryPaymentsList(prev => prev.map(d => d.id === id ? { ...d, pending: 0, status: 'Paid' } : d));
    if (selectedDeliveryPartner && selectedDeliveryPartner.id === id) {
      setSelectedDeliveryPartner(prev => ({ ...prev, pending: 0, status: 'Paid' }));
    }
  };

  const handleAdvancePayoutStatus = (payoutId) => {
    setPayoutsQueue(prev => prev.map(p => {
      if (p.id === payoutId) {
        const nextStatus = p.status === 'Pending' ? 'Processing' : p.status === 'Processing' ? 'Paid' : 'Paid';
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Sidebar/Top Sub-navigation matching Exact Recommended Admin Structure */}
      <div className="flex flex-wrap gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs font-bold">
        {[
          { id: 'overview', label: '📊 Overview' },
          { id: 'customers', label: '👤 Customer Payments' },
          { id: 'sellers', label: '🏪 Seller Payments' },
          { id: 'delivery', label: '🚚 Delivery Partner Payments' },
          { id: 'payouts', label: '💰 Payouts' },
          { id: 'settings', label: '⚙️ Payment Settings' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSearchTerm(''); }}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === tab.id ? 'bg-violet-600 text-white shadow-md font-extrabold' : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 📊 1. PAYMENT OVERVIEW HEADER CARD (Exact Spec Mockup) */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl font-serif">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <CreditCard className="w-5 h-5 text-violet-400" />
            <h3 className="font-bold text-lg text-white">Payment Overview</h3>
          </div>
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-xl">
            Live Settlement Ledger
          </span>
        </div>

        {/* 6 Key Financial Metrics Grid Matching User ASCII Card */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs pt-1">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-slate-400 font-medium">Customer Payments</span>
            <p className="text-2xl font-extrabold text-emerald-400 mt-1">₹48.5L</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Total money collected from buyers</p>
          </div>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-slate-400 font-medium">Seller Payouts</span>
            <p className="text-2xl font-extrabold text-white mt-1">₹39.2L</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Money settled & owed to vendors</p>
          </div>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-slate-400 font-medium">Delivery Earnings</span>
            <p className="text-2xl font-extrabold text-violet-400 mt-1">₹4.8L</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Fleet dispatches & order pay</p>
          </div>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-slate-400 font-medium">Platform Revenue</span>
            <p className="text-2xl font-extrabold text-amber-300 mt-1">₹4.5L</p>
            <p className="text-[10px] text-slate-500 mt-0.5">10% Commission + marketplace fee</p>
          </div>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-slate-400 font-medium">Refunds</span>
            <p className="text-2xl font-extrabold text-rose-400 mt-1">₹1.2L</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Processed back to original sources</p>
          </div>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-slate-400 font-medium">Pending Payouts</span>
            <p className="text-2xl font-extrabold text-amber-400 mt-1">₹2.8L</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Weekly batch pending release</p>
          </div>
        </div>
      </div>

      {/* 👤 2. CUSTOMER PAYMENTS TAB */}
      {activeTab === 'customers' && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-lg text-white">Customer Payments</h3>
              <p className="text-slate-400 mt-0.5">Track and inspect every payment made by customers.</p>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search Txn ID / Customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-white text-xs w-64"
              />
            </div>
          </div>

          {/* Customer Sub-filters */}
          <div className="flex flex-wrap gap-2 pt-1 border-b border-slate-800 pb-3">
            {[
              { id: 'all', label: 'All Transactions' },
              { id: 'successful', label: '✅ Successful' },
              { id: 'pending', label: '⏳ Pending' },
              { id: 'failed', label: '❌ Failed' },
              { id: 'refunds', label: '🔄 Refunds' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setCustomerFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  customerFilter === f.id ? 'bg-violet-600 text-white shadow' : 'bg-slate-900 text-slate-300 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Customer Payment Table matching exact spec */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                  <th className="py-3 px-3">Transaction ID</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Order</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Method</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {customerTransactions
                  .filter(c => {
                    if (customerFilter === 'successful') return c.status === 'Paid';
                    if (customerFilter === 'pending') return c.status === 'Pending';
                    if (customerFilter === 'failed') return c.status === 'Failed';
                    if (customerFilter === 'refunds') return c.status === 'Refunded';
                    return true;
                  })
                  .filter(c => !searchTerm || c.txnId.toLowerCase().includes(searchTerm.toLowerCase()) || c.customer.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-violet-300">{row.txnId}</td>
                      <td className="py-3.5 px-3">
                        <button
                          onClick={() => setSelectedCustomer(row)}
                          className="font-bold text-white hover:text-violet-300 transition-colors flex items-center gap-1.5"
                        >
                          {row.customer}
                        </button>
                      </td>
                      <td className="py-3.5 px-3 text-slate-300 font-semibold">{row.order}</td>
                      <td className="py-3.5 px-3 font-extrabold text-white">₹{row.amount.toLocaleString()}</td>
                      <td className="py-3.5 px-3 text-slate-300">{row.method}</td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-300' :
                          row.status === 'Pending' ? 'bg-amber-500/20 text-amber-300' :
                          row.status === 'Failed' ? 'bg-rose-500/20 text-rose-300' : 'bg-cyan-500/20 text-cyan-300'
                        }`}>
                          {row.status === 'Paid' ? '✅ Paid' : row.status === 'Pending' ? '⏳ Pending' : row.status === 'Failed' ? '❌ Failed' : '🔄 Refunded'}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-400">{row.date}</td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => setSelectedCustomer(row)}
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

      {/* 🏪 3. SELLER PAYMENTS TAB */}
      {activeTab === 'sellers' && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-white">Seller Payments</h3>
              <p className="text-slate-400 mt-0.5">Platform calculates seller share after 10% commission deduction and pays vendor bank accounts.</p>
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold shadow text-xs">
              Execute Payout Run
            </button>
          </div>

          {/* Seller Transaction Example Banner (Exact Spec) */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400">Transaction Flow</span>
              <p className="font-bold text-white text-xs">Customer Pays ➔ Platform Commission (10%) ➔ Seller Net Earning ➔ Bank Payout</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="px-2.5 py-1 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">₹2,500</span>
              <span className="text-slate-500">➔</span>
              <span className="px-2.5 py-1 bg-violet-500/20 text-violet-300 rounded-xl border border-violet-500/30">₹250 Fee</span>
              <span className="text-slate-500">➔</span>
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-500/30">₹2,250 Payout</span>
            </div>
          </div>

          {/* Seller Sub-filters */}
          <div className="flex flex-wrap gap-2 pt-1 border-b border-slate-800 pb-3">
            {[
              { id: 'all', label: 'All Sellers' },
              { id: 'pending', label: '⏳ Pending Payouts' },
              { id: 'completed', label: '✅ Completed Payouts' },
              { id: 'commission', label: 'Platform Commissions' },
              { id: 'refunds', label: 'Refund Adjustments' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setSellerFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  sellerFilter === f.id ? 'bg-amber-600 text-slate-950 font-extrabold shadow' : 'bg-slate-900 text-slate-300 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Seller Payment Table matching exact spec */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                  <th className="py-3 px-3">Seller</th>
                  <th className="py-3 px-3">Orders</th>
                  <th className="py-3 px-3">Gross Sales</th>
                  <th className="py-3 px-3">Commission</th>
                  <th className="py-3 px-3">Refunds</th>
                  <th className="py-3 px-3">Net Earnings</th>
                  <th className="py-3 px-3">Pending</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {sellerPaymentsList
                  .filter(s => {
                    if (sellerFilter === 'pending') return s.pendingPayout > 0;
                    if (sellerFilter === 'completed') return s.pendingPayout === 0;
                    return true;
                  })
                  .map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3.5 px-3">
                        <button
                          onClick={() => setSelectedSeller(row)}
                          className="font-bold text-white hover:text-amber-300 transition-colors flex items-center gap-1.5"
                        >
                          {row.storeName}
                        </button>
                        <span className="text-[10px] text-slate-500 block">{row.sellerId}</span>
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-slate-300">{row.orders}</td>
                      <td className="py-3.5 px-3 font-bold text-white">{row.grossSalesDisplay}</td>
                      <td className="py-3.5 px-3 font-bold text-violet-400">{row.commissionDisplay}</td>
                      <td className="py-3.5 px-3 font-bold text-rose-400">{row.refundsDisplay}</td>
                      <td className="py-3.5 px-3 font-extrabold text-emerald-400">{row.netEarningsDisplay}</td>
                      <td className="py-3.5 px-3 font-extrabold text-amber-400">{row.pendingDisplay}</td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.status === 'Ready' ? 'bg-cyan-500/20 text-cyan-300' :
                          row.status === 'Pending' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center gap-2 justify-end">
                          {row.pendingPayout > 0 ? (
                            <button
                              onClick={() => handleReleaseSellerPayout(row.id)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-xl font-bold transition-all text-[11px]"
                            >
                              Pay Due
                            </button>
                          ) : (
                            <button
                              onClick={() => setSelectedSeller(row)}
                              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-xl font-bold transition-all text-[11px]"
                            >
                              Dossier
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 🚚 4. DELIVERY PARTNER PAYMENTS TAB */}
      {activeTab === 'delivery' && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-white">Delivery Partner Payments</h3>
              <p className="text-slate-400 mt-0.5">Calculated per delivery dispatch + on-time shift incentives.</p>
            </div>
            <button className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl font-bold shadow text-xs">
              Disburse Rider Settlements
            </button>
          </div>

          {/* Delivery Sub-filters */}
          <div className="flex flex-wrap gap-2 pt-1 border-b border-slate-800 pb-3">
            {[
              { id: 'all', label: 'All Riders' },
              { id: 'pending', label: '⏳ Pending Settlements' },
              { id: 'completed', label: '✅ Completed Payments' },
              { id: 'incentives', label: 'Peak Incentives' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setDeliveryFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  deliveryFilter === f.id ? 'bg-violet-600 text-white font-extrabold shadow' : 'bg-slate-900 text-slate-300 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Delivery Partner Payment Table matching exact spec */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                  <th className="py-3 px-3">Partner</th>
                  <th className="py-3 px-3">Deliveries</th>
                  <th className="py-3 px-3">Base Earnings</th>
                  <th className="py-3 px-3">Incentives</th>
                  <th className="py-3 px-3">Deductions</th>
                  <th className="py-3 px-3">Net Earnings</th>
                  <th className="py-3 px-3">Pending</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {deliveryPaymentsList
                  .filter(d => {
                    if (deliveryFilter === 'pending') return d.pending > 0;
                    if (deliveryFilter === 'completed') return d.pending === 0;
                    return true;
                  })
                  .map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3.5 px-3">
                        <button
                          onClick={() => setSelectedDeliveryPartner(row)}
                          className="font-bold text-white hover:text-violet-300 transition-colors flex items-center gap-1.5"
                        >
                          {row.name}
                        </button>
                        <span className="text-[10px] text-slate-500 block">{row.partnerId}</span>
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-slate-300">{row.deliveries}</td>
                      <td className="py-3.5 px-3 font-bold text-white">₹{row.baseEarnings.toLocaleString()}</td>
                      <td className="py-3.5 px-3 font-bold text-emerald-400">+₹{row.incentives.toLocaleString()}</td>
                      <td className="py-3.5 px-3 font-bold text-rose-400">-₹{row.deductions.toLocaleString()}</td>
                      <td className="py-3.5 px-3 font-extrabold text-violet-400">₹{row.totalEarnings.toLocaleString()}</td>
                      <td className="py-3.5 px-3 font-extrabold text-amber-400">₹{row.pending.toLocaleString()}</td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center gap-2 justify-end">
                          {row.pending > 0 ? (
                            <button
                              onClick={() => handleSettleDeliveryPayout(row.id)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-xl font-bold transition-all text-[11px]"
                            >
                              Settle
                            </button>
                          ) : (
                            <button
                              onClick={() => setSelectedDeliveryPartner(row)}
                              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-xl font-bold transition-all text-[11px]"
                            >
                              Dossier
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 💰 5. PAYOUTS TAB (Unified Common Payout System) */}
      {activeTab === 'payouts' && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-white">Unified Payout Management</h3>
              <p className="text-slate-400 mt-0.5">Common settlement engine underneath Seller and Delivery Partner payments.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-semibold">Lifecycle: Pending ➔ Processing ➔ Paid</span>
            </div>
          </div>

          {/* Payout Sub-filters */}
          <div className="flex flex-wrap gap-2 pt-1 border-b border-slate-800 pb-3">
            {[
              { id: 'all', label: 'All Payouts' },
              { id: 'seller', label: '🏪 Seller Payouts' },
              { id: 'delivery', label: '🚚 Delivery Partner Payouts' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setPayoutFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  payoutFilter === f.id ? 'bg-violet-600 text-white font-extrabold shadow' : 'bg-slate-900 text-slate-300 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Payout Table matching exact spec */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                  <th className="py-3 px-3">Payout ID</th>
                  <th className="py-3 px-3">Recipient</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Method</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {payoutsQueue
                  .filter(p => {
                    if (payoutFilter === 'seller') return p.type === 'Seller';
                    if (payoutFilter === 'delivery') return p.type === 'Delivery';
                    return true;
                  })
                  .map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-violet-300">{row.id}</td>
                      <td className="py-3.5 px-3 font-bold text-white">{row.recipient}</td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.type === 'Seller' ? 'bg-amber-500/20 text-amber-300' : 'bg-violet-500/20 text-violet-300'
                        }`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-extrabold text-white">₹{row.amount.toLocaleString()}</td>
                      <td className="py-3.5 px-3 text-slate-300">{row.method}</td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                          row.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-300' :
                          row.status === 'Processing' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {row.status === 'Paid' ? '✅ Paid' : row.status === 'Processing' ? '🔄 Processing' : '⏳ Pending'}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-400">{row.date}</td>
                      <td className="py-3.5 px-3 text-right">
                        {row.status !== 'Paid' ? (
                          <button
                            onClick={() => handleAdvancePayoutStatus(row.id)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-xl font-bold transition-all text-[11px]"
                          >
                            {row.status === 'Pending' ? 'Process' : 'Complete'}
                          </button>
                        ) : (
                          <span className="text-emerald-400 font-bold text-[11px]">✓ Settled</span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ⚙️ 6. PAYMENT SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-xl text-xs">
          <h3 className="font-bold text-lg text-white">Platform Payment Settings & Rules</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Payment Methods */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-white text-sm">Customer Payment Methods</h4>
              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded-xl">
                  <span>UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                  <span className="text-emerald-400 font-bold">Active</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded-xl">
                  <span>Credit & Debit Cards (Visa, Mastercard, RuPay)</span>
                  <span className="text-emerald-400 font-bold">Active</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded-xl">
                  <span>Net Banking (50+ Indian Banks)</span>
                  <span className="text-emerald-400 font-bold">Active</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded-xl">
                  <span>Zenvora Wallet & Credits</span>
                  <span className="text-emerald-400 font-bold">Active</span>
                </div>
              </div>
            </div>

            {/* Commission Settings */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-white text-sm">Seller Commission Settings</h4>
              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded-xl">
                  <span>Standard Marketplace Commission</span>
                  <span className="text-violet-400 font-bold">10% Flat</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded-xl">
                  <span>Electronics & Audio Category</span>
                  <span className="text-violet-400 font-bold">8% Category Override</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded-xl">
                  <span>Handloom & Artisans Rate</span>
                  <span className="text-emerald-400 font-bold">5% Subsidized</span>
                </div>
              </div>
            </div>

            {/* Delivery Charges */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-white text-sm">Delivery Rates & Charges</h4>
              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded-xl">
                  <span>Customer Standard Delivery Fee</span>
                  <span className="text-white font-bold">₹40 (Free on orders &gt; ₹999)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded-xl">
                  <span>Rider Base Delivery Payout</span>
                  <span className="text-emerald-400 font-bold">₹60 / fulfillment</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded-xl">
                  <span>Peak Weather / Festival Incentive</span>
                  <span className="text-amber-400 font-bold">+₹15 / order</span>
                </div>
              </div>
            </div>

            {/* Payout Cycles */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-white text-sm">Payout & Settlement Cycles</h4>
              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded-xl">
                  <span>Seller Settlement Cycle</span>
                  <span className="text-white font-bold">Weekly (Every Monday)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded-xl">
                  <span>Delivery Partner Settlement</span>
                  <span className="text-white font-bold">Weekly (Every Tuesday)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded-xl">
                  <span>Automated Instant UPI Payouts</span>
                  <span className="text-emerald-400 font-bold">Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INDIVIDUAL MODALS */}
      {selectedCustomer && (
        <CustomerPaymentModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}

      {selectedSeller && (
        <SellerPaymentModal
          seller={selectedSeller}
          onClose={() => setSelectedSeller(null)}
          onReleasePayout={handleReleaseSellerPayout}
        />
      )}

      {selectedDeliveryPartner && (
        <DeliveryPaymentModal
          partner={selectedDeliveryPartner}
          onClose={() => setSelectedDeliveryPartner(null)}
          onSettlePayout={handleSettleDeliveryPayout}
        />
      )}
    </div>
  );
};
