import React, { useState } from 'react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  Store, CheckCircle2, Clock, AlertTriangle, XCircle, 
  DollarSign, Package, ClipboardList, TrendingUp, Star, 
  Percent, ArrowRight, User, MapPin, Phone, Mail, FileText, 
  CreditCard, ShieldCheck, Check, Ban, Eye
} from 'lucide-react';
import { SellerManagementModal } from './SellerManagementModal';

export const SellerManagementView = () => {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [sellerSubTab, setSellerSubTab] = useState('all'); // 'all' | 'verification' | 'products' | 'inventory' | 'orders' | 'sales' | 'payouts' | 'performance' | 'reviews' | 'returns' | 'activity' | 'support'

  const [sellersList, setSellersList] = useState([
    {
      id: 1,
      storeName: 'ABC Electronics',
      category: 'Electronics & Audio',
      ownerName: 'Pawan Verma',
      phone: '+91 98221 44556',
      email: 'pawan@abcelectronics.in',
      address: 'Shop 402, SP Road',
      city: 'Bangalore',
      joined: 'Jan 2026',
      status: 'Active',
      kycStatus: 'Verified',
      gstin: '29ABCDE1234F1Z5',
      pan: 'ABCDE1234F',
      bankName: 'HDFC Bank',
      accountNo: '50100482910482',
      ifsc: 'HDFC0001234',
      totalProducts: 124,
      activeProducts: 118,
      lowStockProducts: 6,
      outOfStockProducts: 2,
      totalOrders: 1850,
      completedOrders: 1790,
      cancelledOrders: 26,
      returnedOrders: 34,
      totalRevenue: '24.5L',
      sellerEarnings: '21.8L',
      platformCommission: '2.7L',
      pendingPayout: '42,500',
      completedPayouts: '21.3L',
      avgOrderValue: '1,324',
      rating: 4.6,
      reviewsCount: 312,
      cancellationRate: 1.4,
      returnRate: 2.8,
      successRate: 96.8,
      activity: [
        { time: '8:40 PM', action: 'Seller logged in to portal' },
        { time: '8:32 PM', action: 'Added new product (Wireless Earbuds Pro)' },
        { time: '8:15 PM', action: 'Updated inventory count for 12 items' },
        { time: '7:50 PM', action: 'Order #10542 accepted & packed' },
        { time: '7:20 PM', action: '₹12,500 payout processed to HDFC account' },
        { time: 'Yesterday', action: 'Product received 4 new customer reviews' }
      ]
    },
    {
      id: 2,
      storeName: 'Royal Rajasthan Handlooms',
      category: 'Handloom & Textiles',
      ownerName: 'Rameshwar Sharma',
      phone: '+91 97112 33445',
      email: 'rameshwar@rajasthanhandlooms.com',
      address: '14 Bapu Bazaar',
      city: 'Jaipur',
      joined: 'Nov 2025',
      status: 'Active',
      kycStatus: 'Verified',
      gstin: '08RAJASTH1234F1Z9',
      pan: 'RAJAS1234F',
      bankName: 'State Bank of India',
      accountNo: '3098124890182',
      ifsc: 'SBIN0004891',
      totalProducts: 85,
      activeProducts: 81,
      lowStockProducts: 4,
      outOfStockProducts: 0,
      totalOrders: 940,
      completedOrders: 918,
      cancelledOrders: 8,
      returnedOrders: 14,
      totalRevenue: '12.8L',
      sellerEarnings: '11.4L',
      platformCommission: '1.4L',
      pendingPayout: '28,000',
      completedPayouts: '11.1L',
      avgOrderValue: '1,360',
      rating: 4.8,
      reviewsCount: 184,
      cancellationRate: 0.8,
      returnRate: 1.5,
      successRate: 97.7,
      activity: [
        { time: 'Today 2:15 PM', action: 'Uploaded new Chanderi silk batch' },
        { time: 'Yesterday 6:00 PM', action: 'Fulfilled 18 festive orders' }
      ]
    },
    {
      id: 3,
      storeName: 'Clay & Craft Pottery Co.',
      category: 'Terracotta & Pottery',
      ownerName: 'Ananya Devi',
      phone: '+91 98301 22334',
      email: 'ananya@claycraft.org',
      address: '22 Kumartuli Street',
      city: 'Kolkata',
      joined: 'Feb 2026',
      status: 'Active',
      kycStatus: 'Verified',
      gstin: '19CLAYC1234F1Z8',
      pan: 'CLAYC1234F',
      bankName: 'Axis Bank',
      accountNo: '91802004891823',
      ifsc: 'UTIB0000849',
      totalProducts: 42,
      activeProducts: 39,
      lowStockProducts: 3,
      outOfStockProducts: 1,
      totalOrders: 620,
      completedOrders: 602,
      cancelledOrders: 6,
      returnedOrders: 12,
      totalRevenue: '6.4L',
      sellerEarnings: '5.7L',
      platformCommission: '70,000',
      pendingPayout: '18,500',
      completedPayouts: '5.5L',
      avgOrderValue: '1,032',
      rating: 4.9,
      reviewsCount: 128,
      cancellationRate: 1.0,
      returnRate: 1.9,
      successRate: 97.1,
      activity: [
        { time: 'Today 11:30 AM', action: 'Restocked hand-painted planters' }
      ]
    },
    {
      id: 4,
      storeName: 'Deccan Brass & Bronzeware',
      category: 'Brass & Metalcraft',
      ownerName: 'Suresh Hegde',
      phone: '+91 94481 99887',
      email: 'suresh@deccanbrass.in',
      address: '88 Begum Bazaar',
      city: 'Hyderabad',
      joined: 'Dec 2025',
      status: 'Active',
      kycStatus: 'Verified',
      gstin: '36DECCA1234F1Z2',
      pan: 'DECCA1234F',
      bankName: 'ICICI Bank',
      accountNo: '001205004829',
      ifsc: 'ICIC0000012',
      totalProducts: 68,
      activeProducts: 65,
      lowStockProducts: 2,
      outOfStockProducts: 1,
      totalOrders: 810,
      completedOrders: 785,
      cancelledOrders: 11,
      returnedOrders: 14,
      totalRevenue: '14.2L',
      sellerEarnings: '12.6L',
      platformCommission: '1.6L',
      pendingPayout: '34,200',
      completedPayouts: '12.3L',
      avgOrderValue: '1,753',
      rating: 4.7,
      reviewsCount: 165,
      cancellationRate: 1.3,
      returnRate: 1.7,
      successRate: 96.9,
      activity: [
        { time: 'Today 4:00 PM', action: 'Completed dispatch of 8 brass urlis' }
      ]
    },
    {
      id: 5,
      storeName: 'Kashmir Valley Pashminas',
      category: 'Shawls & Woolens',
      ownerName: 'Farooq Dar',
      phone: '+91 94190 77665',
      email: 'farooq@kashmirpashmina.com',
      address: 'Lal Chowk Craft Complex',
      city: 'Srinagar',
      joined: 'Jan 2026',
      status: 'Active',
      kycStatus: 'Pending Review',
      gstin: '01KASHM1234F1Z3',
      pan: 'KASHM1234F',
      bankName: 'J&K Bank',
      accountNo: '00892014892018',
      ifsc: 'JAKO0CHOWK1',
      totalProducts: 36,
      activeProducts: 34,
      lowStockProducts: 5,
      outOfStockProducts: 0,
      totalOrders: 490,
      completedOrders: 478,
      cancelledOrders: 4,
      returnedOrders: 8,
      totalRevenue: '18.6L',
      sellerEarnings: '16.5L',
      platformCommission: '2.1L',
      pendingPayout: '48,000',
      completedPayouts: '16.0L',
      avgOrderValue: '3,795',
      rating: 4.9,
      reviewsCount: 110,
      cancellationRate: 0.8,
      returnRate: 1.6,
      successRate: 97.5,
      activity: [
        { time: 'Today 9:15 AM', action: 'Submitted updated GSTIN compliance documents' }
      ]
    },
    {
      id: 6,
      storeName: 'Vedic Aroma & Spices',
      category: 'Spices & Organics',
      ownerName: 'Harish Nair',
      phone: '+91 98470 55443',
      email: 'harish@vedicaroma.in',
      address: 'Jew Town Market Road',
      city: 'Kochi',
      joined: 'Nov 2025',
      status: 'Active',
      kycStatus: 'Verified',
      gstin: '32VEDIC1234F1Z1',
      pan: 'VEDIC1234F',
      bankName: 'Federal Bank',
      accountNo: '1120048291048',
      ifsc: 'FDRL0001120',
      totalProducts: 92,
      activeProducts: 90,
      lowStockProducts: 2,
      outOfStockProducts: 0,
      totalOrders: 1420,
      completedOrders: 1395,
      cancelledOrders: 12,
      returnedOrders: 13,
      totalRevenue: '9.8L',
      sellerEarnings: '8.7L',
      platformCommission: '1.1L',
      pendingPayout: '16,800',
      completedPayouts: '8.5L',
      avgOrderValue: '690',
      rating: 4.7,
      reviewsCount: 290,
      cancellationRate: 0.8,
      returnRate: 0.9,
      successRate: 98.2,
      activity: [
        { time: 'Today 3:45 PM', action: 'Added cardamom batch certification' }
      ]
    },
    {
      id: 7,
      storeName: 'Urban Tech Accessories',
      category: 'Mobile & Cables',
      ownerName: 'Gaurav Kapoor',
      phone: '+91 98100 44332',
      email: 'gaurav@urbantech.in',
      address: 'Nehru Place Complex',
      city: 'New Delhi',
      joined: 'Dec 2025',
      status: 'Blocked',
      kycStatus: 'Verified',
      gstin: '07URBAN1234F1Z7',
      pan: 'URBAN1234F',
      bankName: 'Punjab National Bank',
      accountNo: '04890021004829',
      ifsc: 'PUNB0048900',
      totalProducts: 110,
      activeProducts: 0,
      lowStockProducts: 0,
      outOfStockProducts: 110,
      totalOrders: 1640,
      completedOrders: 1520,
      cancelledOrders: 65,
      returnedOrders: 55,
      totalRevenue: '16.3L',
      sellerEarnings: '14.2L',
      platformCommission: '2.1L',
      pendingPayout: '0',
      completedPayouts: '14.2L',
      avgOrderValue: '994',
      rating: 4.1,
      reviewsCount: 240,
      cancellationRate: 4.0,
      returnRate: 3.4,
      successRate: 92.6,
      activity: [
        { time: '3 days ago', action: 'Account flagged for high cancellation complaints' }
      ]
    },
    {
      id: 8,
      storeName: 'Mysore Pure Silks',
      category: 'Pure Silks & Zari',
      ownerName: 'Meenakshi Raman',
      phone: '+91 94801 88776',
      email: 'meenakshi@mysoresilks.in',
      address: 'Silk Weavers Guild, KD Road',
      city: 'Mysore',
      joined: 'Jan 2026',
      status: 'Active',
      kycStatus: 'Verified',
      gstin: '29MYSOR1234F1Z4',
      pan: 'MYSOR1234F',
      bankName: 'Canara Bank',
      accountNo: '0489101004892',
      ifsc: 'CNRB0000489',
      totalProducts: 55,
      activeProducts: 52,
      lowStockProducts: 3,
      outOfStockProducts: 0,
      totalOrders: 730,
      completedOrders: 715,
      cancelledOrders: 5,
      returnedOrders: 10,
      totalRevenue: '15.9L',
      sellerEarnings: '14.1L',
      platformCommission: '1.8L',
      pendingPayout: '24,500',
      completedPayouts: '13.8L',
      avgOrderValue: '2,178',
      rating: 4.8,
      reviewsCount: 154,
      cancellationRate: 0.7,
      returnRate: 1.4,
      successRate: 97.9,
      activity: [
        { time: 'Today 1:10 PM', action: 'Handwoven zari sarees dispatched' }
      ]
    }
  ]);

  const handleUpdateStatus = (sellerId, newKyc, newStatus) => {
    setSellersList(prev => prev.map(s => {
      if (s.id === sellerId) {
        return { ...s, kycStatus: newKyc, status: newStatus };
      }
      return s;
    }));
    if (selectedSeller && selectedSeller.id === sellerId) {
      setSelectedSeller(prev => ({ ...prev, kycStatus: newKyc, status: newStatus }));
    }
  };

  const filteredSellers = sellersList.filter(s => {
    if (sellerSubTab === 'verification') return s.kycStatus !== 'Verified';
    if (sellerSubTab === 'inventory') return s.lowStockProducts > 0 || s.outOfStockProducts > 0;
    if (sellerSubTab === 'support') return s.status === 'Blocked' || s.cancellationRate > 2.0;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Recommended Admin Structure Sub-navigation Bar */}
      <div className="flex flex-wrap gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs font-bold">
        {[
          { id: 'all', label: 'All Sellers' },
          { id: 'verification', label: 'Verification (KYC)' },
          { id: 'products', label: 'Products' },
          { id: 'inventory', label: 'Inventory' },
          { id: 'orders', label: 'Orders' },
          { id: 'sales', label: 'Sales & Revenue' },
          { id: 'payouts', label: 'Payments & Payouts' },
          { id: 'performance', label: 'Performance' },
          { id: 'reviews', label: 'Reviews' },
          { id: 'returns', label: 'Returns' },
          { id: 'activity', label: 'Activity' },
          { id: 'support', label: 'Support & Disputes' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSellerSubTab(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              sellerSubTab === tab.id ? 'bg-amber-600 text-slate-950 shadow-md font-extrabold' : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Seller Management Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400">Total Registered Sellers</span>
          <p className="text-2xl font-extrabold text-white">{sellersList.length}</p>
          <span className="text-[10px] text-emerald-400 font-semibold">{sellersList.filter(s => s.status === 'Active').length} Active</span>
        </div>
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400">KYC Verified Vendors</span>
          <p className="text-2xl font-extrabold text-emerald-400">{sellersList.filter(s => s.kycStatus === 'Verified').length}</p>
          <span className="text-[10px] text-amber-400 font-semibold">{sellersList.filter(s => s.kycStatus !== 'Verified').length} Pending Approval</span>
        </div>
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400">Total Seller GMV</span>
          <p className="text-2xl font-extrabold text-amber-400">₹1.18 Cr</p>
          <span className="text-[10px] text-violet-400 font-semibold">₹11.8L Comm Earned</span>
        </div>
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400">Pending Payout Settlements</span>
          <p className="text-2xl font-extrabold text-white">₹1,85,000</p>
          <span className="text-[10px] text-slate-400 font-semibold">Weekly batch ready</span>
        </div>
      </div>

      {/* Sellers List Table / Cards */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-white">Marketplace Sellers ({filteredSellers.length})</h3>
            <p className="text-xs text-slate-400 mt-0.5">Click any seller card to open full Individual Seller Analytics & Dossier.</p>
          </div>
        </div>

        <div className="space-y-3">
          {filteredSellers.map(seller => (
            <div 
              key={seller.id}
              onClick={() => setSelectedSeller(seller)}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between text-xs cursor-pointer transition-all group gap-4"
            >
              {/* Left Details */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 font-extrabold flex items-center justify-center text-xl border border-amber-500/30">
                  🏪
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors">{seller.storeName}</p>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      seller.kycStatus === 'Verified' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {seller.kycStatus}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      seller.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {seller.status}
                    </span>
                  </div>
                  <p className="text-slate-400 mt-1">
                    Owner: {seller.ownerName} • {seller.city} • {seller.category} • Joined {seller.joined}
                  </p>
                </div>
              </div>

              {/* Middle Metrics */}
              <div className="grid grid-cols-4 gap-4 text-center md:text-right border-y md:border-y-0 md:border-l border-slate-800 py-2 md:py-0 md:pl-6">
                <div>
                  <span className="text-[10px] text-slate-500">Products</span>
                  <p className="font-extrabold text-white">{seller.totalProducts}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">Orders</span>
                  <p className="font-extrabold text-white">{seller.totalOrders.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">Revenue</span>
                  <p className="font-extrabold text-amber-400">₹{seller.totalRevenue}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">Rating</span>
                  <p className="font-extrabold text-amber-300">{seller.rating} ★</p>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2 justify-end" onClick={(e) => e.stopPropagation()}>
                {seller.kycStatus !== 'Verified' && (
                  <button 
                    onClick={() => handleUpdateStatus(seller.id, 'Verified', 'Active')}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl font-bold transition-all shadow text-[11px]"
                  >
                    Approve KYC
                  </button>
                )}
                {seller.status === 'Active' ? (
                  <button 
                    onClick={() => handleUpdateStatus(seller.id, seller.kycStatus, 'Blocked')}
                    className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 px-3 py-1.5 rounded-xl font-bold transition-all border border-rose-500/30 text-[11px]"
                  >
                    Block
                  </button>
                ) : (
                  <button 
                    onClick={() => handleUpdateStatus(seller.id, seller.kycStatus, 'Active')}
                    className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-xl font-bold transition-all border border-emerald-500/30 text-[11px]"
                  >
                    Unblock
                  </button>
                )}
                <button
                  onClick={() => setSelectedSeller(seller)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl font-bold transition-all text-[11px] flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> Analytics
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Seller Analytics & Profile Modal */}
      {selectedSeller && (
        <SellerManagementModal 
          seller={selectedSeller}
          onClose={() => setSelectedSeller(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
};
