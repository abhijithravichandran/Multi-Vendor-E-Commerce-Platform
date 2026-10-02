import React, { useState } from 'react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  Package, CheckCircle2, AlertTriangle, XCircle, DollarSign, 
  TrendingUp, Star, Eye, ShoppingCart, Heart, RefreshCcw, 
  BarChart3, Tag, Layers, Check, Ban
} from 'lucide-react';
import { ProductManagementModal } from './ProductManagementModal';

export const ProductManagementView = ({ defaultTab = 'all' }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productSubTab, setProductSubTab] = useState(defaultTab === 'category' ? 'categories' : defaultTab);

  const [productsList, setProductsList] = useState([
    {
      id: 101,
      title: 'Zari Border Kanjivaram Silk Saree',
      category: 'Fashion & Handloom',
      sellerName: 'Mysore Pure Silks',
      price: 4890,
      mrp: 6500,
      discount: 25,
      stock: 42,
      status: 'Active',
      views: 12450,
      ordersCount: 856,
      revenue: '12.8L',
      rating: 4.8,
      reviewsCount: 286,
      wishlistAdds: 342,
      cartAdds: 1120,
      returnRate: 2.1,
      conversionRate: 6.8,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300'
    },
    {
      id: 102,
      title: 'Handcrafted Terracotta Urli Planter Set',
      category: 'Terracotta & Pottery',
      sellerName: 'Clay & Craft Pottery Co.',
      price: 1450,
      mrp: 1999,
      discount: 27,
      stock: 65,
      status: 'Active',
      views: 8900,
      ordersCount: 620,
      revenue: '6.4L',
      rating: 4.9,
      reviewsCount: 194,
      wishlistAdds: 210,
      cartAdds: 810,
      returnRate: 1.8,
      conversionRate: 7.0,
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=300'
    },
    {
      id: 103,
      title: 'Handmade Kundan Choker Necklace with Earrings',
      category: 'Fashion Accessories & Jewelry',
      sellerName: 'Royal Rajasthan Handlooms',
      price: 2600,
      mrp: 3500,
      discount: 26,
      stock: 18,
      status: 'Active',
      views: 14200,
      ordersCount: 940,
      revenue: '14.2L',
      rating: 4.7,
      reviewsCount: 310,
      wishlistAdds: 480,
      cartAdds: 1350,
      returnRate: 2.4,
      conversionRate: 6.6,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300'
    },
    {
      id: 104,
      title: 'Pure Brass Pooja Diya & Bell Set',
      category: 'Brass & Metalcraft',
      sellerName: 'Deccan Brass & Bronzeware',
      price: 1850,
      mrp: 2400,
      discount: 23,
      stock: 8,
      status: 'Active',
      views: 7400,
      ordersCount: 490,
      revenue: '7.8L',
      rating: 4.8,
      reviewsCount: 165,
      wishlistAdds: 175,
      cartAdds: 620,
      returnRate: 1.2,
      conversionRate: 6.6,
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300'
    },
    {
      id: 105,
      title: 'Pashmina Embroidered Cashmere Stole',
      category: 'Fashion & Handloom',
      sellerName: 'Kashmir Valley Pashminas',
      price: 5200,
      mrp: 7500,
      discount: 30,
      stock: 14,
      status: 'Pending Approval',
      views: 3100,
      ordersCount: 85,
      revenue: '4.4L',
      rating: 4.9,
      reviewsCount: 42,
      wishlistAdds: 190,
      cartAdds: 210,
      returnRate: 0.9,
      conversionRate: 6.2,
      image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=300'
    },
    {
      id: 106,
      title: 'Wireless Active Noise-Cancelling Headphones',
      category: 'Electronics & Audio',
      sellerName: 'ABC Electronics',
      price: 2999,
      mrp: 4999,
      discount: 40,
      stock: 124,
      status: 'Active',
      views: 18900,
      ordersCount: 1420,
      revenue: '21.5L',
      rating: 4.6,
      reviewsCount: 480,
      wishlistAdds: 620,
      cartAdds: 2150,
      returnRate: 3.1,
      conversionRate: 7.5,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'
    },
    {
      id: 107,
      title: 'Organic Green Cardamom (500g Export Grade)',
      category: 'Spices & Organics',
      sellerName: 'Vedic Aroma & Spices',
      price: 890,
      mrp: 1200,
      discount: 26,
      stock: 2,
      status: 'Active',
      views: 6200,
      ordersCount: 780,
      revenue: '6.9L',
      rating: 4.8,
      reviewsCount: 220,
      wishlistAdds: 110,
      cartAdds: 890,
      returnRate: 0.8,
      conversionRate: 12.5,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300'
    },
    {
      id: 108,
      title: 'Ultra Fast Braided USB-C Cable (Pack of 3)',
      category: 'Electronics & Accessories',
      sellerName: 'Urban Tech Accessories',
      price: 499,
      mrp: 999,
      discount: 50,
      stock: 0,
      status: 'Blocked',
      views: 4500,
      ordersCount: 310,
      revenue: '1.5L',
      rating: 3.8,
      reviewsCount: 78,
      wishlistAdds: 85,
      cartAdds: 410,
      returnRate: 6.2,
      conversionRate: 6.8,
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300'
    }
  ]);

  const handleUpdateStatus = (productId, newStatus) => {
    setProductsList(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, status: newStatus };
      }
      return p;
    }));
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(prev => ({ ...prev, status: newStatus }));
    }
  };

  const filteredProducts = productsList.filter(p => {
    if (productSubTab === 'pending') return p.status === 'Pending Approval';
    if (productSubTab === 'inventory') return p.stock < 10;
    if (productSubTab === 'pricing') return p.discount >= 25;
    if (productSubTab === 'returns') return p.returnRate >= 2.0;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Recommended Sidebar / Sub-navigation Tabs */}
      <div className="flex flex-wrap gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs font-bold">
        {[
          { id: 'all', label: 'All Products' },
          { id: 'pending', label: 'Pending Approval' },
          { id: 'categories', label: 'Categories' },
          { id: 'inventory', label: 'Inventory' },
          { id: 'pricing', label: 'Pricing & Offers' },
          { id: 'analytics', label: 'Product Analytics' },
          { id: 'reviews', label: 'Reviews & Ratings' },
          { id: 'returns', label: 'Returns' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setProductSubTab(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              productSubTab === tab.id ? 'bg-violet-600 text-white shadow-md font-extrabold' : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400">Total Listed Products</span>
          <p className="text-2xl font-extrabold text-white">{productsList.length}</p>
          <span className="text-[10px] text-emerald-400 font-semibold">{productsList.filter(p => p.status === 'Active').length} Active Live</span>
        </div>
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400">Pending Approval</span>
          <p className="text-2xl font-extrabold text-amber-400">{productsList.filter(p => p.status === 'Pending Approval').length}</p>
          <span className="text-[10px] text-slate-400 font-semibold">Moderation queue</span>
        </div>
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400">Low & Out of Stock</span>
          <p className="text-2xl font-extrabold text-rose-400">{productsList.filter(p => p.stock < 10).length}</p>
          <span className="text-[10px] text-amber-400 font-semibold">Restock alert triggered</span>
        </div>
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400">Catalog Conversion</span>
          <p className="text-2xl font-extrabold text-violet-400">7.2%</p>
          <span className="text-[10px] text-emerald-400 font-semibold">High purchase intent</span>
        </div>
      </div>

      {/* Products List Table / Cards */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-white">Marketplace Products ({filteredProducts.length})</h3>
            <p className="text-xs text-slate-400 mt-0.5">Click any product to inspect individual product analytics, orders, views, and inventory.</p>
          </div>
        </div>

        <div className="space-y-3">
          {filteredProducts.map(product => (
            <div 
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="bg-slate-900 border border-slate-800 hover:border-violet-500/50 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between text-xs cursor-pointer transition-all group gap-4"
            >
              {/* Left Details */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-white text-sm group-hover:text-violet-300 transition-colors">{product.title}</p>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      product.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' :
                      product.status === 'Pending Approval' ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                  <p className="text-slate-400 mt-1">
                    Category: <span className="text-slate-300 font-semibold">{product.category}</span> • Seller: <span className="text-amber-400 font-semibold">{product.sellerName}</span> • Stock: <span className={product.stock < 10 ? 'text-amber-400 font-bold' : 'text-slate-300'}>{product.stock} units</span>
                  </p>
                </div>
              </div>

              {/* Middle Metrics */}
              <div className="grid grid-cols-4 gap-4 text-center md:text-right border-y md:border-y-0 md:border-l border-slate-800 py-2 md:py-0 md:pl-6">
                <div>
                  <span className="text-[10px] text-slate-500">Price</span>
                  <p className="font-extrabold text-emerald-400">₹{product.price}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">Views</span>
                  <p className="font-extrabold text-white">{product.views.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">Orders</span>
                  <p className="font-extrabold text-white">{product.ordersCount}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">Revenue</span>
                  <p className="font-extrabold text-amber-400">₹{product.revenue}</p>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2 justify-end" onClick={(e) => e.stopPropagation()}>
                {product.status === 'Pending Approval' && (
                  <button 
                    onClick={() => handleUpdateStatus(product.id, 'Active')}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl font-bold transition-all shadow text-[11px]"
                  >
                    Approve
                  </button>
                )}
                {product.status === 'Active' ? (
                  <button 
                    onClick={() => handleUpdateStatus(product.id, 'Blocked')}
                    className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 px-3 py-1.5 rounded-xl font-bold transition-all border border-rose-500/30 text-[11px]"
                  >
                    Block
                  </button>
                ) : (
                  <button 
                    onClick={() => handleUpdateStatus(product.id, 'Active')}
                    className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-xl font-bold transition-all border border-emerald-500/30 text-[11px]"
                  >
                    Unblock
                  </button>
                )}
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl font-bold transition-all text-[11px] flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> Analytics
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Product Analytics & Dossier Modal */}
      {selectedProduct && (
        <ProductManagementModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
};
