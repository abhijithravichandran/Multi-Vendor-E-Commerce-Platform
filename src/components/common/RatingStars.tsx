import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating, count, size = 'sm' }) => {
  const iconSize = size === 'sm' ? 3.5 : size === 'md' ? 4 : 5;

  return (
    <div className="inline-flex items-center gap-1">
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-${iconSize} h-${iconSize} ${
              star <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-slate-200">{rating.toFixed(1)}</span>
      {count !== undefined && <span className="text-xs text-slate-400">({count})</span>}
    </div>
  );
};
