import React from 'react';

interface PriceTagProps {
  price: number;
  mrp?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const PriceTag: React.FC<PriceTagProps> = ({ price, mrp, size = 'md' }) => {
  const formatINR = (amt: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amt);
  };

  const discount = mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  const textSize = size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-xl';
  const mrpSize = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base';

  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span className={`font-bold text-slate-100 ${textSize}`}>{formatINR(price)}</span>
      {mrp && mrp > price && (
        <>
          <span className={`text-slate-400 line-through ${mrpSize}`}>{formatINR(mrp)}</span>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
            {discount}% off
          </span>
        </>
      )}
    </div>
  );
};
