import React, { useState } from 'react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  Store, CheckCircle2, Clock, DollarSign, 
  ArrowRight, ShieldCheck, FileText, Check
} from 'lucide-react';

export const SellerPaymentModal = ({ seller, onClose, onReleasePayout }) => {
  const [modalTab, setModalTab] = useState('overview');

  if (!seller) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-serif">
        {/* Header Card Matching Exact Spec */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 font-extrabold flex items-center justify-center text-xl border border-amber-500/30">
                🏪
              </div>
              <div>
                <h3 className="font-bold text-xl text-white">{seller.storeName}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Seller ID: <span className="text-amber-300 font-semibold">{seller.sellerId || 'SEL1024'}</span> • {seller.bank || 'HDFC Bank (•••• 4829)'}
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

          {/* Quick Metrics Bar matching spec */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-2 border-t border-slate-800 text-xs">
            <div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Gross Sales</span>
              <p className="text-sm font-extrabold text-white mt-0.5">{seller.grossSalesDisplay || '₹12.8L'}</p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Commission</span>
              <p className="text-sm font-extrabold text-violet-400 mt-0.5">{seller.commissionDisplay || '₹1.28L'}</p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Net Earnings</span>
              <p className="text-sm font-extrabold text-emerald-400 mt-0.5">{seller.netEarningsDisplay || '₹11.32L'}</p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Paid</span>
              <p className="text-sm font-extrabold text-white mt-0.5">{seller.paidDisplay || '₹10.9L'}</p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Pending</span>
              <p className="text-sm font-extrabold text-amber-400 mt-0.5">{seller.pendingDisplay || '₹42K'}</p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Refunds</span>
              <p className="text-sm font-extrabold text-rose-400 mt-0.5">{seller.refundsDisplay || '₹20K'}</p>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-800 px-6 overflow-x-auto gap-2 py-2 bg-slate-950 text-xs">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'earnings', label: 'Earnings' },
            { id: 'orders', label: 'Orders' },
            { id: 'commission', label: 'Commission' },
            { id: 'payouts', label: 'Payouts' },
            { id: 'adjustments', label: 'Refund Adjustments' }
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {modalTab === 'overview' && (
            <div className="space-y-4">
              {/* Seller Transaction Example Banner */}
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-xs">💡 Seller Transaction Calculation Example</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-1">
                  <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px]">Customer Paid</span>
                    <p className="font-bold text-white mt-0.5">₹2,500</p>
                  </div>
                  <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px]">Platform Comm (10%)</span>
                    <p className="font-bold text-violet-400 mt-0.5">- ₹250</p>
                  </div>
                  <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px]">Seller Earning</span>
                    <p className="font-bold text-emerald-400 mt-0.5">₹2,250</p>
                  </div>
                  <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px]">Net Payout Released</span>
                    <p className="font-bold text-amber-300 mt-0.5">₹2,250</p>
                  </div>
                </div>
              </div>

              {seller.pendingPayout > 0 && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-amber-300">Pending Weekly Settlement Due</p>
                    <p className="text-slate-400 text-[11px]">Ready for batch release to {seller.bank}</p>
                  </div>
                  <button
                    onClick={() => onReleasePayout && onReleasePayout(seller.id)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold shadow text-xs"
                  >
                    Release Payout ({seller.pendingDisplay || '₹42K'})
                  </button>
                </div>
              )}
            </div>
          )}

          {modalTab === 'earnings' && (
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm">Seller Net Earnings Breakdown</h4>
              <p className="text-slate-400">Total net revenue earned by vendor after standard 10% marketplace commission deduction.</p>
            </div>
          )}

          {modalTab === 'commission' && (
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm">Platform Commission Deductions</h4>
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
                <p className="font-bold text-white">Marketplace Commission Rate: 10% Flat</p>
                <p className="text-slate-400">Total Retained Platform Revenue: {seller.commissionDisplay || '₹1.28L'}</p>
              </div>
            </div>
          )}

          {modalTab === 'payouts' && (
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm">Bank Payout Records</h4>
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Payout Batch #PO-8491 • NEFT</p>
                  <p className="text-slate-400 text-[11px]">Sep 25, 2026 • Credited to {seller.bank}</p>
                </div>
                <span className="text-emerald-400 font-bold">₹1,85,000 (Settled)</span>
              </div>
            </div>
          )}

          {modalTab === 'adjustments' && (
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm">Return & Refund Deductions</h4>
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Refund Adjustment #ADJ-204</p>
                  <p className="text-slate-400 text-[11px]">Customer returned defective headphone unit</p>
                </div>
                <span className="text-rose-400 font-bold">- ₹2,999</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
