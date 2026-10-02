import React, { useState } from 'react';
import { useStore } from '../../store/store';
import { Logo } from '../../components/common/Logo';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  LayoutDashboard, Users, Store, Shield, DollarSign, Package, 
  ClipboardList, Truck, CreditCard, RefreshCcw, Tag, BarChart3, 
  AlertCircle, Settings, FileText, Bell, LogOut, ArrowRight, CheckCircle2, XCircle, MessageSquare, Send, User, ShoppingBag, Heart, Star, Clock, MapPin, Phone, Mail
} from 'lucide-react';
import { SellerManagementView } from './SellerManagementView';
import { CustomerManagementModal } from './CustomerManagementModal';
import { ProductManagementView } from './ProductManagementView';
import { DeliveryManagementView } from './DeliveryManagementView';
import { PaymentManagementView } from './PaymentManagementView';
import { ReportsAnalyticsView } from './ReportsAnalyticsView';
import { ComplaintsSupportView } from './ComplaintsSupportView';
import { AdminSettingsView } from './AdminSettingsView';
import { AuditLogsView } from './AuditLogsView';
import { DashboardOverview } from './DashboardOverview';

export const AdminConsole = () => {
  const { orders, sellers, products, logout, currentUser } = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sub-tabs for Admin Hub
  const [adminHubSubTab, setAdminHubSubTab] = useState('users'); // 'users' | 'sellers' | 'products' | 'delivery'
  const [productSubTab, setProductSubTab] = useState('category'); // 'category' | 'inventory' | 'orders' | 'all'

  // Selected customer for individual deep-dive analytics modal
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerModalTab, setCustomerModalTab] = useState('overview'); // 'overview' | 'activity' | 'orders' | 'payments' | 'cart' | 'reviews' | 'returns' | 'support'

  // 10 Detailed customers mock list
  const [customersList] = useState([
    { id: 1, name: 'Vidhya Shri', email: 'vidhyashri8126@gmail.com', phone: '+91 98765 43210', location: 'Chennai, India', joined: 'Jan 2026', status: 'Active', totalOrders: 24, totalSpent: 38450, avgOrderVal: 1602, totalLogins: 156, lastLogin: 'Today, 8:42 PM', productsViewed: 342, wishlistItems: 18, cartItems: 5, reviewsGiven: 12, returns: 2, couponsUsed: 8 },
    { id: 2, name: 'Rahul Sharma', email: 'rahul.sharma@gmail.com', phone: '+91 91234 56789', location: 'New Delhi, India', joined: 'Feb 2026', status: 'Active', totalOrders: 18, totalSpent: 29200, avgOrderVal: 1622, totalLogins: 98, lastLogin: 'Yesterday, 4:15 PM', productsViewed: 215, wishlistItems: 12, cartItems: 2, reviewsGiven: 8, returns: 1, couponsUsed: 5 },
    { id: 3, name: 'Priya Patel', email: 'priya.patel@gmail.com', phone: '+91 99887 76655', location: 'Mumbai, India', joined: 'Nov 2025', status: 'Active', totalOrders: 31, totalSpent: 64100, avgOrderVal: 2067, totalLogins: 210, lastLogin: 'Today, 11:20 AM', productsViewed: 480, wishlistItems: 24, cartItems: 7, reviewsGiven: 19, returns: 3, couponsUsed: 12 },
    { id: 4, name: 'Amit Kumar', email: 'amit.kumar@gmail.com', phone: '+91 98111 22334', location: 'Bangalore, India', joined: 'Dec 2025', status: 'Active', totalOrders: 12, totalSpent: 18500, avgOrderVal: 1541, totalLogins: 64, lastLogin: '2 days ago', productsViewed: 145, wishlistItems: 8, cartItems: 1, reviewsGiven: 5, returns: 0, couponsUsed: 4 },
    { id: 5, name: 'Sneha Gupta', email: 'sneha.gupta@gmail.com', phone: '+91 97222 33445', location: 'Kolkata, India', joined: 'Mar 2026', status: 'Active', totalOrders: 9, totalSpent: 14200, avgOrderVal: 1577, totalLogins: 45, lastLogin: 'Today, 1:10 PM', productsViewed: 110, wishlistItems: 14, cartItems: 3, reviewsGiven: 4, returns: 1, couponsUsed: 3 },
    { id: 6, name: 'Vikram Singh', email: 'vikram.singh@gmail.com', phone: '+91 96333 44556', location: 'Jaipur, India', joined: 'Jan 2026', status: 'Inactive', totalOrders: 4, totalSpent: 6200, avgOrderVal: 1550, totalLogins: 22, lastLogin: '2 weeks ago', productsViewed: 60, wishlistItems: 5, cartItems: 0, reviewsGiven: 2, returns: 0, couponsUsed: 1 },
    { id: 7, name: 'Ananya Iyer', email: 'ananya.iyer@gmail.com', phone: '+91 95444 55667', location: 'Hyderabad, India', joined: 'Feb 2026', status: 'Active', totalOrders: 22, totalSpent: 41300, avgOrderVal: 1877, totalLogins: 140, lastLogin: 'Today, 9:05 AM', productsViewed: 310, wishlistItems: 19, cartItems: 4, reviewsGiven: 14, returns: 2, couponsUsed: 9 },
    { id: 8, name: 'Karan Mehta', email: 'karan.mehta@gmail.com', phone: '+91 94555 66778', location: 'Pune, India', joined: 'Dec 2025', status: 'Blocked', totalOrders: 2, totalSpent: 1900, avgOrderVal: 950, totalLogins: 18, lastLogin: '1 month ago', productsViewed: 45, wishlistItems: 2, cartItems: 0, reviewsGiven: 0, returns: 1, couponsUsed: 0 },
    { id: 9, name: 'Deepika Roy', email: 'deepika.roy@gmail.com', phone: '+91 93666 77889', location: 'Ahmedabad, India', joined: 'Jan 2026', status: 'Active', totalOrders: 15, totalSpent: 22800, avgOrderVal: 1520, totalLogins: 88, lastLogin: 'Yesterday, 7:30 PM', productsViewed: 190, wishlistItems: 11, cartItems: 2, reviewsGiven: 7, returns: 0, couponsUsed: 6 },
    { id: 10, name: 'Rajesh Verma', email: 'rajesh.verma@gmail.com', phone: '+91 92777 88990', location: 'Lucknow, India', joined: 'Feb 2026', status: 'Active', totalOrders: 19, totalSpent: 29500, avgOrderVal: 1552, totalLogins: 105, lastLogin: 'Today, 2:40 PM', productsViewed: 240, wishlistItems: 16, cartItems: 3, reviewsGiven: 9, returns: 1, couponsUsed: 7 }
  ]);

  // Sub-tabs for Payment Management
  const [paymentSubTab, setPaymentSubTab] = useState('seller_payments'); // 'seller_payments' | 'returns' | 'refunds' | 'coupons' | 'transactions'

  // Complaints & Support chatbot state
  const [tickets, setTickets] = useState([
    { id: 301, subject: 'Vendor Payout Dispute #SR-492', status: 'Open', messages: [
      { sender: 'seller', text: 'My commission deduction for order #MH-2026012 is incorrect.', time: 'Today' },
      { sender: 'admin', text: 'Hello! Checking the transaction logs now.', time: 'Today' }
    ]},
    { id: 302, subject: 'Customer Return Fraud Claim', status: 'Resolved', messages: [
      { sender: 'seller', text: 'Customer returned an empty box instead of handicrafts.', time: 'Yesterday' }
    ]}
  ]);
  const [newSubject, setNewSubject] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [activeTicketId, setActiveTicketId] = useState(301);
  const [replyText, setReplyText] = useState('');

  // Notifications state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Seller KYC', desc: 'Crafts India submitted GSTIN & PAN documents for approval.', time: '15m ago', unread: true },
    { id: 2, title: 'High Refund Request', desc: 'Order #MH-2026042 requested item return.', time: '2h ago', unread: true },
    { id: 3, title: 'Payout Batches Settled', desc: 'Successfully transferred ₹14,82,900 to seller accounts.', time: '1d ago', unread: false }
  ]);

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newSubject || !newMessage) return;
    const newT = {
      id: Date.now(),
      subject: newSubject,
      status: 'Open',
      messages: [{ sender: 'admin', text: newMessage, time: 'Just now' }]
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
          messages: [...t.messages, { sender: 'admin', text: replyText, time: 'Just now' }]
        };
      }
      return t;
    }));
    setReplyText('');
  };

  return (
    <div className="admin-theme min-h-screen flex font-serif relative">
      {/* Sidebar with Logout at Bottom Left */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between sticky top-0 h-screen">
        <div>
          <div className="p-6 border-b border-slate-800">
            <Logo size="sm" lightText={false} />
          </div>

          <nav className="p-3 space-y-1 text-xs font-medium overflow-y-auto max-h-[calc(100vh-180px)]">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'admin-hub', label: 'Admin Hub', icon: Shield },
              { id: 'payments', label: 'Payments', icon: CreditCard },
              { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
              { id: 'complaints', label: 'Complaints & Support', icon: AlertCircle, badge: tickets.filter(t => t.status === 'Open').length },
              { id: 'settings', label: 'Settings', icon: Settings },
              { id: 'audit-logs', label: 'Audit Logs', icon: FileText }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    isActive ? 'bg-violet-600 text-white font-bold shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
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
          <h2 className="font-bold text-base text-white capitalize">{activeTab.replace('-', ' ')} Console</h2>

          <div className="flex items-center gap-4">
            {/* Notification Bell Symbol in Top Right */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-violet-400" />
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-4 space-y-3 z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-bold text-white">Admin Notifications</span>
                    <button
                      onClick={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))}
                      className="text-[10px] text-violet-400 font-semibold hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="space-y-2.5 max-h-72 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-3 rounded-xl border ${n.unread ? 'bg-slate-900 border-violet-500/30' : 'bg-slate-950 border-slate-800'}`}>
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

            <span className="text-xs text-slate-400">Admin: <strong className="text-white">SuperAdmin</strong></span>
          </div>
        </header>

        <div className="flex-1 p-6 space-y-6">
          {activeTab === 'dashboard' && (
            <DashboardOverview 
              setActiveTab={setActiveTab} 
              setAdminHubSubTab={setAdminHubSubTab} 
            />
          )}

          {/* Admin Hub */}
          {activeTab === 'admin-hub' && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                {[
                  { id: 'users', label: 'User Management' },
                  { id: 'sellers', label: '🏪 Seller Management' },
                  { id: 'products', label: 'Product Management' },
                  { id: 'delivery', label: 'Delivery Management' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setAdminHubSubTab(sub.id)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      adminHubSubTab === sub.id ? 'bg-violet-600 text-white shadow-md' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>

              {adminHubSubTab === 'users' && (
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-white">User Management (10 Customers)</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Click any customer to view individual customer profile and deep-dive analytics.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {customersList.map(cust => (
                      <div 
                        key={cust.id} 
                        onClick={() => setSelectedCustomer(cust)}
                        className="bg-slate-900 border border-slate-800 hover:border-violet-500/50 p-4 rounded-2xl flex items-center justify-between text-xs cursor-pointer transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 font-bold flex items-center justify-center text-sm">
                            {cust.name[0]}
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm group-hover:text-violet-300 transition-colors">{cust.name}</p>
                            <p className="text-slate-400">{cust.email} · {cust.location} · Joined: {cust.joined}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-white font-bold">₹{cust.totalSpent.toLocaleString()}</p>
                            <p className="text-[10px] text-slate-400">{cust.totalOrders} Orders</p>
                          </div>
                          <StatusBadge status={cust.status === 'Active' ? 'delivered' : 'pending'} />
                          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-violet-400 transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {adminHubSubTab === 'sellers' && (
                <SellerManagementView />
              )}

              {adminHubSubTab === 'products' && (
                <ProductManagementView />
              )}

              {adminHubSubTab === 'delivery' && (
                <DeliveryManagementView />
              )}
            </div>
          )}

          {/* Payments (Customer Payments, Seller Payments, Delivery Management & Payments) */}
          {activeTab === 'payments' && (
            <PaymentManagementView />
          )}

          {/* Reports & Analytics (Overview, Sales, Revenue, Orders, Customers, Sellers, Products, Delivery, Export) */}
          {activeTab === 'reports' && (
            <ReportsAnalyticsView />
          )}

          {/* Complaints, Disputes & Support (Customer, Seller, Delivery Partner) */}
          {activeTab === 'complaints' && (
            <ComplaintsSupportView />
          )}

          {/* Settings Dashboard & Configurations */}
          {activeTab === 'settings' && (
            <AdminSettingsView />
          )}

          {/* Audit Logs (Overview, All Logs, Activities, Log Details Drawer) */}
          {activeTab === 'audit-logs' && (
            <AuditLogsView />
          )}
        </div>
      </main>

      {/* INDIVIDUAL CUSTOMER ANALYTICS & PROFILE DEEP-DIVE MODAL */}
      {selectedCustomer && (
        <CustomerManagementModal 
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          orders={orders}
        />
      )}
    </div>
  );
};
