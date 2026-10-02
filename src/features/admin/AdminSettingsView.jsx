import React, { useState } from 'react';
import { 
  Settings, Building2, CreditCard, Store, Truck, 
  ShoppingCart, RefreshCcw, Bell, Shield, Percent, 
  Lock, Server, CheckCircle2, Save, FileText, ToggleLeft, 
  ToggleRight, UserCheck, Key, Mail, Globe, MapPin, Phone
} from 'lucide-react';

export const AdminSettingsView = () => {
  const [activeSection, setActiveSection] = useState('overview'); // 'overview' | 'general' | 'admin' | 'seller' | 'payment' | 'delivery' | 'orders' | 'returns' | 'coupons' | 'notifications' | 'security' | 'tax' | 'privacy' | 'system'
  const [saveToast, setSaveToast] = useState(null);

  // Settings State
  const [generalConfig, setGeneralConfig] = useState({
    platformName: 'Zenvora',
    tagline: '— SHOP MORE ❤ WORRY LESS —',
    email: 'support@zenvora.com',
    phone: '+91 1800 200 8900',
    address: 'Zenvora Tech Park, 100ft Rd, Indiranagar, Bangalore, Karnataka 560038',
    currency: 'INR (₹)'
  });

  const [sellerConfig, setSellerConfig] = useState({
    autoApprove: false,
    standardCommission: 10,
    gstMandatory: true,
    minWithdrawal: 1000
  });

  const [deliveryConfig, setDeliveryConfig] = useState({
    baseDeliveryFee: 40,
    freeDeliveryThreshold: 999,
    riderPayoutPerOrder: 60,
    maxRadiusKm: 25,
    expressEnabled: true
  });

  const [orderConfig, setOrderConfig] = useState({
    autoConfirmPayment: true,
    cancellationWindowMins: 30,
    autoRefundOutOfStock: true,
    lowStockThreshold: 10
  });

  const [returnConfig, setReturnConfig] = useState({
    returnWindowDays: 7,
    autoApproveBelow: 1000,
    photoProofMandatory: true,
    pickupWindowHours: 48
  });

  const [securityConfig, setSecurityConfig] = useState({
    twoFactorEnforced: true,
    sessionTimeoutMins: 30,
    lockoutAttempts: 5,
    ipRestrictions: false
  });

  const [systemConfig, setSystemConfig] = useState({
    maintenanceMode: false,
    cacheStatus: 'Healthy',
    backupFrequency: 'Daily (2:00 AM)'
  });

  const handleSave = (sectionName) => {
    setSaveToast(`${sectionName} successfully updated and applied!`);
    setTimeout(() => setSaveToast(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Settings Top Sub-navigation Bar */}
      <div className="flex flex-wrap gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs font-bold">
        {[
          { id: 'overview', label: '🏠 Overview' },
          { id: 'general', label: '🏢 General' },
          { id: 'admin', label: '👤 Admin & Permissions' },
          { id: 'seller', label: '🏪 Seller' },
          { id: 'payment', label: '💳 Payment & Payout' },
          { id: 'delivery', label: '🚚 Delivery' },
          { id: 'orders', label: '🛒 Orders' },
          { id: 'returns', label: '🔄 Returns & Refunds' },
          { id: 'coupons', label: '🎟️ Coupons' },
          { id: 'notifications', label: '🔔 Notifications' },
          { id: 'security', label: '🔐 Security' },
          { id: 'tax', label: '📊 Tax' },
          { id: 'privacy', label: '🛡️ Privacy' },
          { id: 'system', label: '⚙️ System' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              activeSection === item.id 
                ? 'bg-violet-600 text-white shadow-md font-extrabold' 
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Save Success Toast */}
      {saveToast && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center gap-2 text-emerald-300 text-xs font-bold animate-pulse">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>✓ {saveToast}</span>
        </div>
      )}

      {/* 🏠 SETTINGS OVERVIEW DASHBOARD (Exact Spec Layout) */}
      {activeSection === 'overview' && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl font-serif">
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <Settings className="w-6 h-6 text-violet-400" />
              <h2 className="text-xl font-extrabold text-white">⚙️ Settings</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">Manage and configure your entire marketplace platform.</p>
          </div>

          {/* 8 Primary Cards Grid matching ASCII Diagram */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div 
              onClick={() => setActiveSection('general')}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 hover:border-violet-500/50 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏢</span>
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-violet-300 transition-colors">General</h4>
                  <p className="text-slate-400 text-[11px]">Platform information & logo</p>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setActiveSection('payment')}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 hover:border-violet-500/50 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">💳</span>
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-violet-300 transition-colors">Payment & Payout</h4>
                  <p className="text-slate-400 text-[11px]">Payment & commission rules</p>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setActiveSection('seller')}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 hover:border-violet-500/50 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏪</span>
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-violet-300 transition-colors">Seller</h4>
                  <p className="text-slate-400 text-[11px]">Vendor onboarding & rules</p>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setActiveSection('delivery')}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 hover:border-violet-500/50 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚚</span>
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-violet-300 transition-colors">Delivery</h4>
                  <p className="text-slate-400 text-[11px]">Fleet & radius configuration</p>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setActiveSection('orders')}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 hover:border-violet-500/50 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🛒</span>
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-violet-300 transition-colors">Orders</h4>
                  <p className="text-slate-400 text-[11px]">Order cancellation & stock</p>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setActiveSection('returns')}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 hover:border-violet-500/50 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔄</span>
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-violet-300 transition-colors">Returns & Refunds</h4>
                  <p className="text-slate-400 text-[11px]">7-day window & auto-credit</p>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setActiveSection('notifications')}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 hover:border-violet-500/50 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔔</span>
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-violet-300 transition-colors">Notifications</h4>
                  <p className="text-slate-400 text-[11px]">Email / SMS / WhatsApp</p>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setActiveSection('security')}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 hover:border-violet-500/50 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔐</span>
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-violet-300 transition-colors">Security</h4>
                  <p className="text-slate-400 text-[11px]">2FA & session management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🏢 GENERAL SETTINGS */}
      {activeSection === 'general' && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl font-serif text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-lg text-white">General Marketplace Information</h3>
              <p className="text-slate-400 mt-0.5">Platform name, branding, contact addresses, and localized currencies.</p>
            </div>
            <button 
              onClick={() => handleSave('General Settings')}
              className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl font-bold shadow flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" /> Save Changes
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Platform Brand Name</label>
              <input
                type="text"
                value={generalConfig.platformName}
                onChange={(e) => setGeneralConfig({ ...generalConfig, platformName: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">Brand Tagline</label>
              <input
                type="text"
                value={generalConfig.tagline}
                onChange={(e) => setGeneralConfig({ ...generalConfig, tagline: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">Support Contact Email</label>
              <input
                type="email"
                value={generalConfig.email}
                onChange={(e) => setGeneralConfig({ ...generalConfig, email: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">Toll-Free Helpline</label>
              <input
                type="text"
                value={generalConfig.phone}
                onChange={(e) => setGeneralConfig({ ...generalConfig, phone: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-slate-300 font-bold mb-1">Registered Marketplace Headquarters</label>
              <input
                type="text"
                value={generalConfig.address}
                onChange={(e) => setGeneralConfig({ ...generalConfig, address: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* 👤 ADMIN & PERMISSIONS */}
      {activeSection === 'admin' && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl font-serif text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-lg text-white">Admin Roles & Permissions</h3>
              <p className="text-slate-400 mt-0.5">Control administrative accounts, role levels, and granular access rights.</p>
            </div>
            <button className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl font-bold shadow text-xs">
              + Invite Admin
            </button>
          </div>

          <div className="space-y-3">
            {[
              { name: 'SuperAdmin User', email: 'vidhyashri8126@gmail.com', role: 'SuperAdmin (Full Access)', status: 'Active', color: 'bg-emerald-500/20 text-emerald-300' },
              { name: 'Finance Controller', email: 'finance@zenvora.com', role: 'Finance Admin (Payouts & Ledger)', status: 'Active', color: 'bg-violet-500/20 text-violet-300' },
              { name: 'Logistics Supervisor', email: 'fleet@zenvora.com', role: 'Operations Manager (Delivery & Orders)', status: 'Active', color: 'bg-cyan-500/20 text-cyan-300' },
              { name: 'Support Executive', email: 'support.lead@zenvora.com', role: 'Customer Support (Tickets & Chatbot)', status: 'Active', color: 'bg-amber-500/20 text-amber-300' }
            ].map((adm, i) => (
              <div key={i} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white text-sm">{adm.name}</p>
                  <p className="text-slate-400 mt-0.5">{adm.email} • <strong className="text-slate-300">{adm.role}</strong></p>
                </div>
                <span className={`px-2.5 py-1 rounded-xl font-bold text-[10px] ${adm.color}`}>{adm.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🏪 SELLER SETTINGS */}
      {activeSection === 'seller' && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl font-serif text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-lg text-white">Seller Registration & Commission Rules</h3>
              <p className="text-slate-400 mt-0.5">Control vendor verification requirements and default take rates.</p>
            </div>
            <button onClick={() => handleSave('Seller Settings')} className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl font-bold shadow">
              Save Rules
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <div>
                <p className="font-bold text-white">Automatic Seller Verification</p>
                <p className="text-slate-400">If disabled, newly registered sellers require manual Admin KYC approval before listing.</p>
              </div>
              <button 
                onClick={() => setSellerConfig({ ...sellerConfig, autoApprove: !sellerConfig.autoApprove })}
                className={`w-12 h-6 rounded-full transition-all flex items-center px-1 ${sellerConfig.autoApprove ? 'bg-emerald-600 justify-end' : 'bg-slate-800 justify-start'}`}
              >
                <div className="w-4 h-4 rounded-full bg-white"></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <div>
                <p className="font-bold text-white">Mandatory GSTIN & PAN Verification</p>
                <p className="text-slate-400">Requires verified business tax documents to ensure authentic Indian marketplace compliance.</p>
              </div>
              <button 
                onClick={() => setSellerConfig({ ...sellerConfig, gstMandatory: !sellerConfig.gstMandatory })}
                className={`w-12 h-6 rounded-full transition-all flex items-center px-1 ${sellerConfig.gstMandatory ? 'bg-emerald-600 justify-end' : 'bg-slate-800 justify-start'}`}
              >
                <div className="w-4 h-4 rounded-full bg-white"></div>
              </button>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Standard Marketplace Base Commission (%)</p>
                <p className="text-slate-400">Standard percentage retained on every completed customer checkout.</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={sellerConfig.standardCommission}
                  onChange={(e) => setSellerConfig({ ...sellerConfig, standardCommission: Number(e.target.value) })}
                  className="w-20 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-bold text-center"
                />
                <span className="text-white font-bold">%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 💳 PAYMENT & PAYOUT */}
      {activeSection === 'payment' && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl font-serif text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-lg text-white">Payment & Payout Configuration</h3>
              <p className="text-slate-400 mt-0.5">Payment gateways, minimum withdrawal caps, and weekly settlement cycles.</p>
            </div>
            <button onClick={() => handleSave('Payment Settings')} className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl font-bold shadow">
              Save Configuration
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-slate-400 font-bold">Primary Payment Gateway</span>
              <p className="text-base font-bold text-white">Razorpay & Stripe Multi-Routing</p>
              <span className="text-emerald-400 font-bold">● PCI-DSS Level 1 Compliant</span>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-slate-400 font-bold">Seller Payout Frequency</span>
              <p className="text-base font-bold text-white">Weekly Settlement (Every Monday)</p>
              <span className="text-violet-400 font-bold">Direct NEFT/RTGS to Bank</span>
            </div>
          </div>
        </div>
      )}

      {/* 🚚 DELIVERY SETTINGS */}
      {activeSection === 'delivery' && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl font-serif text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-lg text-white">Delivery Fleet & Logistics Settings</h3>
              <p className="text-slate-400 mt-0.5">Delivery fee tariffs, rider compensation per trip, and operational radius.</p>
            </div>
            <button onClick={() => handleSave('Delivery Settings')} className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl font-bold shadow">
              Save Delivery Rules
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400">Customer Base Delivery Fee</span>
              <p className="text-xl font-extrabold text-white">₹{deliveryConfig.baseDeliveryFee}</p>
              <p className="text-[10px] text-slate-500">Free above ₹{deliveryConfig.freeDeliveryThreshold}</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400">Rider Base Compensation</span>
              <p className="text-xl font-extrabold text-emerald-400">₹{deliveryConfig.riderPayoutPerOrder}</p>
              <p className="text-[10px] text-slate-500">Flat pay per completed dispatch</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400">Max Delivery Radius</span>
              <p className="text-xl font-extrabold text-violet-400">{deliveryConfig.maxRadiusKm} km</p>
              <p className="text-[10px] text-slate-500">From city fulfillment hub</p>
            </div>
          </div>
        </div>
      )}

      {/* 🛒 ORDERS SETTINGS */}
      {activeSection === 'orders' && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl font-serif text-xs">
          <h3 className="font-bold text-lg text-white">Order Processing Rules</h3>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <p className="font-bold text-white">Cancellation Window: 30 minutes after order placement</p>
            <p className="text-slate-400">Customers can freely cancel before the seller accepts and assigns a delivery partner.</p>
          </div>
        </div>
      )}

      {/* 🔄 RETURNS & REFUNDS */}
      {activeSection === 'returns' && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl font-serif text-xs">
          <h3 className="font-bold text-lg text-white">Return Window & Refund Rules</h3>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <p className="font-bold text-white">Standard Return Window: 7 Days from Delivery</p>
            <p className="text-slate-400">Returns require unboxing verification for high-value handlooms and gold jewelry.</p>
          </div>
        </div>
      )}

      {/* 🔔 NOTIFICATIONS */}
      {activeSection === 'notifications' && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl font-serif text-xs">
          <h3 className="font-bold text-lg text-white">Notification Channels (Email, SMS, Push, WhatsApp)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <p className="font-bold text-white">Transactional SMS & WhatsApp</p>
              <p className="text-emerald-400 font-bold mt-1">● Online (Twilio / Gupshup)</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <p className="font-bold text-white">System Email (SMTP)</p>
              <p className="text-emerald-400 font-bold mt-1">● Connected (AWS SES / SendGrid)</p>
            </div>
          </div>
        </div>
      )}

      {/* 🔐 SECURITY */}
      {activeSection === 'security' && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl font-serif text-xs">
          <h3 className="font-bold text-lg text-white">Admin Security & Access Protection</h3>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <p className="font-bold text-white">Two-Factor Authentication (2FA)</p>
            <p className="text-emerald-400 font-bold">Enforced for all SuperAdmin logins via Authenticator TOTP.</p>
          </div>
        </div>
      )}

      {/* 📊 TAX */}
      {activeSection === 'tax' && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl font-serif text-xs">
          <h3 className="font-bold text-lg text-white">GST & Tax Rates Configuration</h3>
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Spices & Organics</span>
              <p className="text-lg font-bold text-white mt-1">5% GST</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Handloom & Textiles</span>
              <p className="text-lg font-bold text-white mt-1">12% GST</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-slate-400">Electronics</span>
              <p className="text-lg font-bold text-white mt-1">18% GST</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-slate-400">TCS (E-Commerce)</span>
              <p className="text-lg font-bold text-violet-400 mt-1">1% TCS</p>
            </div>
          </div>
        </div>
      )}

      {/* ⚙️ SYSTEM */}
      {activeSection === 'system' && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl font-serif text-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-white">Platform System Controls</h3>
            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-xl">All Services Operational</span>
          </div>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="font-bold text-white">Marketplace Maintenance Mode</p>
              <p className="text-slate-400">Temporarily disables checkout while showing a maintenance banner.</p>
            </div>
            <button 
              onClick={() => setSystemConfig({ ...systemConfig, maintenanceMode: !systemConfig.maintenanceMode })}
              className={`w-12 h-6 rounded-full transition-all flex items-center px-1 ${systemConfig.maintenanceMode ? 'bg-rose-600 justify-end' : 'bg-slate-800 justify-start'}`}
            >
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
