import React from 'react';
import { useStore } from '../../store/store';
import { Store, Truck, Shield, User as UserIcon, Eye } from 'lucide-react';

export const RoleSwitcherBar = () => {
  const { currentRole, setRole, currentUser, highContrast, toggleHighContrast } = useStore();

  const roles = [
    { role: 'customer', label: '1. Customer Storefront', icon: UserIcon },
    { role: 'seller', label: '2. Seller Dashboard', icon: Store },
    { role: 'delivery', label: '3. Delivery Partner', icon: Truck },
    { role: 'admin', label: '4. Admin Console', icon: Shield }
  ];

  return (
    <div className={`bg-slate-950 border-b border-slate-800 px-4 py-2.5 text-xs flex flex-wrap items-center justify-between gap-3 shadow-md z-50 sticky top-0 font-serif ${highContrast ? 'high-contrast' : ''}`}>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = currentRole === r.role;
            return (
              <button
                key={r.role}
                onClick={() => setRole(r.role)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400/50 font-bold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleHighContrast}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium border transition-colors ${
            highContrast ? 'bg-amber-400 text-black border-amber-300 font-bold' : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          {highContrast ? 'High Contrast: ON' : 'High Contrast Mode'}
        </button>

        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          <img src={currentUser.avatar} alt={currentUser.name} className="w-5 h-5 rounded-full object-cover" />
          <span className="font-medium text-slate-200">{currentUser.name}</span>
          <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded uppercase">{currentRole}</span>
        </div>
      </div>
    </div>
  );
};
