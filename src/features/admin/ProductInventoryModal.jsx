import React, { useState } from 'react';
import { Package, ArrowUpRight, ArrowDownLeft, AlertTriangle, CheckCircle, RefreshCcw, Plus, Minus } from 'lucide-react';

export const ProductInventoryModal = ({ item, onClose, onAdjustStock }) => {
  const [stockDelta, setStockDelta] = useState('');
  const [reason, setReason] = useState('Stock Added');

  if (!item) return null;

  const movementHistory = [
    { type: 'add', delta: '+50', desc: 'Stock Added — Seller update', time: 'Today 10:15 AM' },
    { type: 'sub', delta: '−2', desc: 'Order #10452 fulfilled', time: 'Today 8:30 AM' },
    { type: 'sub', delta: '−1', desc: 'Order #10453 fulfilled', time: 'Yesterday 6:45 PM' },
    { type: 'add', delta: '+1', desc: 'Customer Return — Item inspected', time: 'Sep 29, 2026' },
    { type: 'sub', delta: '−3', desc: 'Damaged Stock write-off', time: 'Sep 27, 2026' }
  ];

  const handleApplyAdjustment = (e) => {
    e.preventDefault();
    const qty = parseInt(stockDelta, 10);
    if (isNaN(qty) || qty === 0) return;
    if (onAdjustStock) {
      onAdjustStock(item.id, qty, reason);
    }
    setStockDelta('');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-serif">
        {/* Header Matching User Spec */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 font-extrabold flex items-center justify-center text-xl border border-amber-500/30">
                📦
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">{item.title}</h3>
                <p className="text-xs text-slate-400">Seller: <strong className="text-amber-400">{item.sellerName}</strong> • SKU: #{item.sku || 'SKU-1048'}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm"
            >
              ✕
            </button>
          </div>

          {/* Key Inventory Spec Card */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Available</span>
              <p className="text-lg font-extrabold text-emerald-400 mt-0.5">{item.availableStock || item.stock}</p>
            </div>
            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Reserved</span>
              <p className="text-lg font-extrabold text-amber-400 mt-0.5">{item.reservedStock || 16}</p>
            </div>
            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Total Units</span>
              <p className="text-lg font-extrabold text-white mt-0.5">{(item.availableStock || item.stock) + (item.reservedStock || 16)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Reorder Level Threshold</span>
              <p className="text-base font-extrabold text-white mt-0.5">{item.reorderLevel || 25} Units</p>
            </div>
            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Total Stock Value</span>
              <p className="text-base font-extrabold text-amber-400 mt-0.5">₹{item.stockValue || '1,85,000'}</p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* Stock Adjustment Action */}
          <form onSubmit={handleApplyAdjustment} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="font-bold text-white text-sm">Quick Manual Stock Adjustment</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="number"
                placeholder="Qty (+/- units)"
                value={stockDelta}
                onChange={(e) => setStockDelta(e.target.value)}
                required
                className="bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
              />
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
              >
                <option value="Stock Added">Stock Added</option>
                <option value="Damaged Stock">Damaged Stock</option>
                <option value="Audit Correction">Audit Correction</option>
                <option value="Reserved Buffer">Reserved Buffer</option>
              </select>
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl transition-all shadow"
              >
                Apply Change
              </button>
            </div>
          </form>

          {/* Stock Movement History */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">🔄 Stock Movement History</h4>
            <div className="space-y-2">
              {movementHistory.map((mov, idx) => (
                <div key={idx} className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center text-xs ${
                      mov.type === 'add' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {mov.delta}
                    </span>
                    <div>
                      <p className="font-bold text-white">{mov.desc}</p>
                      <span className="text-[10px] text-slate-400">{mov.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
