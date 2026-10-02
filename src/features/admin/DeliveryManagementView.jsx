import React, { useState } from 'react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  Truck, CheckCircle2, Clock, AlertTriangle, MapPin, 
  Phone, User, ShieldCheck, Navigation, Star, TrendingUp, 
  DollarSign, ArrowRight, Eye, Check, RefreshCw
} from 'lucide-react';

export const DeliveryManagementView = () => {
  const [subTab, setSubTab] = useState('partners'); // 'partners' | 'assign' | 'active' | 'history' | 'performance'
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [partnerModalTab, setPartnerModalTab] = useState('overview');

  const [partnersList, setPartnersList] = useState([
    {
      id: 1,
      name: 'Ramesh Kumar',
      partnerId: 'DEL-8492',
      phone: '+91 98450 11223',
      hub: 'Bangalore South Hub',
      city: 'Bangalore',
      vehicle: 'Ather 450X (EV Bike)',
      regNo: 'KA-05-EV-4891',
      status: 'On Route',
      rating: 4.9,
      totalDeliveries: 1240,
      onTimeRate: 98.6,
      todayDeliveries: 14,
      earnings: '48,200',
      activeOrder: 'ORD-9842 (Jayanagar 4th Block)',
      eta: '12 mins',
      history: [
        { orderNo: 'ORD-9830', customer: 'Vidhya S.', address: 'Indiranagar 100ft Rd', time: 'Today 2:15 PM', status: 'Delivered' },
        { orderNo: 'ORD-9821', customer: 'Rahul S.', address: 'Koramangala 5th Block', time: 'Today 1:10 PM', status: 'Delivered' },
        { orderNo: 'ORD-9812', customer: 'Priya P.', address: 'HSR Layout Sector 2', time: 'Today 11:45 AM', status: 'Delivered' }
      ]
    },
    {
      id: 2,
      name: 'Mohammad Tariq',
      partnerId: 'DEL-8495',
      phone: '+91 98200 44556',
      hub: 'Mumbai Central Hub',
      city: 'Mumbai',
      vehicle: 'Honda Activa 6G',
      regNo: 'MH-01-BK-2019',
      status: 'Available',
      rating: 4.8,
      totalDeliveries: 980,
      onTimeRate: 97.9,
      todayDeliveries: 11,
      earnings: '39,400',
      activeOrder: 'None (Standby at Hub)',
      eta: 'Available',
      history: [
        { orderNo: 'ORD-9801', customer: 'Deepika R.', address: 'Bandra West', time: 'Today 3:00 PM', status: 'Delivered' }
      ]
    },
    {
      id: 3,
      name: 'Satish Goud',
      partnerId: 'DEL-8498',
      phone: '+91 94401 88776',
      hub: 'Hyderabad Tech Hub',
      city: 'Hyderabad',
      vehicle: 'TVS iQube (EV)',
      regNo: 'TS-09-EV-3104',
      status: 'On Route',
      rating: 4.9,
      totalDeliveries: 1450,
      onTimeRate: 99.1,
      todayDeliveries: 16,
      earnings: '56,100',
      activeOrder: 'ORD-9848 (Madhapur Hitech City)',
      eta: '8 mins',
      history: [
        { orderNo: 'ORD-9835', customer: 'Ananya I.', address: 'Gachibowli', time: 'Today 2:30 PM', status: 'Delivered' }
      ]
    },
    {
      id: 4,
      name: 'Vikas Mehra',
      partnerId: 'DEL-8501',
      phone: '+91 98110 33221',
      hub: 'Delhi North Hub',
      city: 'New Delhi',
      vehicle: 'Hero Splendor Plus',
      regNo: 'DL-03-SA-9012',
      status: 'Available',
      rating: 4.7,
      totalDeliveries: 820,
      onTimeRate: 96.8,
      todayDeliveries: 8,
      earnings: '32,800',
      activeOrder: 'None (Standby at Hub)',
      eta: 'Available',
      history: [
        { orderNo: 'ORD-9799', customer: 'Amit K.', address: 'Rohini Sector 7', time: 'Today 1:45 PM', status: 'Delivered' }
      ]
    },
    {
      id: 5,
      name: 'Karthik Raja',
      partnerId: 'DEL-8504',
      phone: '+91 98400 99881',
      hub: 'Chennai Central Hub',
      city: 'Chennai',
      vehicle: 'Ola S1 Pro (EV)',
      regNo: 'TN-07-EV-8492',
      status: 'On Route',
      rating: 4.8,
      totalDeliveries: 1100,
      onTimeRate: 98.2,
      todayDeliveries: 13,
      earnings: '43,900',
      activeOrder: 'ORD-9852 (Anna Nagar West)',
      eta: '15 mins',
      history: [
        { orderNo: 'ORD-9828', customer: 'Vidhya S.', address: 'T Nagar Main Rd', time: 'Today 12:50 PM', status: 'Delivered' }
      ]
    }
  ]);

  const [unassignedOrders, setUnassignedOrders] = useState([
    { orderNo: 'ORD-9855', customer: 'Sneha Gupta', address: 'Salt Lake City, Kolkata', items: 'Handloom Silk Kurta', seller: 'Royal Rajasthan Handlooms' },
    { orderNo: 'ORD-9858', customer: 'Rajesh Verma', address: 'Gomti Nagar, Lucknow', items: 'Terracotta Urli Planter', seller: 'Clay & Craft Pottery Co.' }
  ]);

  const handleAssignOrder = (orderNo, partnerName) => {
    setUnassignedOrders(prev => prev.filter(o => o.orderNo !== orderNo));
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation tabs */}
      <div className="flex flex-wrap gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs font-bold">
        {[
          { id: 'partners', label: 'Delivery Partners' },
          { id: 'assign', label: `Assign Delivery (${unassignedOrders.length})` },
          { id: 'active', label: 'Active Live Deliveries' },
          { id: 'history', label: 'Delivery History' },
          { id: 'performance', label: 'Performance & SLA' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              subTab === tab.id ? 'bg-violet-600 text-white shadow-md font-extrabold' : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400">Active Delivery Fleet</span>
          <p className="text-2xl font-extrabold text-white">{partnersList.length} Partners</p>
          <span className="text-[10px] text-emerald-400 font-semibold">{partnersList.filter(p => p.status === 'On Route').length} Out on Route</span>
        </div>
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400">On-Time Delivery Rate</span>
          <p className="text-2xl font-extrabold text-emerald-400">98.5%</p>
          <span className="text-[10px] text-emerald-400 font-semibold">&lt; 34 min avg fulfillment</span>
        </div>
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400">Pending Assignment</span>
          <p className="text-2xl font-extrabold text-amber-400">{unassignedOrders.length}</p>
          <span className="text-[10px] text-slate-400 font-semibold">Immediate routing ready</span>
        </div>
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400">Green EV Deliveries</span>
          <p className="text-2xl font-extrabold text-violet-400">60% Fleet</p>
          <span className="text-[10px] text-emerald-400 font-semibold">Eco-friendly logistics</span>
        </div>
      </div>

      {/* Partners List */}
      {subTab === 'partners' && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-white">Delivery Fleet Partners ({partnersList.length})</h3>
              <p className="text-xs text-slate-400 mt-0.5">Click any delivery partner to inspect individual route, rating, and vehicle details.</p>
            </div>
          </div>

          <div className="space-y-3">
            {partnersList.map(partner => (
              <div
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className="bg-slate-900 border border-slate-800 hover:border-violet-500/50 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between text-xs cursor-pointer transition-all group gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-violet-600/20 text-violet-400 font-extrabold flex items-center justify-center text-xl border border-violet-500/30">
                    🛵
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-white text-sm group-hover:text-violet-300 transition-colors">{partner.name}</p>
                      <span className="text-slate-400 font-semibold">({partner.partnerId})</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        partner.status === 'On Route' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {partner.status}
                      </span>
                    </div>
                    <p className="text-slate-400 mt-1">
                      {partner.hub} • {partner.vehicle} ({partner.regNo}) • Phone: {partner.phone}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center md:text-right border-y md:border-y-0 md:border-l border-slate-800 py-2 md:py-0 md:pl-6">
                  <div>
                    <span className="text-[10px] text-slate-500">Deliveries</span>
                    <p className="font-extrabold text-white">{partner.totalDeliveries}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">On-Time %</span>
                    <p className="font-extrabold text-emerald-400">{partner.onTimeRate}%</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Rating</span>
                    <p className="font-extrabold text-amber-300">{partner.rating} ★</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 justify-end" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setSelectedPartner(partner)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl font-bold transition-all text-[11px] flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> Fleet Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assign Delivery tab */}
      {subTab === 'assign' && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-white">Unassigned Orders Waiting for Dispatch ({unassignedOrders.length})</h3>
            <span className="text-slate-400">Auto-dispatch routing active</span>
          </div>

          {unassignedOrders.length === 0 ? (
            <div className="p-8 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-400">
              ✓ All marketplace orders are currently assigned to active riders!
            </div>
          ) : (
            <div className="space-y-3">
              {unassignedOrders.map(order => (
                <div key={order.orderNo} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-white text-sm">{order.orderNo} — {order.items}</p>
                    <p className="text-slate-400 mt-0.5">Customer: {order.customer} • Destination: {order.address}</p>
                    <span className="text-[11px] text-amber-400 font-semibold">Pickup from: {order.seller}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <select 
                      id={`rider-select-${order.orderNo}`}
                      className="bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs"
                    >
                      {partnersList.map(p => (
                        <option key={p.id} value={p.name}>{p.name} ({p.status})</option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        const select = document.getElementById(`rider-select-${order.orderNo}`);
                        handleAssignOrder(order.orderNo, select ? select.value : 'Rider');
                      }}
                      className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-1.5 rounded-xl font-bold transition-all shadow"
                    >
                      Assign Rider
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Active Live Deliveries */}
      {subTab === 'active' && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
          <h3 className="font-bold text-lg text-white">Live Dispatches on Route</h3>
          <div className="space-y-3">
            {partnersList.filter(p => p.status === 'On Route').map(p => (
              <div key={p.id} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-white">{p.name} ({p.partnerId})</p>
                    <p className="text-slate-400 mt-0.5">Route: {p.activeOrder}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                    ETA: {p.eta}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1">Vehicle: {p.vehicle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delivery History */}
      {subTab === 'history' && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
          <h3 className="font-bold text-lg text-white">Recent Fulfilled Deliveries</h3>
          <div className="space-y-2">
            {[
              { id: 'ORD-9830', rider: 'Ramesh Kumar', customer: 'Vidhya S.', address: 'Indiranagar 100ft Rd', time: 'Today 2:15 PM', status: 'Delivered On-Time' },
              { id: 'ORD-9821', rider: 'Ramesh Kumar', customer: 'Rahul S.', address: 'Koramangala 5th Block', time: 'Today 1:10 PM', status: 'Delivered On-Time' },
              { id: 'ORD-9801', rider: 'Mohammad Tariq', customer: 'Deepika R.', address: 'Bandra West, Mumbai', time: 'Today 3:00 PM', status: 'Delivered On-Time' },
              { id: 'ORD-9780', rider: 'Satish Goud', customer: 'Ananya I.', address: 'Gachibowli, Hyderabad', time: 'Today 11:30 AM', status: 'Delivered On-Time' }
            ].map((del, idx) => (
              <div key={idx} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">{del.id} — Customer: {del.customer}</p>
                  <p className="text-slate-400">Rider: {del.rider} • {del.address}</p>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-xl font-bold bg-emerald-500/20 text-emerald-300">
                    {del.status}
                  </span>
                  <p className="text-slate-500 text-[10px] mt-1">{del.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance & SLA */}
      {subTab === 'performance' && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
          <h3 className="font-bold text-lg text-white">Fleet Performance & SLA Benchmarks</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Average Transit Time</span>
              <p className="text-2xl font-extrabold text-white mt-1">28.4 mins</p>
              <p className="text-[10px] text-emerald-400 mt-1">6 mins faster than SLA benchmark</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Customer Delivery Rating</span>
              <p className="text-2xl font-extrabold text-amber-300 mt-1">4.86 ★</p>
              <p className="text-[10px] text-emerald-400 mt-1">Based on 3,400+ delivery ratings</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Damage / Leakage Claims</span>
              <p className="text-2xl font-extrabold text-white mt-1">0.14%</p>
              <p className="text-[10px] text-emerald-400 mt-1">Negligible transit damage rate</p>
            </div>
          </div>
        </div>
      )}

      {/* Individual Delivery Partner Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-serif">
            {/* Header */}
            <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-violet-600/20 text-violet-400 font-extrabold flex items-center justify-center text-2xl border border-violet-500/30">
                    🛵
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-xl text-white">{selectedPartner.name}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        selectedPartner.status === 'On Route' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {selectedPartner.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      ID: {selectedPartner.partnerId} • Hub: {selectedPartner.hub} • Phone: {selectedPartner.phone}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPartner(null)}
                  className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-800 text-xs">
                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Total Deliveries</span>
                  <p className="text-base font-extrabold text-white mt-0.5">{selectedPartner.totalDeliveries}</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">On-Time %</span>
                  <p className="text-base font-extrabold text-emerald-400 mt-0.5">{selectedPartner.onTimeRate}%</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Rider Rating</span>
                  <p className="text-base font-extrabold text-amber-300 mt-0.5">{selectedPartner.rating} ⭐</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Lifetime Earnings</span>
                  <p className="text-base font-extrabold text-violet-400 mt-0.5">₹{selectedPartner.earnings}</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm">Vehicle & Compliance Information</h4>
                <p className="text-slate-300">Vehicle: <strong className="text-white">{selectedPartner.vehicle}</strong></p>
                <p className="text-slate-300">Registration Number: <strong className="text-white">{selectedPartner.regNo}</strong></p>
                <p className="text-slate-300">Driving License: <strong className="text-emerald-400">Verified & Active</strong></p>
                <p className="text-slate-300">Active Route: <strong className="text-violet-400">{selectedPartner.activeOrder}</strong></p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-white text-sm">Recent Delivery Logs</h4>
                {selectedPartner.history.map((h, i) => (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{h.orderNo} — {h.customer}</p>
                      <p className="text-slate-400">{h.address}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-400 font-bold">{h.status}</span>
                      <p className="text-[10px] text-slate-500">{h.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
