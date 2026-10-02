import React from 'react';

/**
 * Authentic Zenvora Brand Logo Component
 * Exact match to user uploaded brand identity:
 * - Ribbon-folded metallic teal/ocean 'Z' forming a shopping cart base with handle
 * - 4-point sparkle star in ice-blue metallic gradient
 * - Dual wheel dots in dark metallic teal
 * - Brand wordmark "zenvora"
 * - Tagline "— SHOP MORE ♥ WORRY LESS —"
 */
export const Logo = ({ size = 'md', variant = 'horizontal', showTagline = true, lightText = true }) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';
  const isXl = size === 'xl';

  // Dimension scaling
  const iconSize = isSm ? 38 : isLg ? 64 : isXl ? 84 : 48;

  return (
    <div className={`flex ${variant === 'stacked' ? 'flex-col items-center text-center' : 'items-center gap-3'} select-none group`}>
      {/* Exact Zenvora Metallic Teal Ribbon Z-Cart Emblem */}
      <div 
        className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg 
          viewBox="0 0 160 160" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          <defs>
            {/* Top Ribbon & Diagonal Gradient (Ice Teal -> Metallic Teal -> Deep Ocean) */}
            <linearGradient id="zenvora-ribbon-top" x1="20%" y1="10%" x2="80%" y2="90%">
              <stop offset="0%" stopColor="#a8dfe4" />
              <stop offset="25%" stopColor="#66b5be" />
              <stop offset="60%" stopColor="#25727d" />
              <stop offset="90%" stopColor="#104a53" />
              <stop offset="100%" stopColor="#0a3239" />
            </linearGradient>

            {/* Bottom Cart Loop Gradient (Deep Metallic Teal with High Gloss) */}
            <linearGradient id="zenvora-cart-base" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#0d3d45" />
              <stop offset="35%" stopColor="#185c67" />
              <stop offset="70%" stopColor="#237480" />
              <stop offset="100%" stopColor="#124952" />
            </linearGradient>

            {/* 3D Fold Shadow Depth */}
            <linearGradient id="zenvora-fold-depth" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#072227" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0d3b42" stopOpacity="0.3" />
            </linearGradient>

            {/* Sparkle Star Gradient */}
            <linearGradient id="zenvora-star-teal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c5eff2" />
              <stop offset="50%" stopColor="#7ec4cc" />
              <stop offset="100%" stopColor="#45929d" />
            </linearGradient>

            {/* Wheel Metallic Color */}
            <linearGradient id="zenvora-wheel-teal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1c4850" />
              <stop offset="100%" stopColor="#0b2429" />
            </linearGradient>
          </defs>

          {/* 4-Point Metallic Sparkle Star */}
          <path 
            d="M 104 38 C 104 47 110 50 118 50 C 110 50 104 53 104 62 C 104 53 98 50 90 50 C 98 50 104 47 104 38 Z" 
            fill="url(#zenvora-star-teal)"
          />

          {/* Main Ribbon Z-Cart Path */}
          {/* Top Bar curves into smooth fold */}
          <path 
            d="M 46 25 C 64 24 94 25 99 35 C 100 37 99 41 94 45 C 88 49 53 87 49 93 C 44 100 48 107 60 107 L 97 107 C 111 107 118 97 122 83 C 124 77 129 76 132 79 C 135 82 135 88 130 96 C 122 113 111 116 97 116 L 56 116 C 36 116 28 103 39 90 L 78 46 C 81 42 77 39 71 39 L 47 39 C 36 39 31 32 32 27 C 33 25 39 25 46 25 Z" 
            fill="url(#zenvora-ribbon-top)"
          />

          {/* Bottom Cart Base Sweep (Highlight overlay for 3D ribbon sheen) */}
          <path 
            d="M 46 95 C 43 103 49 110 62 110 L 98 110 C 109 110 116 103 120 90 C 115 101 107 106 96 106 L 62 106 C 52 106 48 100 50 94 Z" 
            fill="url(#zenvora-cart-base)"
          />

          {/* Inner Fold Depth Shadow */}
          <path 
            d="M 94 37 C 88 41 57 78 51 86 C 56 79 73 60 84 49 C 91 42 94 38 94 37 Z" 
            fill="url(#zenvora-fold-depth)"
          />

          {/* Left Wheel Dot */}
          <circle cx="56" cy="126" r="7.5" fill="url(#zenvora-wheel-teal)" />

          {/* Right Wheel Dot */}
          <circle cx="102" cy="126" r="7.5" fill="url(#zenvora-wheel-teal)" />
        </svg>
      </div>

      {/* Typography: Wordmark + Tagline */}
      <div className={`flex flex-col ${variant === 'stacked' ? 'items-center mt-2' : 'justify-center'}`}>
        <div className="flex items-baseline">
          <span 
            className={`font-serif font-black tracking-tight leading-none ${
              isSm ? 'text-xl' : isLg ? 'text-3xl' : isXl ? 'text-4xl' : 'text-2xl'
            }`}
            style={{ 
              fontFamily: "'Public Sans', 'Playfair Display', Georgia, serif", 
              letterSpacing: '-0.04em',
              color: lightText ? '#ffffff' : '#0a2f38'
            }}
          >
            zenvora
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1 mt-1">
            <span 
              className="text-[7.5px] sm:text-[8.5px] tracking-[0.22em] uppercase font-bold font-sans flex items-center gap-1.5"
              style={{ color: lightText ? '#cbd5e1' : '#0a2f38' }}
            >
              <span>— SHOP MORE</span>
              <span style={{ color: lightText ? '#66b5be' : '#0a2f38' }} className="text-[9px]">♥</span>
              <span>WORRY LESS —</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
