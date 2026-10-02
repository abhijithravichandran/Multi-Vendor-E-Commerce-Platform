import React, { useState } from 'react';
import { useStore } from '../../store/store';
import { Logo } from '../../components/common/Logo';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RatingStars } from '../../components/common/RatingStars';
import { PriceTag } from '../../components/common/PriceTag';
import { 
  Home, Grid, User, ShoppingCart, Settings, LogOut, 
  Bell, Heart, Sparkles, TrendingUp, 
  MapPin, Globe, Edit3, CheckCircle2, Plus, Minus, HelpCircle, Package, Truck, Clock 
} from 'lucide-react';

export const CustomerPortal = () => {
  const { products, categories, cart, addToCart, removeFromCart, updateCartQty, placeOrder, wishlist, toggleWishlist, orders, currentUser, notifications, markNotificationRead, logout } = useStore();
  
  const [activeMenu, setActiveMenu] = useState('home'); // 'home' | 'category' | 'account' | 'cart' | 'settings' | 'wishlist' | 'notifications'
  const [selectedCategory, setSelectedCategory] = useState(null); // 'fashion' | 'appliances' | 'accessories' | 'footwear' | 'stationery'
  const [selectedGender, setSelectedGender] = useState(null); // 'women' | 'men' | 'kids'
  const [selectedSubCat, setSelectedSubCat] = useState(null); // 'saree' | 'kurti' | 'western'
  const [orderStatusFilter, setOrderStatusFilter] = useState('all'); // 'all' | 'placed' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
  const [selectedSettingOption, setSelectedSettingOption] = useState('profile'); // 'profile' | 'address' | 'language' | 'help'

  const unreadNotifs = notifications.filter(n => !n.read && n.userId === currentUser.id);

  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter === 'all') return true;
    return o.status === orderStatusFilter;
  });

  const handleProceedPay = () => {
    placeOrder('addr-1', 'upi');
    setShowCheckoutSuccess(true);
    setTimeout(() => {
      setShowCheckoutSuccess(false);
      setActiveMenu('account');
    }, 2000);
  };

  return (
    <div className="customer-theme min-h-screen flex font-serif text-sm">
      {/* Left Column-wise Menu (Balanced font size) */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between sticky top-0 h-screen z-40 p-5">
        <div className="space-y-8 overflow-y-auto">
          {/* Top Left Logo */}
          <div className="cursor-pointer" onClick={() => { setActiveMenu('home'); setSelectedCategory(null); }}>
            <Logo size="sm" lightText={false} />
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2 font-medium text-sm">
            <button
              onClick={() => { setActiveMenu('home'); setSelectedCategory(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeMenu === 'home' ? 'bg-indigo-600 text-white font-bold shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-900'}`}
            >
              <Home className="w-5 h-5" /> Home
            </button>

            <button
              onClick={() => { setActiveMenu('category'); setSelectedCategory(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeMenu === 'category' ? 'bg-indigo-600 text-white font-bold shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-900'}`}
            >
              <Grid className="w-5 h-5" /> Category
            </button>

            <button
              onClick={() => setActiveMenu('account')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeMenu === 'account' ? 'bg-indigo-600 text-white font-bold shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-900'}`}
            >
              <User className="w-5 h-5" /> Account & Orders
            </button>

            <button
              onClick={() => setActiveMenu('cart')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeMenu === 'cart' ? 'bg-indigo-600 text-white font-bold shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-900'}`}
            >
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5" /> Cart
              </div>
              {cart.items.length > 0 && (
                <span className="px-2 py-0.5 bg-rose-500 text-white rounded-full text-[10px] font-bold">
                  {cart.items.reduce((s, i) => s + i.qty, 0)}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveMenu('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeMenu === 'settings' ? 'bg-indigo-600 text-white font-bold shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-900'}`}
            >
              <Settings className="w-5 h-5" /> Settings
            </button>
          </nav>
        </div>

        {/* Left Bottom Corner: Logout */}
        <div className="pt-4 border-t border-slate-800">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 font-bold text-sm transition-all"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-6 overflow-y-auto relative">
        {/* Top Right Corner Icons: Wishlist, Notifications, Profile (directs to Edit Profile) */}
        <div className="absolute top-5 right-6 flex items-center gap-3 z-30">
          <button
            onClick={() => setActiveMenu('wishlist')}
            className="relative p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 hover:text-white shadow-md transition-all"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveMenu('notifications')}
            className="relative p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 hover:text-white shadow-md transition-all"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifs.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                {unreadNotifs.length}
              </span>
            )}
          </button>

          <div
            onClick={() => { setActiveMenu('settings'); setSelectedSettingOption('profile'); }}
            className="flex items-center gap-2.5 bg-slate-950 border border-slate-800 px-3.5 py-2 rounded-xl shadow-md cursor-pointer hover:border-indigo-500 transition-all"
            title="Edit Profile"
          >
            <img src={currentUser.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
            <span className="font-bold text-sm text-white">{currentUser.name}</span>
          </div>
        </div>

        <div className="mt-14">
          {activeMenu === 'home' && (
            <div className="space-y-8 max-w-6xl mx-auto">
              {/* Welcome banner with user name */}
              <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl shadow-md">
                <div className="space-y-2">
                  <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    WELCOME BACK, {currentUser.name.toUpperCase()}! 👋
                  </span>
                  <h1 className="text-3xl font-bold text-white mt-2">Discover Today's Best Curated Picks</h1>
                  <p className="text-slate-400 text-xs mt-1">Shop more, worry less with Zenvora marketplace guarantees.</p>
                </div>
              </div>

              {/* Available Offers */}
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" /> Available Offers & Deals
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { title: 'FLAT ₹500 OFF', desc: 'On orders above ₹2,999 with code WELCOME500' },
                    { title: 'FREE EXPRESS SHIPPING', desc: 'On all fashion & lifestyle orders today' },
                    { title: 'EXTRA 10% CASHBACK', desc: 'When paying via UPI or Zenvora Wallet' }
                  ].map((offer, i) => (
                    <div key={i} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-sm hover:border-indigo-500/50 transition-colors">
                      <span className="text-xs font-bold text-indigo-400">{offer.title}</span>
                      <p className="text-xs text-slate-400">{offer.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Products */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-400" /> Trending Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                  {products.slice(0, 4).map(prod => (
                    <div key={prod.id} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden group shadow-lg">
                      <div className="h-48 bg-slate-900 relative overflow-hidden">
                        <img src={prod.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <button
                          onClick={() => toggleWishlist(prod.id)}
                          className={`absolute top-3 right-3 p-2 rounded-full ${wishlist.includes(prod.id) ? 'bg-rose-500 text-white' : 'bg-slate-900/80 text-slate-300'}`}
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="font-bold text-sm text-white line-clamp-1">{prod.title}</h3>
                        <PriceTag price={prod.basePrice} mrp={prod.mrp} size="sm" />
                        <button onClick={() => addToCart(prod.id, prod.variants[0].sku, prod.sellerId, 1, prod.basePrice)} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-xs font-bold shadow-md">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested for You */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-400" /> Suggested for You
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                  {products.slice(4, 8).map(prod => (
                    <div key={prod.id} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden group shadow-lg">
                      <div className="h-48 bg-slate-900 relative overflow-hidden">
                        <img src={prod.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="font-bold text-sm text-white line-clamp-1">{prod.title}</h3>
                        <PriceTag price={prod.basePrice} mrp={prod.mrp} size="sm" />
                        <button onClick={() => addToCart(prod.id, prod.variants[0].sku, prod.sellerId, 1, prod.basePrice)} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-xs font-bold shadow-md">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'category' && (
            <div className="space-y-8 max-w-6xl mx-auto">
              <h1 className="text-2xl font-bold text-white">Explore Categories</h1>

              {/* Category row-wise options */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { id: 'fashion', label: '👕 Fashion' },
                  { id: 'appliances', label: '🔌 Appliances' },
                  { id: 'accessories', label: '👜 Accessories' },
                  { id: 'footwear', label: '👟 Footwear' },
                  { id: 'stationery', label: '📚 Stationery' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.id); setSelectedGender(null); setSelectedSubCat(null); }}
                    className={`p-4 rounded-2xl border text-center font-bold text-sm transition-all ${selectedCategory === cat.id ? 'bg-indigo-600 text-white border-indigo-500 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-900'}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* If Fashion is selected */}
              {selectedCategory === 'fashion' && (
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <h3 className="font-bold text-sm text-indigo-400">Fashion — Select Gender</h3>
                  <div className="flex gap-3">
                    {['women', 'men', 'kids'].map(gender => (
                      <button
                        key={gender}
                        onClick={() => setSelectedGender(gender)}
                        className={`px-5 py-2.5 rounded-xl border font-bold uppercase tracking-wider text-xs transition-all ${selectedGender === gender ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'}`}
                      >
                        {gender}
                      </button>
                    ))}
                  </div>

                  {selectedGender === 'women' && (
                    <div className="space-y-3 pt-2">
                      <p className="text-xs text-slate-300 font-semibold">Women Sub-Categories:</p>
                      <div className="flex gap-3">
                        {['Saree', 'Kurti', 'Western Wear', 'Ethnic Sets'].map(sub => (
                          <button
                            key={sub}
                            onClick={() => setSelectedSubCat(sub)}
                            className={`px-4 py-2 rounded-xl border text-xs font-bold ${selectedSubCat === sub ? 'bg-purple-600 text-white border-purple-500' : 'bg-slate-950 border-slate-800 text-slate-200'}`}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Category Page Products for Popular Stores, New & Upcoming, Recently Viewed */}
              <div className="space-y-8 pt-6 border-t border-slate-800">
                {/* Popular Stores Products */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base">Popular Stores Featured Products</h3>
                    <span className="text-xs text-indigo-400 font-semibold">Royal Ethnic & TechVibe</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {products.slice(8, 12).map(prod => (
                      <div key={prod.id} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
                        <img src={prod.images[0]} alt="" className="w-full h-40 object-cover" />
                        <div className="p-3 space-y-2">
                          <h4 className="font-bold text-xs text-white line-clamp-1">{prod.title}</h4>
                          <PriceTag price={prod.basePrice} size="sm" />
                          <button onClick={() => addToCart(prod.id, prod.variants[0].sku, prod.sellerId, 1, prod.basePrice)} className="w-full bg-indigo-600 text-white py-2 rounded-xl text-xs font-bold">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* New & Upcoming Launches Products */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base">New & Upcoming Festival Launches</h3>
                    <span className="text-xs text-amber-400 font-semibold">Just Dropped</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {products.slice(12, 16).map(prod => (
                      <div key={prod.id} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
                        <img src={prod.images[0]} alt="" className="w-full h-40 object-cover" />
                        <div className="p-3 space-y-2">
                          <h4 className="font-bold text-xs text-white line-clamp-1">{prod.title}</h4>
                          <PriceTag price={prod.basePrice} size="sm" />
                          <button onClick={() => addToCart(prod.id, prod.variants[0].sku, prod.sellerId, 1, prod.basePrice)} className="w-full bg-indigo-600 text-white py-2 rounded-xl text-xs font-bold">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recently Viewed Products */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base">Recently Viewed Products</h3>
                    <span className="text-xs text-slate-400 font-semibold">Based on your history</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {products.slice(16, 20).map(prod => (
                      <div key={prod.id} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
                        <img src={prod.images[0]} alt="" className="w-full h-40 object-cover" />
                        <div className="p-3 space-y-2">
                          <h4 className="font-bold text-xs text-white line-clamp-1">{prod.title}</h4>
                          <PriceTag price={prod.basePrice} size="sm" />
                          <button onClick={() => addToCart(prod.id, prod.variants[0].sku, prod.sellerId, 1, prod.basePrice)} className="w-full bg-indigo-600 text-white py-2 rounded-xl text-xs font-bold">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account & Orders with row-wise status filters */}
          {activeMenu === 'account' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">My Orders</h1>
              </div>

              {/* Row-wise order status filter options */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Orders' },
                  { id: 'placed', label: 'Order Placed' },
                  { id: 'confirmed', label: 'Confirmed' },
                  { id: 'shipped', label: 'Shipped' },
                  { id: 'delivered', label: 'Delivered' },
                  { id: 'cancelled', label: 'Cancelled' }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setOrderStatusFilter(filter.id)}
                    className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all ${orderStatusFilter === filter.id ? 'bg-indigo-600 text-white border-indigo-500 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-300'}`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-12 bg-slate-950 border border-slate-800 rounded-2xl">
                    <p className="text-xs text-slate-400">No orders found for this status.</p>
                  </div>
                ) : (
                  filteredOrders.map(ord => (
                    <div key={ord.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex items-center justify-between text-xs shadow-md">
                      <div>
                        <p className="font-bold text-white text-sm">{ord.orderNo}</p>
                        <p className="text-slate-400 mt-0.5">Placed on {new Date(ord.placedAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-bold text-white text-sm">₹{ord.totals.grandTotal}</span>
                        <StatusBadge status={ord.status} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeMenu === 'wishlist' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <h1 className="text-2xl font-bold text-white">My Wishlist ({wishlist.length})</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                {wishlist.map(id => {
                  const prod = products.find(p => p.id === id);
                  if (!prod) return null;
                  return (
                    <div key={prod.id} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
                      <img src={prod.images[0]} alt="" className="w-full h-48 object-cover" />
                      <div className="p-4 space-y-2">
                        <h3 className="font-bold text-sm text-white line-clamp-1">{prod.title}</h3>
                        <PriceTag price={prod.basePrice} size="sm" />
                        <button onClick={() => addToCart(prod.id, prod.variants[0].sku, prod.sellerId, 1, prod.basePrice)} className="w-full bg-indigo-600 text-white py-2 rounded-xl font-bold text-xs">
                          Move to Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeMenu === 'notifications' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <h1 className="text-2xl font-bold text-white">Notifications</h1>
              <div className="space-y-3">
                {notifications.filter(n => n.userId === currentUser.id).map(n => (
                  <div key={n.id} onClick={() => markNotificationRead(n.id)} className={`p-4 rounded-2xl border shadow-md cursor-pointer ${n.read ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-950 border-indigo-500/50 text-slate-200'}`}>
                    <p className="font-bold text-indigo-400 text-sm mb-0.5">{n.title}</p>
                    <p className="text-xs">{n.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeMenu === 'cart' && (
            <div className="space-y-6 max-w-4xl mx-auto relative min-h-[70vh]">
              <h1 className="text-2xl font-bold text-white">My Shopping Cart ({cart.items.length})</h1>
              
              {cart.items.length === 0 ? (
                <div className="text-center py-16 bg-slate-950 border border-slate-800 rounded-2xl shadow-md">
                  <ShoppingCart className="w-16 h-16 text-slate-600 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-300">Your cart is empty</h3>
                </div>
              ) : (
                <div className="space-y-4 pb-24">
                  {cart.items.map((ci, idx) => {
                    const prod = products.find(p => p.id === ci.productId);
                    if (!prod) return null;
                    return (
                      <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-center gap-4 shadow-md">
                        <img src={prod.images[0]} alt="" className="w-20 h-20 object-cover rounded-xl" />
                        <div className="flex-1 space-y-1">
                          <h4 className="font-bold text-sm text-white">{prod.title}</h4>
                          <PriceTag price={ci.priceSnapshot} size="sm" />
                        </div>
                        <button onClick={() => removeFromCart(ci.productId, ci.sku)} className="text-rose-400 text-xs font-bold hover:underline">Remove</button>
                      </div>
                    );
                  })}

                  {/* Overall price details */}
                  <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-3 max-w-md ml-auto shadow-xl">
                    <h3 className="font-bold text-white text-sm">Price Summary</h3>
                    <div className="space-y-2 text-xs text-slate-300">
                      <div className="flex justify-between"><span>Subtotal</span><span>₹{cart.totals.subtotal}</span></div>
                      <div className="flex justify-between"><span>Tax (18%)</span><span>₹{cart.totals.tax}</span></div>
                      <div className="flex justify-between"><span>Shipping</span><span>₹{cart.totals.shipping}</span></div>
                      <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-white text-base">
                        <span>Grand Total</span><span>₹{cart.totals.grandTotal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Proceed to Pay in right bottom corner like blinking */}
                  <div className="fixed bottom-6 right-6 z-50">
                    <button
                      onClick={handleProceedPay}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-8 py-4 rounded-2xl shadow-2xl transition-all animate-bounce text-sm flex items-center gap-2 ring-6 ring-emerald-400/40"
                    >
                      🔒 Proceed to Pay ₹{cart.totals.grandTotal}
                    </button>
                  </div>
                </div>
              )}

              {showCheckoutSuccess && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                  <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl text-center space-y-4 max-w-sm shadow-2xl">
                    <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                    <h3 className="text-xl font-bold text-white">Payment Successful!</h3>
                    <p className="text-xs text-slate-300">Your order has been placed successfully via Zenvora Secure Checkout.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Settings Section with Row-wise Selectable Options */}
          {activeMenu === 'settings' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold text-white">Settings & Support</h1>

              {/* Row-wise selectable settings options */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { id: 'profile', label: 'Edit Profile', icon: Edit3 },
                  { id: 'address', label: 'Saved Address', icon: MapPin },
                  { id: 'language', label: 'Change Language', icon: Globe },
                  { id: 'help', label: 'Help Desk', icon: HelpCircle }
                ].map(opt => {
                  const Icon = opt.icon;
                  const selected = selectedSettingOption === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedSettingOption(opt.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all text-center space-y-2 ${selected ? 'bg-indigo-600 text-white border-indigo-500 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'}`}
                    >
                      <Icon className="w-6 h-6 mx-auto" />
                      <h3 className="font-bold text-xs">{opt.label}</h3>
                    </div>
                  );
                })}
              </div>

              {/* Selected Setting View */}
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
                {selectedSettingOption === 'profile' && (
                  <div className="space-y-3 text-xs">
                    <h3 className="text-base font-bold text-white">Edit Profile Details</h3>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Full Name</label>
                      <input type="text" defaultValue={currentUser.name} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Email Address</label>
                      <input type="email" defaultValue={currentUser.email} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white" />
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold shadow-md">Save Profile</button>
                  </div>
                )}

                {selectedSettingOption === 'address' && (
                  <div className="space-y-3 text-xs">
                    <h3 className="text-base font-bold text-white">Saved Delivery Addresses</h3>
                    <div className="p-4 bg-slate-900 rounded-xl border border-indigo-500/50 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-white">Aarav Sharma (Home)</p>
                        <p className="text-slate-300 mt-0.5">Flat 402, Sunshine Apartments, MG Road, Bengaluru - 560001</p>
                      </div>
                      <span className="bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-lg text-[10px] font-bold">Default</span>
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold shadow-md">+ Add New Address</button>
                  </div>
                )}

                {selectedSettingOption === 'language' && (
                  <div className="space-y-3 text-xs">
                    <h3 className="text-base font-bold text-white">Select Language</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['English (EN)', 'Hindi (HI)', 'Kannada (KN)', 'Tamil (TA)', 'Telugu (TE)', 'Marathi (MR)'].map((lang, idx) => (
                        <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-bold text-white cursor-pointer hover:border-indigo-500">
                          {lang}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSettingOption === 'help' && (
                  <div className="space-y-3 text-xs">
                    <h3 className="text-base font-bold text-white">Help Desk & Customer Support</h3>
                    <p className="text-slate-300">Need assistance with your orders, returns, or seller payouts? Our 24/7 Zenvora support team is here for you.</p>
                    <div className="p-4 bg-slate-900 rounded-xl space-y-2">
                      <p className="font-bold text-indigo-300">📞 Toll-Free Helpline: 1800-419-9999</p>
                      <p className="font-bold text-indigo-300">✉️ Support Email: support@zenvora.com</p>
                    </div>
                    <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold">Start Live Chat</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
