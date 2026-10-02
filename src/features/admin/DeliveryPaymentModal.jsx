import React, { useState } from 'react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  Truck, CheckCircle2, Clock, DollarSign, 
  ArrowRight, ShieldCheck, FileText, Check
} from 'lucide-react';

export const DeliveryPaymentModal = ({ partner, onClose, onSettlePayout }) => {
  const [modalTab, setModalTab] = useState('overview');

  if (!partner) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-serif">
        {/* Header Card Matching Exact Spec */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-violet-600/20 text-violet-400 font-extrabold flex items-center justify-center text-xl border border-violet-500/30">
                🚚
              </div>
              <div>
                <h3 className="font-bold text-xl text-white">{partner.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Partner ID: <span className="text-violet-300 font-semibold">{partner.partnerId || 'DP1024'}</span> • UPI: {partner.upi || 'arun@okhdfcbank'}
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
              <span className="text-slate-400">Deliveries</span>
              <p className="text-sm font-extrabold text-white mt-0.5">{partner.deliveries || 245}</p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Base Earnings</span>
              <p className="text-sm font-extrabold text-white mt-0.5">₹{(partner.baseEarnings || 18375).toLocaleString()}</p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Incentives</span>
              <p className="text-sm font-extrabold text-emerald-400 mt-0.5">₹{(partner.incentives || 2000).toLocaleString()}</p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Deductions</span>
              <p className="text-sm font-extrabold text-rose-400 mt-0.5">₹{(partner.deductions || 0).toLocaleString()}</p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Total Earnings</span>
              <p className="text-sm font-extrabold text-violet-400 mt-0.5">₹{(partner.totalEarnings || 20375).toLocaleString()}</p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Pending</span>
              <p className="text-sm font-extrabold text-amber-400 mt-0.5">₹{(partner.pending || 4500).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-800 px-6 overflow-x-auto gap-2 py-2 bg-slate-950 text-xs">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'deliveries', label: 'Deliveries' },
            { id: 'earnings', label: 'Earnings' },
            { id: 'incentives', label: 'Incentives' },
            { id: 'deductions', label: 'Deductions' },
            { id: 'payouts', label: 'Payouts' },
            { id: 'history', label: 'History' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setModalTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                modalTab === tab.id ? 'bg-violet-600 text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
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
              {/* Delivery Earnings Calculation Example */}
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-xs">💡 Delivery Earnings Example Breakdown</h4>
                <div className="space-y-1.5 text-[11px] pt-1">
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span>#DEL501 • Order #ORD4521</span>
                    <span className="text-slate-400">Base Pay: ₹60 | Incentive: <strong className="text-emerald-400">+₹10</strong></span>
                    <strong className="text-white">Total: ₹70</strong>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span>#DEL502 • Order #ORD4522</span>
                    <span className="text-slate-400">Base Pay: ₹65 | Incentive: ₹0</span>
                    <strong className="text-white">Total: ₹65</strong>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span>#DEL503 • Order #ORD4523</span>
                    <span className="text-slate-400">Base Pay: ₹55 | Incentive: <strong className="text-emerald-400">+₹15</strong></span>
                    <strong className="text-white">Total: ₹70</strong>
                  </div>
                </div>
              </div>

              {partner.pending > 0 && (
                <div className="p-4 bg-violet-500/10 border border-violet-500/30 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-violet-300">Pending Rider Settlement</p>
                    <p className="text-slate-400 text-[11px]">Ready for transfer to {partner.upi}</p>
                  </div>
                  <button
                    onClick={() => onSettlePayout && onSettlePayout(partner.id)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold shadow text-xs"
                  >
                    Settle Rider Payout (₹{(partner.pending || 4500).toLocaleString()})
                  </button>
                </div>
              )}
            </div>
          )}

          {modalTab === 'deliveries' && (
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm">Completed Delivery Trips ({partner.deliveries || 245})</h4>
              <p className="text-slate-400">Average fulfillment speed: 28.5 mins per dispatch.</p>
            </div>
          )}

          {modalTab === 'incentives' && (
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm">Performance Bonuses & Peak Incentives</h4>
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-white">Diwali Festive Peak Rush Bonus</p>
                  <p className="text-slate-400 text-[11px]">Achieved 15+ deliveries in a single shift</p>
                </div>
                <span className="font-bold text-emerald-400">+₹1,200</span>
              </div>
            </div>
          )}

          {modalTab === 'payouts' && (
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm">Rider Payout Transfer Records</h4>
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-white">UPI Transfer #PO1025</p>
                  <p className="text-slate-400 text-[11px]">Oct 1, 2026 • Sent to {partner.upi}</p>
                </div>
                <span className="font-bold text-emerald-400">₹4,500 (Paid)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
