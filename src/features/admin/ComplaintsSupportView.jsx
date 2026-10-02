import React, { useState } from 'react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  AlertCircle, MessageSquare, Send, User, Store, 
  Truck, CheckCircle2, Clock, XCircle, ShieldAlert, 
  Phone, ArrowRight, Filter, Search, PlusCircle, Check, 
  CornerDownRight, Zap, RefreshCcw
} from 'lucide-react';

export const ComplaintsSupportView = () => {
  const [activePersona, setActivePersona] = useState('customer'); // 'customer' | 'seller' | 'delivery' | 'all'
  const [activeTicketId, setActiveTicketId] = useState(1);
  const [replyText, setReplyText] = useState('');
  const [showRaiseModal, setShowRaiseModal] = useState(false);

  // New ticket state
  const [newPersona, setNewPersona] = useState('customer');
  const [newUserName, setNewUserName] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newOrderNo, setNewOrderNo] = useState('');
  const [newPriority, setNewPriority] = useState('High');
  const [newMessageText, setNewMessageText] = useState('');

  // Comprehensive Tickets List organized by Customer, Seller, Delivery Partner
  const [ticketsList, setTicketsList] = useState([
    // --- CUSTOMER COMPLAINTS ---
    {
      id: 1,
      persona: 'customer',
      ticketNo: '#CUST-401',
      subject: 'Damaged Terracotta Planter during shipping',
      userName: 'Vidhya Shri',
      userContact: '+91 98450 11223',
      orderNo: '#ORD-4521',
      priority: 'High',
      status: 'Open',
      createdAt: 'Today, 2:30 PM',
      messages: [
        { sender: 'customer', name: 'Vidhya Shri', text: 'Hi, I received order #ORD-4521 today, but the handcrafted terracotta planter arrived cracked at the rim. Please help with a replacement or refund.', time: '2:30 PM' },
        { sender: 'admin', name: 'Zenvora Support', text: 'Hello Vidhya, so sorry to hear this! Checking the logistics dispatch photos from Clay & Craft Pottery Co. right now.', time: '2:35 PM' }
      ]
    },
    {
      id: 2,
      persona: 'customer',
      ticketNo: '#CUST-402',
      subject: 'Delayed Kanjivaram Saree Delivery',
      userName: 'Priya Patel',
      userContact: '+91 98200 44556',
      orderNo: '#ORD-4523',
      priority: 'Medium',
      status: 'In Progress',
      createdAt: 'Today, 11:15 AM',
      messages: [
        { sender: 'customer', name: 'Priya Patel', text: 'Tracking shows the saree has been in transit for 4 days. Need it before Friday for pooja.', time: '11:15 AM' },
        { sender: 'admin', name: 'Zenvora Support', text: 'Hi Priya, we have escalated this with the Bangalore hub rider. Out for priority delivery today by 4 PM.', time: '11:30 AM' }
      ]
    },
    {
      id: 3,
      persona: 'customer',
      ticketNo: '#CUST-403',
      subject: 'Refund not reflected in bank account',
      userName: 'Rahul Sharma',
      userContact: '+91 98110 33221',
      orderNo: '#ORD-4480',
      priority: 'Urgent',
      status: 'Open',
      createdAt: 'Yesterday',
      messages: [
        { sender: 'customer', name: 'Rahul Sharma', text: 'Returned the defective headphones 3 days ago. Bank statement still does not show the ₹2,999 refund.', time: 'Yesterday' }
      ]
    },
    {
      id: 4,
      persona: 'customer',
      ticketNo: '#CUST-404',
      subject: 'Size Mismatch & Replacement Request',
      userName: 'Sneha Gupta',
      userContact: '+91 94401 88776',
      orderNo: '#ORD-4420',
      priority: 'Low',
      status: 'Resolved',
      createdAt: 'Sep 28',
      messages: [
        { sender: 'customer', name: 'Sneha Gupta', text: 'Size M Kurta is too tight, need size L.', time: 'Sep 28' },
        { sender: 'admin', name: 'Zenvora Support', text: 'Exchange order placed with Royal Rajasthan Handlooms at zero extra charge.', time: 'Sep 28' }
      ]
    },

    // --- SELLER COMPLAINTS ---
    {
      id: 5,
      persona: 'seller',
      ticketNo: '#SELL-301',
      subject: 'Vendor Payout & Commission Deduction Discrepancy',
      userName: 'ABC Electronics (Pawan Verma)',
      userContact: '+91 98400 99881',
      orderNo: '#ORD-4512',
      priority: 'High',
      status: 'Open',
      createdAt: 'Today, 1:45 PM',
      messages: [
        { sender: 'seller', name: 'ABC Electronics', text: 'My commission deduction for order #ORD-4512 was charged at 12% instead of the agreed 8% electronics rate. Please adjust the ₹480 difference.', time: '1:45 PM' },
        { sender: 'admin', name: 'Zenvora Support', text: 'Hello Pawan! Verifying your store category agreement with our finance desk.', time: '1:52 PM' }
      ]
    },
    {
      id: 6,
      persona: 'seller',
      ticketNo: '#SELL-302',
      subject: 'Customer Fraudulent Return Claim',
      userName: 'Royal Rajasthan Handlooms (Rameshwar)',
      userContact: '+91 98220 55441',
      orderNo: '#ORD-4491',
      priority: 'Urgent',
      status: 'In Progress',
      createdAt: 'Today, 10:20 AM',
      messages: [
        { sender: 'seller', name: 'Royal Rajasthan Handlooms', text: 'Buyer sent back an old cotton saree instead of the pure Kanjivaram silk saree we dispatched with security tag intact. We have unboxing video proof.', time: '10:20 AM' },
        { sender: 'admin', name: 'Zenvora Support', text: 'Evidence received. We have put the customer refund on hold and flagged the account for trust review.', time: '10:35 AM' }
      ]
    },
    {
      id: 7,
      persona: 'seller',
      ticketNo: '#SELL-303',
      subject: 'Weekly Payout Batch NEFT Delay',
      userName: 'Deccan Brass & Bronzeware (Suresh)',
      userContact: '+91 97410 22334',
      orderNo: 'Batch #PO-8491',
      priority: 'Medium',
      status: 'Open',
      createdAt: 'Yesterday',
      messages: [
        { sender: 'seller', name: 'Deccan Brassware', text: 'Our ₹34,200 payout for last week shows processed but not credited to our Canara Bank account.', time: 'Yesterday' }
      ]
    },

    // --- DELIVERY PARTNER COMPLAINTS ---
    {
      id: 8,
      persona: 'delivery',
      ticketNo: '#DELI-501',
      subject: 'Customer Address Incomplete / Phone Switched Off',
      userName: 'Ramesh Kumar (DEL-8492)',
      userContact: '+91 98450 11223',
      orderNo: '#ORD-4528',
      priority: 'Urgent',
      status: 'Open',
      createdAt: 'Today, 3:10 PM',
      messages: [
        { sender: 'delivery', name: 'Ramesh Kumar (Rider)', text: 'I am at Jayanagar 4th Block, but building number is missing from label. Customer phone is continuously switched off. Waiting at location for 15 mins.', time: '3:10 PM' },
        { sender: 'admin', name: 'Zenvora Support', text: 'Hold on Ramesh, we are checking alternative contact numbers and emergency WhatsApp confirmation.', time: '3:12 PM' }
      ]
    },
    {
      id: 9,
      persona: 'delivery',
      ticketNo: '#DELI-502',
      subject: 'Customer Refused Cash on Delivery (COD) Amount',
      userName: 'Arun Kumar (DP1024)',
      userContact: '+91 98200 66778',
      orderNo: '#ORD-4522',
      priority: 'High',
      status: 'In Progress',
      createdAt: 'Today, 12:45 PM',
      messages: [
        { sender: 'delivery', name: 'Arun Kumar (Rider)', text: 'Customer says they applied coupon and should pay ₹999 instead of ₹1,299 COD on invoice. Need confirmation.', time: '12:45 PM' },
        { sender: 'admin', name: 'Zenvora Support', text: 'Coupon FESTIVE20 had expired. Calling customer right away to explain invoice total.', time: '12:50 PM' }
      ]
    },
    {
      id: 10,
      persona: 'delivery',
      ticketNo: '#DELI-503',
      subject: 'Peak Rain Shift Incentive Not Credited',
      userName: 'Mohammad Tariq (DEL-8495)',
      userContact: '+91 98200 44556',
      orderNo: 'Shift #SH-901',
      priority: 'Medium',
      status: 'Resolved',
      createdAt: 'Sep 30',
      messages: [
        { sender: 'delivery', name: 'Mohammad Tariq', text: 'Completed 12 deliveries during heavy rain shift in Mumbai Central. Rain bonus ₹300 was not added to payout.', time: 'Sep 30' },
        { sender: 'admin', name: 'Zenvora Support', text: 'Approved and credited ₹300 to your UPI wallet directly.', time: 'Sep 30' }
      ]
    },
    {
      id: 11,
      persona: 'delivery',
      ticketNo: '#DELI-504',
      subject: 'EV Bike Flat Tyre - Emergency Route Transfer',
      userName: 'Satish Goud (DEL-8498)',
      userContact: '+91 94401 88776',
      orderNo: '3 Active Orders',
      priority: 'Critical',
      status: 'Resolved',
      createdAt: 'Sep 29',
      messages: [
        { sender: 'delivery', name: 'Satish Goud', text: 'Flat tyre near Madhapur flyover. Have 3 packages with 30-min ETA promise.', time: 'Sep 29' },
        { sender: 'admin', name: 'Zenvora Support', text: 'Backup rider Ramesh Kumar dispatched to pick up packages from your location.', time: 'Sep 29' }
      ]
    }
  ]);

  // Filtered tickets based on selected persona tab
  const filteredTickets = ticketsList.filter(t => {
    if (activePersona === 'all') return true;
    return t.persona === activePersona;
  });

  const currentTicket = ticketsList.find(t => t.id === activeTicketId) || filteredTickets[0] || ticketsList[0];

  const handleSendReply = (ticketId) => {
    if (!replyText.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;

    setTicketsList(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: t.status === 'Open' ? 'In Progress' : t.status,
          messages: [...t.messages, { sender: 'admin', name: 'Zenvora Support', text: replyText, time: timeStr }]
        };
      }
      return t;
    }));
    setReplyText('');
  };

  const handleUpdateStatus = (ticketId, newStatus) => {
    setTicketsList(prev => prev.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
  };

  const handleCreateNewTicket = (e) => {
    e.preventDefault();
    const newId = ticketsList.length + 1;
    const prefix = newPersona === 'customer' ? 'CUST' : newPersona === 'seller' ? 'SELL' : 'DELI';
    const newTicketObj = {
      id: newId,
      persona: newPersona,
      ticketNo: `#${prefix}-${500 + newId}`,
      subject: newSubject,
      userName: newUserName,
      userContact: '+91 98000 00000',
      orderNo: newOrderNo || 'N/A',
      priority: newPriority,
      status: 'Open',
      createdAt: 'Just now',
      messages: [
        { sender: newPersona, name: newUserName, text: newMessageText, time: 'Just now' }
      ]
    };
    setTicketsList([newTicketObj, ...ticketsList]);
    setActivePersona(newPersona);
    setActiveTicketId(newId);
    setShowRaiseModal(false);
    setNewUserName('');
    setNewSubject('');
    setNewOrderNo('');
    setNewMessageText('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Complaints, Disputes & Support Center</h2>
          <p className="text-xs text-slate-400 mt-1">
            Dedicated triage consoles for Customers, Sellers, and Delivery Partners with live dispute chats.
          </p>
        </div>

        <button
          onClick={() => setShowRaiseModal(true)}
          className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow flex items-center gap-1.5 self-start"
        >
          <PlusCircle className="w-4 h-4" /> Raise Support Ticket
        </button>
      </div>

      {/* 3 Dedicated Personas Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs font-bold">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'customer', label: '👤 Customer Complaints', count: ticketsList.filter(t => t.persona === 'customer' && t.status !== 'Resolved').length },
            { id: 'seller', label: '🏪 Seller Complaints', count: ticketsList.filter(t => t.persona === 'seller' && t.status !== 'Resolved').length },
            { id: 'delivery', label: '🛵 Delivery Partner Complaints', count: ticketsList.filter(t => t.persona === 'delivery' && t.status !== 'Resolved').length },
            { id: 'all', label: 'All Complaints', count: ticketsList.filter(t => t.status !== 'Resolved').length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActivePersona(tab.id);
                const firstInTab = ticketsList.find(t => tab.id === 'all' || t.persona === tab.id);
                if (firstInTab) setActiveTicketId(firstInTab.id);
              }}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                activePersona === tab.id 
                  ? 'bg-violet-600 text-white shadow-md font-extrabold' 
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-850'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                activePersona === tab.id ? 'bg-white/20 text-white' : 'bg-rose-500/20 text-rose-300'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="text-[11px] text-slate-400 font-semibold px-2">
          {filteredTickets.length} Total Tickets in view
        </div>
      </div>

      {/* Main 2-Column Split: Ticket List (Left) & Interactive Chat/Resolution Console (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: TICKET LIST */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-5 rounded-3xl space-y-4 shadow-xl text-xs font-serif">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h4 className="font-bold text-white text-sm">
              {activePersona === 'customer' ? 'Customer Tickets' :
               activePersona === 'seller' ? 'Seller Tickets' :
               activePersona === 'delivery' ? 'Delivery Partner Tickets' : 'All Marketplace Tickets'}
            </h4>
            <span className="text-[10px] text-slate-400 font-semibold">Priority Triage</span>
          </div>

          <div className="space-y-2.5 max-h-[560px] overflow-y-auto pr-1">
            {filteredTickets.map(t => (
              <div
                key={t.id}
                onClick={() => setActiveTicketId(t.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-2 ${
                  activeTicketId === t.id 
                    ? 'bg-violet-600/15 border-violet-500 shadow-md ring-1 ring-violet-500/30' 
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-violet-400">{t.ticketNo}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      t.persona === 'customer' ? 'bg-cyan-500/20 text-cyan-300' :
                      t.persona === 'seller' ? 'bg-amber-500/20 text-amber-300' : 'bg-fuchsia-500/20 text-fuchsia-300'
                    }`}>
                      {t.persona === 'customer' ? '👤 Customer' : t.persona === 'seller' ? '🏪 Seller' : '🛵 Rider'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      t.priority === 'Urgent' || t.priority === 'Critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse' :
                      t.priority === 'High' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {t.priority}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      t.status === 'Open' ? 'bg-rose-500/20 text-rose-300' :
                      t.status === 'In Progress' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                </div>

                <p className="font-bold text-white text-xs line-clamp-1">{t.subject}</p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                  <span className="font-medium text-slate-300">{t.userName}</span>
                  <span>{t.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE TICKET RESOLUTION & LIVE CHAT CONSOLE */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between shadow-xl min-h-[580px] font-serif text-xs">
          {currentTicket ? (
            <>
              {/* Ticket Details Header */}
              <div className="pb-4 border-b border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-violet-400 text-sm">{currentTicket.ticketNo}</span>
                      <h4 className="font-bold text-white text-base">{currentTicket.subject}</h4>
                    </div>
                    <p className="text-slate-400 mt-0.5">
                      Raised by: <strong className="text-white">{currentTicket.userName}</strong> • Phone: {currentTicket.userContact} • Order/Ref: <strong className="text-amber-300">{currentTicket.orderNo}</strong>
                    </p>
                  </div>

                  {/* Status Dropdown Switcher */}
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-semibold text-[11px]">Status:</span>
                    <select
                      value={currentTicket.status}
                      onChange={(e) => handleUpdateStatus(currentTicket.id, e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs font-bold"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Escalated">Escalated</option>
                    </select>
                  </div>
                </div>

                {/* Quick Action Resolution Presets based on Persona */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                  <span className="text-slate-500 font-bold uppercase text-[9px] tracking-wider">Quick Actions:</span>
                  {currentTicket.persona === 'customer' && (
                    <>
                      <button 
                        onClick={() => setReplyText('Refund of order total has been initiated to your original payment method.')}
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-emerald-300 px-2.5 py-1 rounded-lg font-bold"
                      >
                        ⚡ Issue Refund
                      </button>
                      <button 
                        onClick={() => setReplyText('We have instructed the seller to dispatch an immediate free replacement.')}
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-300 px-2.5 py-1 rounded-lg font-bold"
                      >
                        📦 Free Replacement
                      </button>
                    </>
                  )}
                  {currentTicket.persona === 'seller' && (
                    <>
                      <button 
                        onClick={() => setReplyText('Commission discrepancy verified. Adjusting the difference in your next payout batch.')}
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-300 px-2.5 py-1 rounded-lg font-bold"
                      >
                        💰 Adjust Commission
                      </button>
                      <button 
                        onClick={() => setReplyText('Customer return put on hold. Fraud investigation initiated with delivery partner.')}
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-rose-300 px-2.5 py-1 rounded-lg font-bold"
                      >
                        🛡️ Hold Fraud Return
                      </button>
                    </>
                  )}
                  {currentTicket.persona === 'delivery' && (
                    <>
                      <button 
                        onClick={() => setReplyText('Emergency backup rider dispatched to take over active orders.')}
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-violet-300 px-2.5 py-1 rounded-lg font-bold"
                      >
                        🛵 Dispatch Backup Rider
                      </button>
                      <button 
                        onClick={() => setReplyText('Rain / festival shift bonus approved and credited to UPI.')}
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-emerald-300 px-2.5 py-1 rounded-lg font-bold"
                      >
                        💳 Credit Shift Bonus
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Chat Conversation Scroll Area */}
              <div className="flex-1 overflow-y-auto space-y-3 py-4 max-h-[360px] pr-2">
                {currentTicket.messages.map((m, idx) => (
                  <div key={idx} className={`flex flex-col ${m.sender === 'admin' ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-400">
                      <span className="font-bold text-slate-300">{m.name}</span>
                      <span>•</span>
                      <span>{m.time}</span>
                    </div>
                    <div className={`max-w-lg p-3.5 rounded-2xl ${
                      m.sender === 'admin' 
                        ? 'bg-violet-600 text-white rounded-br-none shadow-md font-medium' 
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                    }`}>
                      <p>{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Box Footer */}
              <div className="pt-4 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  placeholder={`Reply to ${currentTicket.userName} (${currentTicket.persona})...`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendReply(currentTicket.id)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
                <button
                  onClick={() => handleSendReply(currentTicket.id)}
                  className="bg-violet-600 hover:bg-violet-500 text-white px-5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all shrink-0"
                >
                  <Send className="w-3.5 h-3.5" /> Reply
                </button>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-slate-400">Select a ticket to inspect dispute.</div>
          )}
        </div>
      </div>

      {/* RAISE NEW TICKET MODAL */}
      {showRaiseModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl font-serif text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">Raise Ticket or Dispute</h3>
              <button onClick={() => setShowRaiseModal(false)} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleCreateNewTicket} className="space-y-3.5">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Target Persona Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'customer', label: '👤 Customer' },
                    { id: 'seller', label: '🏪 Seller' },
                    { id: 'delivery', label: '🛵 Rider' }
                  ].map(p => (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => setNewPersona(p.id)}
                      className={`p-2 rounded-xl font-bold transition-all border ${
                        newPersona === p.id 
                          ? 'bg-violet-600 text-white border-violet-500 shadow' 
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">User Name / Store / Rider Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vidhya Shri or ABC Electronics"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Related Order / Batch #</label>
                  <input
                    type="text"
                    placeholder="e.g. #ORD-4521"
                    value={newOrderNo}
                    onChange={(e) => setNewOrderNo(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Damaged item during shipment"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Initial Dispute Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the complaint in detail..."
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRaiseModal(false)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold shadow"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
