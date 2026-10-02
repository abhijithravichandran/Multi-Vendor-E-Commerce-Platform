import React, { useState } from 'react';
import { useStore } from '../../store/store';
import { Logo } from '../common/Logo';
import { X, User, Store, Truck, Shield, Lock, Mail, UserCheck } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, initialRole = 'customer' }) => {
  const { registerUser, setRole } = useStore();
  const [isLogin, setIsLogin] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(initialRole);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      setRole(selectedRole);
    } else {
      registerUser(fullName || 'Zenvora User', email || 'user@example.com', password || 'secret', selectedRole);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-serif">
      <div className="bg-[#ffffff] border border-[#e5c2c8] rounded-3xl max-w-md w-full p-6 md:p-8 relative shadow-2xl space-y-6">
        <button onClick={onClose} className="absolute top-5 right-5 text-[#7a4651] hover:text-[#3a171f] transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3 flex flex-col items-center">
          <Logo size="md" variant="stacked" lightText={false} />
          <h2 className="text-xl font-extrabold text-[#3a171f] mt-2">
            {isLogin ? 'Welcome Back to Zenvora' : 'Create Your Zenvora Account'}
          </h2>
          <p className="text-xs text-[#5e323b] font-medium">
            {isLogin ? 'Sign in to access your panel' : 'Join as Customer, Seller, Delivery Partner, or Admin'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {!isLogin && (
            <div>
              <label className="block text-[#3a171f] font-bold mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8e4f5b] absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#faedf0] border border-[#e5c2c8] rounded-xl pl-10 pr-4 py-2.5 text-[#3a171f] placeholder-[#9a6470] focus:border-[#AF6A77] focus:bg-[#ffffff] focus:outline-none transition-all shadow-xs"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[#3a171f] font-bold mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8e4f5b] absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#faedf0] border border-[#e5c2c8] rounded-xl pl-10 pr-4 py-2.5 text-[#3a171f] placeholder-[#9a6470] focus:border-[#AF6A77] focus:bg-[#ffffff] focus:outline-none transition-all shadow-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#3a171f] font-bold mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8e4f5b] absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#faedf0] border border-[#e5c2c8] rounded-xl pl-10 pr-4 py-2.5 text-[#3a171f] placeholder-[#9a6470] focus:border-[#AF6A77] focus:bg-[#ffffff] focus:outline-none transition-all shadow-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#3a171f] font-bold mb-2">Select Portal / Role</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { role: 'customer', label: 'Customer', icon: User },
                { role: 'seller', label: 'Seller', icon: Store },
                { role: 'delivery', label: 'Delivery', icon: Truck },
                { role: 'admin', label: 'Admin', icon: Shield }
              ].map(item => {
                const Icon = item.icon;
                const active = selectedRole === item.role;
                return (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => setSelectedRole(item.role)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-left font-bold transition-all ${
                      active 
                        ? 'border-[#AF6A77] bg-[#AF6A77]/15 text-[#3a171f] ring-1 ring-[#AF6A77] shadow-xs' 
                        : 'border-[#e5c2c8] bg-[#faedf0] text-[#5e323b] hover:border-[#AF6A77] hover:bg-[#f7e6e9]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-[#AF6A77]' : 'text-[#8e4f5b]'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#AF6A77] to-[#8e4f5b] hover:from-[#c47c8a] hover:to-[#9f5966] text-white font-extrabold py-3 rounded-xl shadow-lg shadow-[#AF6A77]/30 transition-all text-sm mt-2"
          >
            {isLogin ? 'Sign In to Panel' : 'Create Account & Continue'}
          </button>
        </form>

        <div className="text-center text-xs text-[#5e323b] font-medium border-t border-[#e5c2c8] pt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-[#AF6A77] hover:text-[#8e4f5b] font-extrabold hover:underline transition-colors ml-1">
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};
