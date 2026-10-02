import React from 'react';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  const getStyle = (s) => {
    const lower = (s || '').toLowerCase();
    if (['active', 'approved', 'delivered', 'paid', 'success', 'accepted'].includes(lower)) {
      return { bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', icon: CheckCircle2 };
    }
    if (['pending', 'placed', 'processing', 'created', 'pickup_scheduled'].includes(lower)) {
      return { bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30', icon: Clock };
    }
    if (['shipped', 'in_transit', 'out_for_delivery', 'packed'].includes(lower)) {
      return { bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30', icon: Clock };
    }
    return { bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30', icon: XCircle };
  };

  const { bg, icon: Icon } = getStyle(status);

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${bg}`}>
      <Icon className="w-3.5 h-3.5" />
      <span className="capitalize">{String(status).replace(/_/g, ' ')}</span>
    </span>
  );
};
