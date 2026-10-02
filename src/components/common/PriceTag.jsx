import React from 'react';

export const PriceTag = ({ price, mrp }) => {
  const formatINR = (amt) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amt || 0);
  };

  const discount = mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span className="font-bold text-slate-100 text-base">{formatINR(price)}</span>
      {mrp && mrp > price && (
        <>
          <span className="text-slate-400 line-through text-sm">{formatINR(mrp)}</span>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
            {discount}% off
          </span>
        </>
      )}
    </div>
  );
};
