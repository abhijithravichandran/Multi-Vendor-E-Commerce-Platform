import React, { useState } from 'react';
import { useStore } from '../../store/store';
import { Logo } from '../../components/common/Logo';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriceTag } from '../../components/common/PriceTag';
import { 
  LayoutDashboard, Package, ClipboardList, Warehouse, 
  BarChart3, Store, Plus, ShieldCheck, DollarSign, Clock, Star, Wallet, CheckSquare, Square, ArrowRight, User, MapPin, Phone, AlertTriangle, TrendingUp, RefreshCw, FileText, CreditCard, Award, LogOut, MessageSquare, Bell, Send, CheckCircle2 
} from 'lucide-react';

export const SellerDashboard = () => {
  const { sellers, products, orders, addProduct, updateOrderStatus, currentUser, logout } = useStore();
  const currentSeller = sellers[0];

  const [activeTab, setActiveTab] = useState('dashboard');
  const [fulfillmentSubTab, setFulfillmentSubTab] = useState('placed');
  const [inventorySubTab, setInventorySubTab] = useState('all');
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('1499');

  // Notifications state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Order Received', desc: 'Order #MH-2026001 placed successfully.', time: '10m ago', unread: true },
    { id: 2, title: 'KYC Approved', desc: 'Your business GSTIN & PAN documents verified.', time: '2h ago', unread: true },
    { id: 3, title: 'Payout Processed', desc: '₹48,290 transferred to your HDFC bank account.', time: '1d ago', unread: false }
  ]);

  // Support Tickets state
  const [tickets, setTickets] = useState([
    { id: 101, subject: 'Payout Delay Inquiry', status: 'Resolved', messages: [
      { sender: 'seller', text: 'When will my weekly payout reflect in my bank?', time: 'Yesterday' },
      { sender: 'support', text: 'Hello! Weekly payouts are processed every Monday. Your transfer is completed.', time: 'Yesterday' }
    ]},
    { id: 102, subject: 'Product Verification Help', status: 'Open', messages: [
      { sender: 'seller', text: 'My newly added handmade terracotta planter is pending review for 2 days.', time: 'Today' }
    ]}
  ]);
  const [newSubject, setNewSubject] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [activeTicketId, setActiveTicketId] = useState(102);
  const [replyText, setReplyText] = useState('');

  const sellerOrders = orders.filter(o => o.items.some(i => i.sellerId === currentSeller.id));
  const sellerProducts = products.filter(p => p.sellerId === currentSeller.id);

  const placedOrders = sellerOrders.filter(o => o.status === 'pending');
  const packedOrders = sellerOrders.filter(o => o.status === 'confirmed' || o.status === 'packed');
  const shippedOrders = sellerOrders.filter(o => o.status === 'shipped');
  const outForDeliveryOrders = sellerOrders.filter(o => o.status === 'out_for_delivery');
  const deliveredOrders = sellerOrders.filter(o => o.status === 'delivered');

  const inventoryItems = sellerProducts.map((p, idx) => ({
    ...p,
    stock: idx % 2 === 0 ? 4 : 45,
    soldCount: idx % 2 === 0 ? 12 : 0
  }));

  const restockItems = inventoryItems.filter(i => i.stock > 0 && i.stock <= 5);
  const activeSelledCount = inventoryItems.filter(i => i.soldCount > 0).length;
  const nonSelledCount = inventoryItems.filter(i => i.soldCount === 0).length;

  const handleCreateProduct = (e) => {
    e.preventDefault();
    addProduct({
      title: newTitle || 'Handcrafted Artisan Product',
      basePrice: Number(newPrice),
      sellerId: currentSeller.id
    });
    setNewTitle('');
    setActiveTab('products');
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newSubject || !newMessage) return;
    const newT = {
      id: Date.now(),
      subject: newSubject,
      status: 'Open',
      messages: [{ sender: 'seller', text: newMessage, time: 'Just now' }]
    };
    setTickets([newT, ...tickets]);
    setActiveTicketId(newT.id);
    setNewSubject('');
    setNewMessage('');
  };

  const handleSendReply = (ticketId) => {
    if (!replyText.trim()) return;
    setTickets(tickets.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          messages: [...t.messages, { sender: 'seller', text: replyText, time: 'Just now' }]
        };
      }
      return t;
    }));
    setReplyText('');
  };

  return (
    <div className="seller-theme min-h-screen flex font-serif relative">
      {/* Sidebar with Logout at Bottom Left */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between sticky top-0 h-screen">
        <div>
          <div className="p-6 border-b border-slate-800">
            <Logo size="sm" />
          </div>

          <nav className="p-4 space-y-1.5 text-xs font-medium">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'products', label: 'Products & Catalog', icon: Package, badge: sellerProducts.length },
              { id: 'orders', label: 'Orders & Fulfillment', icon: ClipboardList, badge: sellerOrders.length },
              { id: 'inventory', label: 'Inventory & Stock', icon: Warehouse, badge: restockItems.length },
              { id: 'analytics', label: 'Analytics & Revenue', icon: BarChart3 },
              { id: 'kyc', label: 'Business & KYC', icon: ShieldCheck },
              { id: 'tickets', label: 'Support Tickets & Chat', icon: MessageSquare, badge: tickets.filter(t => t.status === 'Open').length },
              { id: 'settings', label: 'Seller Profile & Settings', icon: Store }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    isActive ? 'bg-emerald-600 text-white font-bold shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-rose-500/20 text-rose-300'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Left Logout Option */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 font-bold text-xs transition-all"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Body */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-slate-950 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
          <h2 className="font-bold text-base text-white capitalize">{activeTab.replace('-', ' ')}</h2>
          <div className="flex items-center gap-4">
            {/* Notification Bell Symbol in Top Right */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-emerald-400" />
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-4 space-y-3 z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-bold text-white">Notifications</span>
                    <button
                      onClick={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))}
                      className="text-[10px] text-emerald-400 font-semibold hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="space-y-2.5 max-h-72 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-3 rounded-xl border ${n.unread ? 'bg-slate-900 border-emerald-500/30' : 'bg-slate-950 border-slate-800'}`}>
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-white">{n.title}</p>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-slate-300 mt-1">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setActiveTab('add-product')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md transition-all"
            >
              <Plus className="w-4 h-4" /> Add New Product
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 space-y-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Today's Revenue", val: '₹48,290', delta: '+12.4%', icon: DollarSign },
                  { label: 'Pending Orders', val: sellerOrders.length, delta: 'SLA Active', icon: Clock },
                  { label: 'Payout Balance', val: `₹${currentSeller.payoutBalance}`, delta: 'Ready', icon: Wallet },
                  { label: 'Store Rating', val: `${currentSeller.rating} ★`, delta: 'Top 5%', icon: Star }
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="bg-slate-950 border border-slate-800 p-5 rounded-3xl space-y-3 shadow-md">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs">{stat.label}</span>
                        <Icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-2xl font-extrabold text-white">{stat.val}</h3>
                        <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">{stat.delta}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Store Orders Visual Graph */}
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-emerald-400" /> Store Orders & Revenue Analytics (Weekly)
                  </h3>
                  <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-xl">Live Graph</span>
                </div>
                <div className="h-48 flex items-end justify-between gap-4 pt-6 px-4 border-b border-slate-800 pb-4">
                  {[
                    { day: 'Mon', orders: 12, rev: 18000, height: '40%' },
                    { day: 'Tue', orders: 18, rev: 27000, height: '60%' },
                    { day: 'Wed', orders: 15, rev: 22500, height: '50%' },
                    { day: 'Thu', orders: 25, rev: 41000, height: '80%' },
                    { day: 'Fri', orders: 22, rev: 35000, height: '70%' },
                    { day: 'Sat', orders: 32, rev: 54000, height: '100%' },
                    { day: 'Sun', orders: 28, rev: 48290, height: '90%' }
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <div className="text-[10px] text-emerald-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">₹{bar.rev}</div>
                      <div className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-xl transition-all group-hover:brightness-125" style={{ height: bar.height }}></div>
                      <span className="text-xs text-slate-400 font-semibold">{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <h3 className="font-bold text-base text-white">Recent Store Orders</h3>
                <div className="space-y-3">
                  {sellerOrders.map(ord => (
                    <div key={ord.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-white text-sm">{ord.orderNo}</p>
                        <p className="text-slate-400 mt-0.5">Placed on {new Date(ord.placedAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-white">₹{ord.totals.grandTotal}</span>
                        <StatusBadge status={ord.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-white">Catalog Products ({sellerProducts.length})</h3>
                <button onClick={() => setActiveTab('add-product')} className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-semibold">
                  + Add Product
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {sellerProducts.map(prod => (
                  <div key={prod.id} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
                    <img src={prod.images[0]} alt="" className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h4 className="font-bold text-sm text-white line-clamp-1">{prod.title}</h4>
                      <PriceTag price={prod.basePrice} mrp={prod.mrp} />
                      <div className="mt-3 flex items-center justify-between">
                        <StatusBadge status={prod.status} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inventory & Stock Menu */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-white">Inventory & Stock Management</h3>
                <div className="flex gap-2">
                  {[
                    { id: 'all', label: 'All Stock', count: inventoryItems.length },
                    { id: 'restock', label: 'Needs Restocking', count: restockItems.length }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setInventorySubTab(tab.id)}
                      className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all ${
                        inventorySubTab === tab.id ? 'bg-emerald-600 text-white border-emerald-500 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      {tab.label} ({tab.count})
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {(inventorySubTab === 'all' ? inventoryItems : restockItems).map(item => (
                  <div key={item.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex items-center justify-between text-xs shadow-md">
                    <div className="flex items-center gap-4">
                      <img src={item.images[0]} alt="" className="w-14 h-14 object-cover rounded-xl" />
                      <div>
                        <p className="font-bold text-white text-sm">{item.title}</p>
                        <p className="text-slate-400 mt-0.5">Price: ₹{item.basePrice} · SKU: {item.variants[0].sku}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-slate-400 text-[10px]">Current Stock</p>
                        <p className={`font-bold text-sm ${item.stock <= 5 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {item.stock} Units
                        </p>
                      </div>
                      <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold shadow-md flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5" /> Restock
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics & Revenue Menu */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-white">Analytics, Catalog & Revenue</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-2 shadow-xl">
                  <span className="text-xs text-slate-400">Total Earnings (Lifetime)</span>
                  <p className="text-2xl font-extrabold text-emerald-400">₹14,82,900</p>
                  <p className="text-[10px] text-slate-500">All-time marketplace payouts</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-2 shadow-xl">
                  <span className="text-xs text-slate-400">Today's Payments</span>
                  <p className="text-2xl font-extrabold text-white">₹48,290</p>
                  <p className="text-[10px] text-emerald-400">+18% vs yesterday</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-2 shadow-xl">
                  <span className="text-xs text-slate-400">Weekly Payments</span>
                  <p className="text-2xl font-extrabold text-white">₹2,84,500</p>
                  <p className="text-[10px] text-emerald-400">+12% this week</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-2 shadow-xl">
                  <span className="text-xs text-slate-400">Monthly Payments</span>
                  <p className="text-2xl font-extrabold text-white">₹12,45,000</p>
                  <p className="text-[10px] text-emerald-400">+24% this month</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
                  <h4 className="font-bold text-white text-base">Catalog Performance (Active / Selled / Non-Selled)</h4>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center p-4 bg-slate-900 rounded-2xl">
                      <span className="text-slate-300 font-semibold">Total Active Products</span>
                      <span className="font-bold text-white text-sm">{sellerProducts.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-900 rounded-2xl">
                      <span className="text-slate-300 font-semibold">Selled Products (With Sales)</span>
                      <span className="font-bold text-emerald-400 text-sm">{activeSelledCount}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-900 rounded-2xl">
                      <span className="text-slate-300 font-semibold">Non-Selled Products (Zero Sales)</span>
                      <span className="font-bold text-amber-400 text-sm">{nonSelledCount}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
                  <h4 className="font-bold text-white text-base">Revenue Trend Graph</h4>
                  <div className="h-40 flex items-end justify-between gap-3 pt-4 px-2 border-b border-slate-800 pb-3">
                    {[
                      { label: 'Week 1', rev: 240000, height: '40%' },
                      { label: 'Week 2', rev: 310000, height: '60%' },
                      { label: 'Week 3', rev: 290000, height: '55%' },
                      { label: 'Week 4', rev: 442900, height: '90%' }
                    ].map((wk, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                        <span className="text-[10px] text-emerald-400 font-bold opacity-0 group-hover:opacity-100">₹{wk.rev}</span>
                        <div className="w-full bg-gradient-to-t from-[#0d9488] to-[#14b8a6] rounded-t-xl transition-all shadow-sm hover:brightness-110" style={{ height: wk.height }}></div>
                        <span className="text-xs text-slate-400 font-semibold">{wk.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Orders & Fulfillment Queue */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="font-bold text-lg text-white">Orders & Fulfillment Queue</h3>

              <div className="flex flex-wrap gap-3">
                {[
                  { id: 'placed', label: 'Placed Orders', count: placedOrders.length },
                  { id: 'packed', label: 'Packed Products', count: packedOrders.length },
                  { id: 'shipped', label: 'Shipped Products', count: shippedOrders.length },
                  { id: 'out_for_delivery', label: 'Out for Delivery', count: outForDeliveryOrders.length },
                  { id: 'delivered', label: 'Order Delivered', count: deliveredOrders.length }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setFulfillmentSubTab(tab.id)}
                    className={`px-5 py-2.5 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2 ${
                      fulfillmentSubTab === tab.id ? 'bg-emerald-600 text-white border-emerald-500 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-900 text-slate-200">{tab.count}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {fulfillmentSubTab === 'placed' && (
                  <div className="space-y-4">
                    {placedOrders.length === 0 ? (
                      <div className="p-8 text-center bg-slate-950 border border-slate-800 rounded-3xl text-slate-400 text-xs">
                        No newly placed orders awaiting acceptance.
                      </div>
                    ) : (
                      placedOrders.map(ord => {
                        const prod = products.find(p => p.id === ord.items[0]?.productId) || products[0];
                        return (
                          <div key={ord.id} className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-amber-400 text-sm">Order #{ord.orderNo}</span>
                              <span className="text-xs text-slate-400">Placed on {new Date(ord.placedAt).toLocaleDateString()}</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs">
                              <div className="flex items-center gap-4">
                                <img src={prod.images[0]} alt="" className="w-16 h-16 rounded-xl object-cover" />
                                <div>
                                  <p className="font-bold text-white text-sm">{prod.title}</p>
                                  <p className="text-slate-400 mt-1">Qty: {ord.items[0]?.qty || 1} · Price: ₹{ord.totals.grandTotal}</p>
                                </div>
                              </div>

                              <div className="space-y-1.5 border-l border-slate-800 pl-4">
                                <p className="font-bold text-white flex items-center gap-1.5">
                                  <User className="w-3.5 h-3.5 text-emerald-400" /> {currentUser.name}
                                </p>
                                <p className="text-slate-300 flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {ord.shippingAddress.addressLine1}, {ord.shippingAddress.city}
                                </p>
                                <p className="text-slate-400 flex items-center gap-1.5">
                                  <Phone className="w-3.5 h-3.5 text-amber-400" /> +91 98765 43210
                                </p>
                              </div>
                            </div>

                            <div className="flex justify-end pt-2">
                              <button
                                onClick={() => {
                                  updateOrderStatus(ord.id, 'packed');
                                  setFulfillmentSubTab('packed');
                                }}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center gap-2"
                              >
                                Accept & Pack <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}

                {fulfillmentSubTab === 'packed' && (
                  <div className="space-y-4">
                    {packedOrders.length === 0 ? (
                      <div className="p-8 text-center bg-slate-950 border border-slate-800 rounded-3xl text-slate-400 text-xs">
                        No packed products in queue. Accept & Pack orders from Placed Orders.
                      </div>
                    ) : (
                      packedOrders.map(ord => (
                        <div key={ord.id} className="bg-slate-950 border border-slate-800 p-6 rounded-3xl flex items-center justify-between text-xs shadow-xl">
                          <div>
                            <p className="font-bold text-white text-base">Order #{ord.orderNo}</p>
                            <p className="text-slate-400 mt-1">Amount: ₹{ord.totals.grandTotal} · Ready for QC & Shipping</p>
                          </div>
                          <div className="flex items-center gap-3 bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-800">
                            <span className="font-bold text-emerald-400">Move to Shipped</span>
                            <input
                              type="checkbox"
                              onChange={(e) => e.target.checked && updateOrderStatus(ord.id, 'shipped')}
                              className="w-5 h-5 accent-emerald-500 cursor-pointer"
                              title="Check to move to shipped"
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {fulfillmentSubTab === 'shipped' && (
                  <div className="space-y-4">
                    {shippedOrders.length === 0 ? (
                      <div className="p-8 text-center bg-slate-950 border border-slate-800 rounded-3xl text-slate-400 text-xs">
                        No shipped products currently.
                      </div>
                    ) : (
                      shippedOrders.map(ord => (
                        <div key={ord.id} className="bg-slate-950 border border-slate-800 p-6 rounded-3xl flex items-center justify-between text-xs shadow-xl">
                          <div>
                            <p className="font-bold text-white text-base">Order #{ord.orderNo}</p>
                            <p className="text-slate-400 mt-1">Amount: ₹{ord.totals.grandTotal} · Handed to courier partner</p>
                          </div>
                          <div className="flex items-center gap-3 bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-800">
                            <span className="font-bold text-indigo-400">Move to Out for Delivery</span>
                            <input
                              type="checkbox"
                              onChange={(e) => e.target.checked && updateOrderStatus(ord.id, 'out_for_delivery')}
                              className="w-5 h-5 accent-indigo-500 cursor-pointer"
                              title="Check to move to out for delivery"
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {fulfillmentSubTab === 'out_for_delivery' && (
                  <div className="space-y-4">
                    {outForDeliveryOrders.length === 0 ? (
                      <div className="p-8 text-center bg-slate-950 border border-slate-800 rounded-3xl text-slate-400 text-xs">
                        No orders currently out for delivery.
                      </div>
                    ) : (
                      outForDeliveryOrders.map(ord => (
                        <div key={ord.id} className="bg-slate-950 border border-slate-800 p-6 rounded-3xl flex items-center justify-between text-xs shadow-xl">
                          <div>
                            <p className="font-bold text-white text-base">Order #{ord.orderNo}</p>
                            <p className="text-slate-400 mt-1">Amount: ₹{ord.totals.grandTotal} · Out with delivery rider</p>
                          </div>
                          <div className="flex items-center gap-3 bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-800">
                            <span className="font-bold text-emerald-400">Mark Delivered</span>
                            <input
                              type="checkbox"
                              onChange={(e) => e.target.checked && updateOrderStatus(ord.id, 'delivered')}
                              className="w-5 h-5 accent-emerald-500 cursor-pointer"
                              title="Check to deliver order"
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {fulfillmentSubTab === 'delivered' && (
                  <div className="space-y-4">
                    {deliveredOrders.length === 0 ? (
                      <div className="p-8 text-center bg-slate-950 border border-slate-800 rounded-3xl text-slate-400 text-xs">
                        No delivered orders yet.
                      </div>
                    ) : (
                      deliveredOrders.map(ord => (
                        <div key={ord.id} className="bg-slate-950 border border-emerald-500/40 p-6 rounded-3xl flex items-center justify-between text-xs shadow-xl">
                          <div>
                            <p className="font-bold text-white text-base">Order #{ord.orderNo}</p>
                            <p className="text-emerald-400 font-bold mt-1">✨ Order delivered, another happy customer!</p>
                          </div>
                          <StatusBadge status="delivered" />
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Support Tickets & Chatbot Menu */}
          {activeTab === 'tickets' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xl text-white">Support Tickets & Chatbot Help</h3>
                  <p className="text-xs text-slate-400 mt-1">Raise inquiries and chat with marketplace support.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Tickets List & New Ticket Form */}
                <div className="bg-slate-950 border border-slate-800 p-5 rounded-3xl space-y-4 shadow-xl">
                  <h4 className="font-bold text-white text-sm">Your Tickets</h4>
                  <div className="space-y-2">
                    {tickets.map(t => (
                      <button
                        key={t.id}
                        onClick={() => setActiveTicketId(t.id)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs ${
                          activeTicketId === t.id ? 'bg-emerald-600 text-white border-emerald-500 shadow-md font-bold' : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="line-clamp-1">{t.subject}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] ${t.status === 'Open' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                            {t.status}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <hr className="border-slate-800 my-2" />

                  <form onSubmit={handleCreateTicket} className="space-y-3 text-xs">
                    <p className="font-bold text-white">Raise New Ticket</p>
                    <input
                      type="text"
                      placeholder="Subject (e.g. Settlement issue)"
                      required
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                    />
                    <textarea
                      rows={2}
                      placeholder="Describe your issue..."
                      required
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                    ></textarea>
                    <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl transition-all shadow-md">
                      Submit Ticket
                    </button>
                  </form>
                </div>

                {/* Ticket Chatbot Thread & Reply */}
                <div className="md:col-span-2 bg-slate-950 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between shadow-xl h-[520px]">
                  {(() => {
                    const currentT = tickets.find(t => t.id === activeTicketId) || tickets[0];
                    if (!currentT) return <div className="text-slate-400 text-xs">Select a ticket to view conversation.</div>;
                    return (
                      <>
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                          <div>
                            <h4 className="font-bold text-white text-base">{currentT.subject}</h4>
                            <p className="text-[10px] text-slate-400">Ticket ID: #{currentT.id}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-xl text-xs font-bold ${currentT.status === 'Open' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                            {currentT.status}
                          </span>
                        </div>

                        {/* Messages Thread */}
                        <div className="flex-1 overflow-y-auto space-y-3 py-4 text-xs">
                          {currentT.messages.map((m, idx) => (
                            <div key={idx} className={`flex flex-col ${m.sender === 'seller' ? 'items-end' : 'items-start'}`}>
                              <div className={`max-w-md p-3.5 rounded-2xl ${m.sender === 'seller' ? 'bg-emerald-600 text-white rounded-br-none shadow-md' : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'}`}>
                                <p>{m.text}</p>
                              </div>
                              <span className="text-[9px] text-slate-500 mt-1 px-1">{m.time}</span>
                            </div>
                          ))}
                        </div>

                        {/* Reply Input */}
                        <div className="pt-4 border-t border-slate-800 flex gap-2">
                          <input
                            type="text"
                            placeholder="Type your reply here..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendReply(currentT.id)}
                            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white"
                          />
                          <button
                            onClick={() => handleSendReply(currentT.id)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md"
                          >
                            <Send className="w-3.5 h-3.5" /> Reply
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* Business & KYC Menu */}
          {activeTab === 'kyc' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <h3 className="font-bold text-xl text-white">Business & KYC Verification</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
                  <h4 className="font-bold text-white text-base flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-400" /> Bank & Payment Details
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-slate-900 rounded-xl">
                      <p className="text-slate-400">Bank Name</p>
                      <p className="font-bold text-white text-sm">HDFC Bank India</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl">
                      <p className="text-slate-400">Account Number</p>
                      <p className="font-bold text-white text-sm">•••• •••• 4892</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl">
                      <p className="text-slate-400">IFSC Code</p>
                      <p className="font-bold text-white text-sm">HDFC0001234</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl">
                      <p className="text-slate-400">UPI Handle</p>
                      <p className="font-bold text-white text-sm">zenvora.seller@hdfcbank</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
                  <h4 className="font-bold text-white text-base flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-400" /> Identity Documents & Certificates
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="p-4 bg-slate-900 rounded-2xl flex items-center justify-between">
                      <div>
                        <p className="font-bold text-white">Aadhar Card Photo</p>
                        <p className="text-[10px] text-emerald-400">Verified & Approved</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-bold">View</span>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-2xl flex items-center justify-between">
                      <div>
                        <p className="font-bold text-white">PAN Card Photo</p>
                        <p className="text-[10px] text-emerald-400">Verified & Approved</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-bold">View</span>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-2xl flex items-center justify-between border border-amber-500/30">
                      <div>
                        <p className="font-bold text-amber-400 flex items-center gap-1.5">
                          <Award className="w-4 h-4" /> Certificate of Seller (Admin Issued)
                        </p>
                        <p className="text-[10px] text-slate-300">Zenvora Certified Gold Merchant</p>
                      </div>
                      <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-xs font-bold">Download Certificate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Seller Profile & Settings Menu */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto bg-slate-950 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl">
              <h3 className="font-bold text-xl text-white">Seller Profile & Store Settings</h3>
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Store / Business Name</label>
                  <input type="text" defaultValue={currentSeller.name} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Owner / Representative Name</label>
                  <input type="text" defaultValue={currentUser.name} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Business Email</label>
                  <input type="email" defaultValue={currentUser.email} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Contact Phone</label>
                  <input type="text" defaultValue="+91 98765 43210" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Registered Business Address</label>
                  <textarea rows={3} defaultValue="Shop 12, Artisans Market Street, Connaught Place, New Delhi - 110001" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"></textarea>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg">Save Profile Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'add-product' && (
            <div className="max-w-2xl mx-auto bg-slate-950 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl">
              <h3 className="font-bold text-xl text-white">Add New Product</h3>
              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Handmade Terracotta Planter"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
                  />
                </div>
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all">
                  Submit Product for Review
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
