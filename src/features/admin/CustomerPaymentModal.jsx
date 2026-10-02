import React, { useState } from 'react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  User, CheckCircle2, Clock, XCircle, ArrowUpRight, 
  CreditCard, DollarSign, RefreshCcw, FileText
} from 'lucide-react';

export const CustomerPaymentModal = ({ customer, onClose }) => {
  const [modalTab, setModalTab] = useState('overview');

  if (!customer) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-serif">
        {/* Header Card Matching Exact Spec */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-violet-600/20 text-violet-400 font-extrabold flex items-center justify-center text-xl border border-violet-500/30">
                👤
              </div>
              <div>
                <h3 className="font-bold text-xl text-white">{customer.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Customer ID: <span className="text-violet-300 font-semibold">{customer.customerId || 'CUS1024'}</span> • {customer.email}
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

          {/* Quick 4-Metric Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-800 text-xs">
            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Total Orders</span>
              <p className="text-base font-extrabold text-white mt-0.5">{customer.totalOrders || 24}</p>
            </div>
            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Total Paid</span>
              <p className="text-base font-extrabold text-emerald-400 mt-0.5">₹{(customer.totalPaid || 38450).toLocaleString()}</p>
            </div>
            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Refunds</span>
              <p className="text-base font-extrabold text-rose-400 mt-0.5">₹{(customer.refunds || 2500).toLocaleString()}</p>
            </div>
            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Pending</span>
              <p className="text-base font-extrabold text-amber-400 mt-0.5">₹0</p>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-800 px-6 gap-2 py-2 bg-slate-950 text-xs">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'transactions', label: 'Transactions' },
            { id: 'orders', label: 'Orders' },
            { id: 'refunds', label: 'Refunds' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setModalTab(tab.id)}
              className={`px-4 py-1.5 rounded-xl font-bold transition-all ${
                modalTab === tab.id ? 'bg-violet-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {modalTab === 'overview' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">Customer Payment Profile & Summary</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400">Preferred Payment Mode</span>
                  <p className="text-base font-bold text-white">UPI (Google Pay / PhonePe)</p>
                  <p className="text-[10px] text-emerald-400">75% transaction share</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400">Payment Success Rate</span>
                  <p className="text-base font-bold text-emerald-400">97.8%</p>
                  <p className="text-[10px] text-slate-400">Zero chargeback disputes</p>
                </div>
              </div>
            </div>
          )}

          {modalTab === 'transactions' && (
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm">Customer Transaction History</h4>
              <div className="space-y-2">
                {[
                  { date: 'Oct 1', order: '#ORD4521', amount: '₹2,499', method: 'UPI (GPay)', status: 'Paid', statusColor: 'bg-emerald-500/20 text-emerald-400' },
                  { date: 'Sep 28', order: '#ORD4490', amount: '₹1,899', method: 'HDFC Card', status: 'Paid', statusColor: 'bg-emerald-500/20 text-emerald-400' },
                  { date: 'Sep 24', order: '#ORD4421', amount: '₹3,200', method: 'UPI', status: 'Refunded', statusColor: 'bg-rose-500/20 text-rose-400' },
                  { date: 'Sep 15', order: '#ORD4390', amount: '₹1,450', method: 'UPI (PhonePe)', status: 'Paid', statusColor: 'bg-emerald-500/20 text-emerald-400' }
                ].map((txn, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{txn.order} • {txn.method}</p>
                      <p className="text-slate-400 text-[11px]">{txn.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">{txn.amount}</p>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${txn.statusColor}`}>{txn.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {modalTab === 'orders' && (
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm">Paid Orders ({customer.totalOrders || 24})</h4>
              <p className="text-slate-400">All customer orders have been successfully reconciled with payment gateways.</p>
            </div>
          )}

          {modalTab === 'refunds' && (
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm">Customer Refund Records</h4>
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Refund #REF-1092 • Order #ORD4421</p>
                  <p className="text-slate-400">Size return • Credited back to original UPI</p>
                </div>
                <span className="font-bold text-emerald-400">₹3,200 (Completed)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
