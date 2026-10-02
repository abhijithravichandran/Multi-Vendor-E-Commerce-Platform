import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rating, count }) => {
  return (
    <div className="inline-flex items-center gap-1">
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${star <= Math.round(rating || 0) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`}
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-slate-200">{(rating || 0).toFixed(1)}</span>
      {count !== undefined && <span className="text-xs text-slate-400">({count})</span>}
    </div>
  );
};
