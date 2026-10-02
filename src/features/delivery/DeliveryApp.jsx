import React, { useState } from 'react';
import { useStore } from '../../store/store';
import { Logo } from '../../components/common/Logo';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  Truck, MapPin, LayoutDashboard, Package, ClipboardList, Navigation, 
  History, DollarSign, CreditCard, Bell, Star, HelpCircle, User, Settings, LogOut, CheckCircle2, AlertCircle, Phone, Shield, MessageSquare, Send, RefreshCw
} from 'lucide-react';

export const DeliveryApp = () => {
  const { orders, logout, currentUser } = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [deliveryOpsSubTab, setDeliveryOpsSubTab] = useState('new'); // 'new' | 'my' | 'active' | 'history'
  const [isOnline, setIsOnline] = useState(true);

  // Notification bell state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Delivery Assigned', desc: 'Order #MH-2026001 is ready for pickup.', time: '10m ago', unread: true },
    { id: 2, title: 'Payout Credited', desc: '₹2,400 transferred to your HDFC bank account.', time: '1d ago', unread: false }
  ]);

  // Support Tickets chatbot state
  const [tickets, setTickets] = useState([
    { id: 201, subject: 'Route GPS Error', status: 'Open', messages: [
      { sender: 'driver', text: 'Navigation map showing incorrect address for Order #MH-2026004', time: 'Today' }
    ]}
  ]);
  const [newSubject, setNewSubject] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [activeTicketId, setActiveTicketId] = useState(201);
  const [replyText, setReplyText] = useState('');

  const deliveryTasks = orders.filter(o => ['shipped', 'out_for_delivery', 'delivered'].includes(o.status));
  const activeTask = deliveryTasks.find(o => o.status === 'out_for_delivery') || deliveryTasks[0];

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newSubject || !newMessage) return;
    const newT = {
      id: Date.now(),
      subject: newSubject,
      status: 'Open',
      messages: [{ sender: 'driver', text: newMessage, time: 'Just now' }]
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
          messages: [...t.messages, { sender: 'driver', text: replyText, time: 'Just now' }]
        };
      }
      return t;
    }));
    setReplyText('');
  };

  return (
    <div className="delivery-theme min-h-screen flex font-serif relative">
      {/* Sidebar with Logout at Bottom Left */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between sticky top-0 h-screen">
        <div>
          <div className="p-6 border-b border-slate-800">
            <Logo size="sm" lightText={false} />
          </div>

          <nav className="p-3 space-y-1.5 text-xs font-medium">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'delivery-ops', label: 'Delivery Ops', icon: Truck },
              { id: 'payment', label: 'Payment & Earnings', icon: CreditCard },
              { id: 'tickets', label: 'Support Tickets & Chat', icon: MessageSquare, badge: tickets.filter(t => t.status === 'Open').length },
              { id: 'profile', label: 'Profile & Settings', icon: User }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    isActive ? 'bg-amber-600 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-slate-950 text-white' : 'bg-slate-800 text-slate-300'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Left Logout */}
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
          <h2 className="font-bold text-base text-white capitalize">
            {activeTab === 'delivery-ops' ? `Delivery Ops > ${deliveryOpsSubTab}` : activeTab.replace('-', ' ')}
          </h2>

          <div className="flex items-center gap-4">
            {/* Online/Offline Status Toggle (No word 'Status', only Online name) */}
            <button
              onClick={() => setIsOnline(!isOnline)}
              className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs transition-all hover:border-slate-700"
            >
              <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`}></span>
              <span className={`font-bold ${isOnline ? 'text-emerald-400' : 'text-slate-400'}`}>{isOnline ? 'Online' : 'Offline'}</span>
            </button>

            {/* Notification Bell Symbol in Top Right */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-amber-400" />
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
                      className="text-[10px] text-amber-400 font-semibold hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="space-y-2.5 max-h-72 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-3 rounded-xl border ${n.unread ? 'bg-slate-900 border-amber-500/30' : 'bg-slate-950 border-slate-800'}`}>
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
          </div>
        </header>

        <div className="flex-1 p-6 space-y-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Today's Deliveries", val: '12', delta: 'On Track', icon: Truck },
                  { label: 'Active Order', val: activeTask ? '#'+activeTask.orderNo : 'None', delta: 'In Transit', icon: Navigation },
                  { label: "Today's Earnings", val: '₹1,850', delta: '+₹300 Bonus', icon: DollarSign },
                  { label: 'Rating', val: '4.9 ★', delta: 'Top Partner', icon: Star }
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="bg-slate-950 border border-slate-800 p-5 rounded-3xl space-y-3 shadow-md">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs">{stat.label}</span>
                        <Icon className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-2xl font-extrabold text-white">{stat.val}</h3>
                        <span className="text-[10px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded">{stat.delta}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <h3 className="font-bold text-base text-white">Active Assigned Tasks</h3>
                <div className="space-y-3">
                  {deliveryTasks.map(task => (
                    <div key={task.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-amber-400 text-sm">Order #{task.orderNo}</span>
                        <p className="text-slate-300 mt-1 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {task.shippingAddress.addressLine1}, {task.shippingAddress.city}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-white">COD: ₹{task.totals.grandTotal}</span>
                        <button onClick={() => { setActiveTab('delivery-ops'); setDeliveryOpsSubTab('active'); }} className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl shadow">
                          View Navigation
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Delivery Ops Row-wise Navigation Bar */}
          {activeTab === 'delivery-ops' && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                {[
                  { id: 'new', label: 'New Deliveries' },
                  { id: 'my', label: 'My Deliveries' },
                  { id: 'active', label: 'Active Delivery' },
                  { id: 'history', label: 'Delivery History' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setDeliveryOpsSubTab(sub.id)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      deliveryOpsSubTab === sub.id ? 'bg-amber-600 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>

              {deliveryOpsSubTab === 'new' && (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-white">Available Delivery Requests</h3>
                  {[1, 2, 3].map(n => (
                    <div key={n} className="bg-slate-950 border border-slate-800 p-6 rounded-3xl flex items-center justify-between text-xs shadow-xl">
                      <div className="space-y-1">
                        <span className="font-bold text-amber-400 text-sm">Request #DLV-90{n}4</span>
                        <p className="text-slate-300">Pickup: Artisan Hub Central · Drop: Sector {n+15}, City Center</p>
                        <p className="text-slate-400">Estimated Distance: {n*2.4} km · Payout: ₹{(n+2)*120}</p>
                      </div>
                      <button className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg">
                        Accept Delivery
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {deliveryOpsSubTab === 'my' && (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-white">My Assigned Deliveries</h3>
                  <div className="space-y-3">
                    {deliveryTasks.map(task => (
                      <div key={task.id} className="bg-slate-950 border border-slate-800 p-6 rounded-3xl flex items-center justify-between text-xs shadow-xl">
                        <div>
                          <span className="font-bold text-white text-sm">Order #{task.orderNo}</span>
                          <p className="text-slate-400 mt-1">Destination: {task.shippingAddress.addressLine1}, {task.shippingAddress.city}</p>
                        </div>
                        <StatusBadge status={task.status} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {deliveryOpsSubTab === 'active' && (
                <div className="max-w-2xl mx-auto bg-slate-950 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl">
                  <h3 className="font-bold text-xl text-white">Active Delivery Navigation</h3>
                  {activeTask ? (
                    <div className="space-y-4 text-xs">
                      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                        <p className="text-slate-400 font-bold">Pickup Location</p>
                        <p className="text-white text-sm font-semibold">Zenvora Central Warehouse, Connaught Place</p>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                        <p className="text-slate-400 font-bold">Customer Delivery Location</p>
                        <p className="text-white text-sm font-semibold">{activeTask.shippingAddress.addressLine1}, {activeTask.shippingAddress.city}</p>
                        <p className="text-slate-400">Contact: +91 98765 43210</p>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                        <p className="text-slate-400 font-bold">Order Details & COD</p>
                        <p className="text-white text-sm font-semibold">Order #{activeTask.orderNo} · Total COD: ₹{activeTask.totals.grandTotal}</p>
                      </div>
                      <button className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-3.5 rounded-xl shadow-lg transition-all">
                        Complete Delivery (Verify OTP)
                      </button>
                    </div>
                  ) : (
                    <p className="text-slate-400 text-xs">No active delivery currently in progress.</p>
                  )}
                </div>
              )}

              {deliveryOpsSubTab === 'history' && (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-white">Delivery History</h3>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map(n => (
                      <div key={n} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex items-center justify-between text-xs shadow">
                        <div>
                          <p className="font-bold text-white text-sm">Delivery #MH-20260{n} · Completed</p>
                          <p className="text-slate-400 mt-0.5">Delivered on Oct {n}, 2026 · Payout: ₹150</p>
                        </div>
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg font-bold">Success</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Payment & Earnings Menu */}
          {activeTab === 'payment' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <h3 className="font-bold text-xl text-white">Payment, Earnings & Bank Details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-2 shadow-xl">
                  <span className="text-xs text-slate-400">Daily Earnings</span>
                  <p className="text-2xl font-extrabold text-amber-400">₹1,850</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-2 shadow-xl">
                  <span className="text-xs text-slate-400">Weekly Earnings</span>
                  <p className="text-2xl font-extrabold text-white">₹12,400</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-2 shadow-xl">
                  <span className="text-xs text-slate-400">Monthly Earnings</span>
                  <p className="text-2xl font-extrabold text-white">₹48,900</p>
                </div>
              </div>

              {/* Earnings Graph */}
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
                <h4 className="font-bold text-white text-base">Weekly Earnings Trend</h4>
                <div className="h-40 flex items-end justify-between gap-3 pt-4 px-2 border-b border-slate-800 pb-3">
                  {[
                    { label: 'Week 1', rev: '11,000', height: '50%', color: 'from-[#008f88] to-[#00bcd4]' },
                    { label: 'Week 2', rev: '13,500', height: '70%', color: 'from-[#007a74] via-[#009688] to-[#22d3ee]' },
                    { label: 'Week 3', rev: '12,000', height: '60%', color: 'from-[#008f88] via-[#00bcd4] to-[#67e8f9]' },
                    { label: 'Week 4', rev: '15,400', height: '90%', color: 'from-[#007a74] via-[#00a896] to-[#00bcd4]' }
                  ].map((wk, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <span className="text-[10px] text-[#033c44] font-extrabold opacity-0 group-hover:opacity-100 transition-opacity">₹{wk.rev}</span>
                      <div className={`w-full bg-gradient-to-t ${wk.color} rounded-t-xl transition-all shadow-sm hover:brightness-110`} style={{ height: wk.height }}></div>
                      <span className="text-xs text-slate-400 font-semibold">{wk.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bank Details */}
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
                <h4 className="font-bold text-white text-base flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-400" /> Bank & Payout Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-900 rounded-2xl">
                    <p className="text-slate-400">Bank Name</p>
                    <p className="font-bold text-white text-sm">HDFC Bank India</p>
                  </div>
                  <div className="p-4 bg-slate-900 rounded-2xl">
                    <p className="text-slate-400">Account Number</p>
                    <p className="font-bold text-white text-sm">•••• •••• 8492</p>
                  </div>
                  <div className="p-4 bg-slate-900 rounded-2xl">
                    <p className="text-slate-400">IFSC Code</p>
                    <p className="font-bold text-white text-sm">HDFC0001234</p>
                  </div>
                  <div className="p-4 bg-slate-900 rounded-2xl">
                    <p className="text-slate-400">UPI Handle</p>
                    <p className="font-bold text-white text-sm">ramesh.kumar@hdfcbank</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Support Tickets & Chatbot Menu */}
          {activeTab === 'tickets' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xl text-white">Support Tickets & Chatbot</h3>
                  <p className="text-xs text-slate-400 mt-1">Raise delivery incidents or query support.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-950 border border-slate-800 p-5 rounded-3xl space-y-4 shadow-xl">
                  <h4 className="font-bold text-white text-sm">Your Tickets</h4>
                  <div className="space-y-2">
                    {tickets.map(t => (
                      <button
                        key={t.id}
                        onClick={() => setActiveTicketId(t.id)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs ${
                          activeTicketId === t.id ? 'bg-amber-600 text-slate-950 border-amber-500 shadow-md font-bold' : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
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
                      placeholder="Subject (e.g. Address incorrect)"
                      required
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                    />
                    <textarea
                      rows={2}
                      placeholder="Describe issue..."
                      required
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                    ></textarea>
                    <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-2 rounded-xl transition-all shadow-md">
                      Submit Ticket
                    </button>
                  </form>
                </div>

                <div className="md:col-span-2 bg-slate-950 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between shadow-xl h-[520px]">
                  {(() => {
                    const currentT = tickets.find(t => t.id === activeTicketId) || tickets[0];
                    if (!currentT) return <div className="text-slate-400 text-xs">Select a ticket.</div>;
                    return (
                      <>
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                          <div>
                            <h4 className="font-bold text-white text-base">{currentT.subject}</h4>
                            <p className="text-[10px] text-slate-400">Ticket ID: #{currentT.id}</p>
                          </div>
                          <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-xl text-xs font-bold">{currentT.status}</span>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3 py-4 text-xs">
                          {currentT.messages.map((m, idx) => (
                            <div key={idx} className={`flex flex-col ${m.sender === 'driver' ? 'items-end' : 'items-start'}`}>
                              <div className={`max-w-md p-3.5 rounded-2xl ${m.sender === 'driver' ? 'bg-amber-600 text-slate-950 rounded-br-none shadow-md font-semibold' : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'}`}>
                                <p>{m.text}</p>
                              </div>
                              <span className="text-[9px] text-slate-500 mt-1 px-1">{m.time}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-slate-800 flex gap-2">
                          <input
                            type="text"
                            placeholder="Type reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendReply(currentT.id)}
                            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white"
                          />
                          <button
                            onClick={() => handleSendReply(currentT.id)}
                            className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-5 rounded-xl text-xs flex items-center gap-1.5 shadow-md"
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

          {/* Profile & Settings Combined Menu */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl mx-auto bg-slate-950 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl text-xs">
              <h3 className="font-bold text-xl text-white">Profile & Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Partner Name</label>
                  <input type="text" defaultValue="Ramesh Kumar" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Vehicle Details</label>
                  <input type="text" defaultValue="Honda Activa EV (DL-08-9492)" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Driving License Number</label>
                  <input type="text" defaultValue="DL-1420200084920" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white" />
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">Driving License Photo</p>
                    <p className="text-[10px] text-emerald-400">Verified & Approved</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-bold">View</span>
                </div>
                <hr className="border-slate-800 my-2" />
                <h4 className="font-bold text-white text-sm">App Preferences</h4>
                <div className="flex justify-between items-center p-3 bg-slate-900 rounded-xl">
                  <span className="text-white font-semibold">Sound Alerts for New Deliveries</span>
                  <span className="text-emerald-400 font-bold">Enabled</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-900 rounded-xl">
                  <span className="text-white font-semibold">Dark Navigation Mode</span>
                  <span className="text-emerald-400 font-bold">Enabled</span>
                </div>
                <button className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg w-full">Save Changes</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
