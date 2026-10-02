import React, { useState } from 'react';
import { useStore } from '../../store/store';
import { AuthModal } from '../../components/auth/AuthModal';
import { Logo } from '../../components/common/Logo';
import { 
  Store, Search, ShoppingCart, 
  PackageCheck, RotateCcw, Star, Ticket, ArrowRight,
  ShieldCheck, Truck, CreditCard, CheckCircle2, ChevronRight,
  Heart, Sparkles, Percent, Tag, User, Smartphone, 
  MapPin, Clock, ThumbsUp, Bell, Award, HelpCircle
} from 'lucide-react';

export const LandingPage = () => {
  const { products, addToCart } = useStore();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authRole, setAuthRole] = useState('customer');
  const [activeCategory, setActiveCategory] = useState('All');

  const openAuth = (role = 'customer') => {
    setAuthRole(role);
    setAuthModalOpen(true);
  };

  // Curated Trending Products
  const trendingProducts = [
    {
      id: 'lp-1',
      name: 'Wireless Noise Cancelling Headphones',
      seller: 'ABC Electronics',
      rating: 4.5,
      reviewsCount: '1,240',
      price: 1499,
      originalPrice: 2499,
      discount: '40% OFF',
      stockStatus: 'In Stock',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'lp-2',
      name: 'Zari Border Kanjivaram Pure Silk Saree',
      seller: 'Royal Rajasthan Handlooms',
      rating: 4.9,
      reviewsCount: '840',
      price: 4999,
      originalPrice: 8999,
      discount: '44% OFF',
      stockStatus: 'In Stock',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'lp-3',
      name: 'Handcrafted Traditional Terracotta Urli',
      seller: 'Clay & Craft Pottery Studio',
      rating: 4.8,
      reviewsCount: '490',
      price: 699,
      originalPrice: 1299,
      discount: '46% OFF',
      stockStatus: 'In Stock',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'lp-4',
      name: 'Organic Arabica Dark Roast Coffee Beans',
      seller: 'Western Ghats Spices & Organics',
      rating: 4.7,
      reviewsCount: '1,120',
      price: 449,
      originalPrice: 799,
      discount: '43% OFF',
      stockStatus: 'In Stock',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fdf7f8] text-[#3a171f] font-serif selection:bg-[#AF6A77] selection:text-white">
      {/* 🧭 Navbar with Zenvora Logo */}
      <nav className="bg-[#faedf0]/95 backdrop-blur-md border-b border-[#e5c2c8] sticky top-0 z-40 px-6 py-3.5 flex items-center justify-between shadow-xs">
        <Logo size="sm" lightText={false} />
        
        <div className="hidden lg:flex items-center gap-6 text-xs font-bold text-[#5e323b]">
          <a href="#categories" className="hover:text-[#AF6A77] transition-colors">Categories</a>
          <a href="#features" className="hover:text-[#AF6A77] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#AF6A77] transition-colors">How It Works</a>
          <a href="#sellers" className="hover:text-[#AF6A77] transition-colors">For Sellers</a>
          <a href="#delivery" className="hover:text-[#AF6A77] transition-colors">Delivery Partners</a>
          <a href="#trending" className="hover:text-[#AF6A77] transition-colors">Trending</a>
          <a href="#deals" className="hover:text-[#AF6A77] transition-colors">Deals</a>
          <a href="#trust" className="hover:text-[#AF6A77] transition-colors">Trust & Security</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openAuth('customer')}
            className="bg-[#ffffff] border border-[#e5c2c8] hover:border-[#AF6A77] hover:bg-[#faedf0] text-[#3a171f] px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            Sign In
          </button>
          <button
            onClick={() => openAuth('customer')}
            className="bg-gradient-to-r from-[#AF6A77] to-[#8e4f5b] hover:from-[#c47c8a] hover:to-[#9f5966] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-[#AF6A77]/25 transition-all"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* 1. 🏠 Home / Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-[#faedf0] via-[#f7e6e9] to-[#fdf7f8] border-b border-[#e5c2c8]">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <span className="bg-[#AF6A77]/15 text-[#8e4f5b] border border-[#AF6A77]/30 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider inline-block shadow-xs">
            Multi-Vendor E-Commerce Platform
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#3a171f] max-w-4xl mx-auto leading-tight">
            Everything You Need. All in One Marketplace.
          </h1>
          
          <p className="text-[#5e323b] text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Shop from multiple trusted sellers, discover great products, enjoy secure payments, and get your orders delivered right to your doorstep.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => openAuth('customer')}
              className="bg-gradient-to-r from-[#AF6A77] to-[#8e4f5b] hover:from-[#c47c8a] hover:to-[#9f5966] text-white font-extrabold px-8 py-4 rounded-2xl shadow-xl shadow-[#AF6A77]/30 transition-all flex items-center gap-2 text-sm"
            >
              🛍️ Start Shopping <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => openAuth('seller')}
              className="bg-[#ffffff] border border-[#e5c2c8] hover:border-[#AF6A77] hover:bg-[#faedf0] text-[#3a171f] font-extrabold px-8 py-4 rounded-2xl shadow-md transition-all flex items-center gap-2 text-sm"
            >
              🏪 Become a Seller
            </button>
          </div>

          {/* Hero Highlights */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-xs font-bold text-[#5e323b]">
            <div className="flex items-center justify-center gap-1.5 bg-[#ffffff]/80 border border-[#e5c2c8] py-2.5 px-3 rounded-2xl shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#AF6A77]" /> Multiple Trusted Sellers
            </div>
            <div className="flex items-center justify-center gap-1.5 bg-[#ffffff]/80 border border-[#e5c2c8] py-2.5 px-3 rounded-2xl shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#AF6A77]" /> Secure Payments
            </div>
            <div className="flex items-center justify-center gap-1.5 bg-[#ffffff]/80 border border-[#e5c2c8] py-2.5 px-3 rounded-2xl shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#AF6A77]" /> Fast Delivery
            </div>
            <div className="flex items-center justify-center gap-1.5 bg-[#ffffff]/80 border border-[#e5c2c8] py-2.5 px-3 rounded-2xl shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#AF6A77]" /> Easy Returns
            </div>
          </div>
        </div>
      </section>

      {/* 2. 🗂️ Categories Section */}
      <section id="categories" className="py-20 max-w-7xl mx-auto px-6 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-[#3a171f]">Explore Our Categories</h2>
          <p className="text-[#5e323b] text-sm max-w-xl mx-auto font-medium">
            Find everything you need from multiple sellers in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: '👕 Fashion', desc: 'Clothing, footwear and accessories' },
            { title: '📱 Electronics', desc: 'Mobiles, laptops, gadgets and accessories' },
            { title: '🏠 Home & Living', desc: 'Furniture, appliances and home essentials' },
            { title: '💄 Beauty', desc: 'Skincare, makeup and personal care' },
            { title: '🛒 Grocery', desc: 'Daily essentials and household products' },
            { title: '🎮 Entertainment', desc: 'Games, accessories and entertainment products' }
          ].map((cat, i) => (
            <div 
              key={i} 
              onClick={() => openAuth('customer')}
              className="bg-[#ffffff] border border-[#e5c2c8] p-6 rounded-3xl hover:border-[#AF6A77] hover:shadow-xl hover:shadow-[#AF6A77]/10 transition-all group cursor-pointer shadow-xs space-y-2"
            >
              <h3 className="text-xl font-bold text-[#3a171f] group-hover:text-[#AF6A77] transition-colors">
                {cat.title}
              </h3>
              <p className="text-[#7a4651] text-xs leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => openAuth('customer')}
            className="bg-[#ffffff] border border-[#e5c2c8] hover:border-[#AF6A77] hover:bg-[#faedf0] text-[#3a171f] font-bold px-6 py-3 rounded-2xl text-xs shadow-xs transition-all inline-flex items-center gap-2"
          >
            View All Categories <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3. ✨ Features Section */}
      <section id="features" className="py-20 bg-[#faedf0]/60 border-y border-[#e5c2c8]">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8e4f5b] bg-[#AF6A77]/10 px-3 py-1 rounded-full">
              Platform Advantages
            </span>
            <h2 className="text-3xl font-extrabold text-[#3a171f]">Why Shop With Us?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 text-xs">
            {[
              { icon: '🏪', title: 'Multiple Sellers', desc: 'Explore products from different sellers through a single marketplace.' },
              { icon: '🔎', title: 'Easy Product Discovery', desc: 'Search, filter and sort products based on category, price, rating and availability.' },
              { icon: '🛒', title: 'Smart Shopping Cart', desc: 'Add products from different sellers to your cart and manage your purchases easily.' },
              { icon: '💳', title: 'Secure Checkout', desc: 'Complete your purchases using secure and convenient payment options.' },
              { icon: '🚚', title: 'Order Tracking', desc: 'Track your order from seller confirmation to delivery.' },
              { icon: '🔄', title: 'Easy Returns', desc: 'Request returns and monitor the status of your return directly from your account.' },
              { icon: '⭐', title: 'Customer Reviews', desc: 'Read genuine customer reviews and ratings before making a purchase.' },
              { icon: '🎟️', title: 'Coupons & Offers', desc: 'Apply available coupons and promotional offers during checkout.' }
            ].map((f, idx) => (
              <div key={idx} className="bg-[#ffffff] border border-[#e5c2c8] p-5 rounded-3xl space-y-2.5 shadow-xs hover:border-[#AF6A77] transition-all">
                <span className="text-2xl">{f.icon}</span>
                <h4 className="font-bold text-[#3a171f] text-sm">{f.title}</h4>
                <p className="text-[#7a4651] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 🔄 How It Works */}
      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8e4f5b] bg-[#AF6A77]/10 px-3 py-1 rounded-full">
            Simple 5-Step Process
          </span>
          <h2 className="text-3xl font-extrabold text-[#3a171f]">Shopping Made Simple</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center text-xs">
          {[
            { step: '01', title: 'Discover', desc: 'Browse products from multiple sellers and find what you need.' },
            { step: '02', title: 'Add to Cart', desc: 'Select products, choose quantities and add them to your cart.' },
            { step: '03', title: 'Checkout', desc: 'Review your order, apply coupons and make a secure payment.' },
            { step: '04', title: 'Track', desc: 'Track your order and shipment status in real time.' },
            { step: '05', title: 'Receive', desc: 'Get your products delivered to your doorstep.' }
          ].map((s, idx) => (
            <div key={idx} className="bg-[#ffffff] border border-[#e5c2c8] p-6 rounded-3xl relative shadow-xs flex flex-col items-center space-y-3">
              <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#AF6A77] to-[#8e4f5b] text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                {s.step}
              </span>
              <h4 className="font-bold text-base text-[#3a171f]">{s.title}</h4>
              <p className="text-[#7a4651] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 🏪 Seller Section */}
      <section id="sellers" className="py-20 bg-[#faedf0]/70 border-y border-[#e5c2c8]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8e4f5b] bg-[#AF6A77]/10 px-3 py-1 rounded-full">
              For Vendors & Merchants
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#3a171f] leading-tight">
              🏪 Grow Your Business With Us
            </h2>
            <p className="text-[#5e323b] text-sm leading-relaxed">
              Turn your products into a growing online business. Join hundreds of successful vendors reaching nationwide customers.
            </p>

            <button
              onClick={() => openAuth('seller')}
              className="bg-gradient-to-r from-[#AF6A77] to-[#8e4f5b] hover:from-[#c47c8a] hover:to-[#9f5966] text-white font-extrabold px-7 py-3.5 rounded-2xl shadow-lg shadow-[#AF6A77]/25 transition-all text-xs inline-flex items-center gap-2"
            >
              Start Selling Today <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-6 bg-[#ffffff] border border-[#e5c2c8] p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-bold text-base text-[#3a171f]">Why become a seller?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                'Create your own seller profile',
                'Add and manage products',
                'Manage inventory',
                'Receive customer orders',
                'Track sales',
                'Manage returns',
                'View customer reviews',
                'Reach customers across the marketplace'
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-2 text-[#5e323b] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AF6A77]"></span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. 👥 Customer Section */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 bg-[#ffffff] border border-[#e5c2c8] p-6 sm:p-8 rounded-3xl shadow-sm space-y-4 order-2 lg:order-1">
          <h3 className="font-bold text-base text-[#3a171f]">Customer Benefits</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {[
              'Personalized product browsing',
              'Wishlist and cart management',
              'Multiple payment options',
              'Order history',
              'Delivery tracking',
              'Product reviews',
              'Easy return requests',
              'Coupons and offers'
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 text-[#5e323b] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#AF6A77] shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8e4f5b] bg-[#AF6A77]/10 px-3 py-1 rounded-full">
            Shopper Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#3a171f] leading-tight">
            Everything You Need for Better Shopping
          </h2>
          <p className="text-[#5e323b] text-sm leading-relaxed">
            Your personalized shopping experience makes it easier to discover, compare and purchase products from trusted stores.
          </p>
          <button
            onClick={() => openAuth('customer')}
            className="bg-[#ffffff] border border-[#e5c2c8] hover:border-[#AF6A77] hover:bg-[#faedf0] text-[#3a171f] font-bold px-7 py-3.5 rounded-2xl shadow-xs transition-all text-xs inline-flex items-center gap-2"
          >
            Start Exploring <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 7. 🚚 Delivery Partner Section */}
      <section id="delivery" className="py-20 bg-[#faedf0]/70 border-y border-[#e5c2c8]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8e4f5b] bg-[#AF6A77]/10 px-3 py-1 rounded-full">
              Logistics Fleet
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#3a171f] leading-tight">
              🚚 Deliver. Earn. Grow.
            </h2>
            <p className="text-[#5e323b] text-sm leading-relaxed">
              Join our delivery network and help customers receive their orders quickly. Enjoy flexible working hours, transparent trip earnings, and weekly direct bank payouts.
            </p>

            <button
              onClick={() => openAuth('delivery')}
              className="bg-gradient-to-r from-[#AF6A77] to-[#8e4f5b] hover:from-[#c47c8a] hover:to-[#9f5966] text-white font-extrabold px-7 py-3.5 rounded-2xl shadow-lg shadow-[#AF6A77]/25 transition-all text-xs inline-flex items-center gap-2"
            >
              Join as a Delivery Partner <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-6 bg-[#ffffff] border border-[#e5c2c8] p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-bold text-base text-[#3a171f]">Delivery Partner Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              {[
                { label: 'View assigned deliveries', icon: '📦' },
                { label: 'Accept delivery requests', icon: '⚡' },
                { label: 'Update delivery status', icon: '🔄' },
                { label: 'Navigate to customer locations', icon: '📍' },
                { label: 'Track completed deliveries', icon: '✅' },
                { label: 'View delivery history & payouts', icon: '💵' }
              ].map((item, i) => (
                <div key={i} className="p-3 bg-[#faedf0] rounded-2xl border border-[#e5c2c8] flex items-center gap-2.5">
                  <span className="text-base">{item.icon}</span>
                  <span className="text-[#3a171f] font-bold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. 🛍️ Seller Products Section (Trending Products) */}
      <section id="trending" className="py-20 max-w-7xl mx-auto px-6 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8e4f5b] bg-[#AF6A77]/10 px-3 py-1 rounded-full">
              Handpicked Catalog
            </span>
            <h2 className="text-3xl font-extrabold text-[#3a171f] mt-2">Trending Products</h2>
          </div>
          <button 
            onClick={() => openAuth('customer')}
            className="text-xs font-bold text-[#AF6A77] hover:text-[#8e4f5b] flex items-center gap-1 self-start sm:self-auto"
          >
            View All Products <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {trendingProducts.map((prod) => (
            <div 
              key={prod.id} 
              className="bg-[#ffffff] border border-[#e5c2c8] rounded-3xl overflow-hidden shadow-xs hover:border-[#AF6A77] hover:shadow-xl hover:shadow-[#AF6A77]/15 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 bg-[#faedf0] overflow-hidden">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-3 left-3 bg-[#AF6A77] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-xl shadow-md">
                    {prod.discount}
                  </span>
                  <span className="absolute top-3 right-3 bg-[#ffffff]/90 backdrop-blur-sm text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-[#e5c2c8]">
                    {prod.stockStatus}
                  </span>
                </div>

                <div className="p-5 space-y-2 text-xs">
                  <span className="text-[11px] text-[#7a4651] font-semibold">{prod.seller}</span>
                  <h4 className="font-bold text-sm text-[#3a171f] line-clamp-2">{prod.name}</h4>
                  
                  <div className="flex items-center gap-1.5 text-[#5e323b]">
                    <span className="text-amber-500 font-bold">⭐ {prod.rating}</span>
                    <span className="text-[10px] text-[#7a4651]">({prod.reviewsCount} reviews)</span>
                  </div>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-lg font-extrabold text-[#3a171f]">₹{prod.price.toLocaleString()}</span>
                    <span className="text-xs text-[#7a4651] line-through">₹{prod.originalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => openAuth('customer')}
                  className="w-full bg-[#faedf0] hover:bg-gradient-to-r hover:from-[#AF6A77] hover:to-[#8e4f5b] hover:text-white text-[#3a171f] font-bold py-2.5 rounded-2xl border border-[#e5c2c8] hover:border-transparent transition-all text-xs flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. 🎉 Offers Section */}
      <section id="deals" className="py-16 bg-gradient-to-r from-[#faedf0] via-[#f7e6e9] to-[#faedf0] border-y border-[#e5c2c8]">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <span className="bg-[#AF6A77] text-white px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider inline-block shadow-md">
            Today's Best Deals
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#3a171f]">
            🎉 Deals You Don't Want to Miss
          </h2>
          <div className="inline-block px-6 py-2 rounded-2xl bg-[#AF6A77]/15 border border-[#AF6A77]/30 text-2xl md:text-3xl font-extrabold text-[#8e4f5b]">
            Up to 60% OFF
          </div>
          <p className="text-[#5e323b] text-sm max-w-xl mx-auto font-medium">
            Discover exclusive discounts from our marketplace sellers. Limited-time flash sales across electronics, handlooms, and lifestyle.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => openAuth('customer')}
              className="bg-gradient-to-r from-[#AF6A77] to-[#8e4f5b] hover:from-[#c47c8a] hover:to-[#9f5966] text-white font-extrabold px-7 py-3.5 rounded-2xl shadow-lg shadow-[#AF6A77]/25 text-xs transition-all"
            >
              Shop Deals
            </button>
            <button
              onClick={() => openAuth('customer')}
              className="bg-[#ffffff] border border-[#e5c2c8] hover:border-[#AF6A77] text-[#3a171f] font-bold px-7 py-3.5 rounded-2xl shadow-xs text-xs transition-all"
            >
              View Coupons
            </button>
          </div>
        </div>
      </section>

      {/* 10. 🔐 Trust & Security Section */}
      <section id="trust" className="py-20 max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8e4f5b] bg-[#AF6A77]/10 px-3 py-1 rounded-full">
            Safety & Protection
          </span>
          <h2 className="text-3xl font-extrabold text-[#3a171f]">🔐 Shop With Confidence</h2>
          <p className="text-[#5e323b] text-sm max-w-xl mx-auto font-medium">
            Your security and satisfaction matter to us. Every order is backed by comprehensive buyer protection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs">
          {[
            { icon: '🔒', title: 'Secure Payments', details: 'Protected payment processing via UPI, Cards, and NetBanking.' },
            { icon: '🛡️', title: 'Trusted Sellers', details: 'Seller KYC profiles, GST verification and authentic ratings.' },
            { icon: '📦', title: 'Order Tracking', details: 'Monitor your delivery with live status updates and OTP verification.' },
            { icon: '🔄', title: 'Easy Returns', details: 'Simple 7-day hassle-free return and refund process.' },
            { icon: '⭐', title: 'Verified Reviews', details: 'Make informed decisions with authentic buyer feedback.' },
            { icon: '🔔', title: 'Order Updates', details: 'Stay informed about your orders via SMS, Email, and WhatsApp.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#ffffff] border border-[#e5c2c8] p-6 rounded-3xl space-y-2.5 shadow-xs hover:border-[#AF6A77] transition-all">
              <span className="text-3xl">{item.icon}</span>
              <h4 className="font-bold text-[#3a171f] text-base">{item.title}</h4>
              <p className="text-[#7a4651] leading-relaxed">{item.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 11. ⭐ Reviews Section */}
      <section className="py-20 bg-[#faedf0]/70 border-y border-[#e5c2c8]">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8e4f5b] bg-[#AF6A77]/10 px-3 py-1 rounded-full">
              Testimonials
            </span>
            <h2 className="text-3xl font-extrabold text-[#3a171f]">⭐ What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="bg-[#ffffff] border border-[#e5c2c8] p-6 rounded-3xl space-y-4 shadow-xs flex flex-col justify-between">
              <p className="text-[#5e323b] italic leading-relaxed text-sm">
                "Great marketplace with lots of products and an easy checkout experience."
              </p>
              <div>
                <span className="font-bold text-[#3a171f] text-sm block">— Priya K.</span>
                <span className="text-[#7a4651]">Verified Buyer • Bangalore</span>
              </div>
            </div>

            <div className="bg-[#ffffff] border border-[#e5c2c8] p-6 rounded-3xl space-y-4 shadow-xs flex flex-col justify-between">
              <p className="text-[#5e323b] italic leading-relaxed text-sm">
                "I was able to start selling my products and manage my orders easily."
              </p>
              <div>
                <span className="font-bold text-[#3a171f] text-sm block">— Rahul S., Seller</span>
                <span className="text-[#7a4651]">Handloom Merchant • Jaipur</span>
              </div>
            </div>

            <div className="bg-[#ffffff] border border-[#e5c2c8] p-6 rounded-3xl space-y-4 shadow-xs flex flex-col justify-between">
              <p className="text-[#5e323b] italic leading-relaxed text-sm">
                "The delivery tracking made it easy to know when my order would arrive."
              </p>
              <div>
                <span className="font-bold text-[#3a171f] text-sm block">— Arjun M.</span>
                <span className="text-[#7a4651]">Verified Buyer • Mumbai</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. 📊 Statistics Section */}
      <section className="py-20 max-w-7xl mx-auto px-6 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8e4f5b] bg-[#AF6A77]/10 px-3 py-1 rounded-full">
            Marketplace Scale
          </span>
          <h2 className="text-3xl font-extrabold text-[#3a171f]">A Marketplace Built for Everyone</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="bg-[#ffffff] border border-[#e5c2c8] p-6 rounded-3xl shadow-xs space-y-1">
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#AF6A77]">10K+</h3>
            <p className="text-xs text-[#5e323b] font-bold">Products</p>
          </div>
          <div className="bg-[#ffffff] border border-[#e5c2c8] p-6 rounded-3xl shadow-xs space-y-1">
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#AF6A77]">500+</h3>
            <p className="text-xs text-[#5e323b] font-bold">Sellers</p>
          </div>
          <div className="bg-[#ffffff] border border-[#e5c2c8] p-6 rounded-3xl shadow-xs space-y-1">
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#AF6A77]">50K+</h3>
            <p className="text-xs text-[#5e323b] font-bold">Customers</p>
          </div>
          <div className="bg-[#ffffff] border border-[#e5c2c8] p-6 rounded-3xl shadow-xs space-y-1">
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#AF6A77]">98%</h3>
            <p className="text-xs text-[#5e323b] font-bold">Satisfaction</p>
          </div>
        </div>
      </section>

      {/* 13. 📱 App / Platform CTA */}
      <section className="py-20 bg-gradient-to-r from-[#faedf0] via-[#f7e6e9] to-[#faedf0] border-y border-[#e5c2c8]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#3a171f]">
            📱 Your Marketplace. Wherever You Go.
          </h2>
          <p className="text-[#5e323b] text-base max-w-xl mx-auto font-medium">
            Shop, sell and track your orders from one convenient platform.
          </p>
          <div>
            <button
              onClick={() => openAuth('customer')}
              className="bg-gradient-to-r from-[#AF6A77] to-[#8e4f5b] hover:from-[#c47c8a] hover:to-[#9f5966] text-white font-extrabold px-9 py-4 rounded-2xl shadow-xl shadow-[#AF6A77]/30 text-sm transition-all"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </section>

      {/* 14. 🏛️ Footer */}
      <footer className="bg-[#faedf0] border-t border-[#e5c2c8] pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-8 text-xs">
            {/* Column 1: Brand */}
            <div className="col-span-2 sm:col-span-2 md:col-span-1 space-y-4">
              <Logo size="sm" lightText={false} />
              <p className="text-[#7a4651] leading-relaxed">
                Empowering independent vendors, direct sellers, and happy shoppers across India.
              </p>
            </div>

            {/* Column 2: Shop */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-[#3a171f] text-sm">Shop</h4>
              <ul className="space-y-2 text-[#5e323b]">
                <li><a href="#categories" className="hover:text-[#AF6A77] transition-colors">All Products</a></li>
                <li><a href="#categories" className="hover:text-[#AF6A77] transition-colors">Categories</a></li>
                <li><a href="#deals" className="hover:text-[#AF6A77] transition-colors">Deals</a></li>
                <li><a href="#deals" className="hover:text-[#AF6A77] transition-colors">Coupons</a></li>
                <li><a href="#trending" className="hover:text-[#AF6A77] transition-colors">New Arrivals</a></li>
              </ul>
            </div>

            {/* Column 3: For Sellers */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-[#3a171f] text-sm">For Sellers</h4>
              <ul className="space-y-2 text-[#5e323b]">
                <li><button onClick={() => openAuth('seller')} className="hover:text-[#AF6A77] transition-colors text-left">Become a Seller</button></li>
                <li><button onClick={() => openAuth('seller')} className="hover:text-[#AF6A77] transition-colors text-left">Seller Dashboard</button></li>
                <li><button onClick={() => openAuth('seller')} className="hover:text-[#AF6A77] transition-colors text-left">Product Management</button></li>
                <li><button onClick={() => openAuth('seller')} className="hover:text-[#AF6A77] transition-colors text-left">Orders</button></li>
                <li><button onClick={() => openAuth('seller')} className="hover:text-[#AF6A77] transition-colors text-left">Returns</button></li>
              </ul>
            </div>

            {/* Column 4: Customer Support */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-[#3a171f] text-sm">Customer Support</h4>
              <ul className="space-y-2 text-[#5e323b]">
                <li><a href="#features" className="hover:text-[#AF6A77] transition-colors">Help Center</a></li>
                <li><a href="#trust" className="hover:text-[#AF6A77] transition-colors">Contact Us</a></li>
                <li><a href="#trust" className="hover:text-[#AF6A77] transition-colors">Returns & Refunds</a></li>
                <li><a href="#how-it-works" className="hover:text-[#AF6A77] transition-colors">Order Tracking</a></li>
              </ul>
            </div>

            {/* Column 5: Company & Socials */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-[#3a171f] text-sm">Company</h4>
              <ul className="space-y-2 text-[#5e323b]">
                <li><a href="#trust" className="hover:text-[#AF6A77] transition-colors">About Us</a></li>
                <li><a href="#sellers" className="hover:text-[#AF6A77] transition-colors">Careers</a></li>
                <li><a href="#trust" className="hover:text-[#AF6A77] transition-colors">Privacy Policy</a></li>
                <li><a href="#trust" className="hover:text-[#AF6A77] transition-colors">Terms & Conditions</a></li>
              </ul>
              
              <div className="pt-2">
                <span className="font-extrabold text-[#3a171f] block mb-1">Follow Us</span>
                <p className="text-[#7a4651] text-[11px]">
                  Instagram • LinkedIn • YouTube • Facebook
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#e5c2c8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7a4651]">
            <p>© 2026 Zenvora Marketplace. All rights reserved. Shop More, Worry Less.</p>
            <p>Made with care for India's thriving marketplace ecosystem.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialRole={authRole} />
    </div>
  );
};
