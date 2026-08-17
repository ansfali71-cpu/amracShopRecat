import React from 'react';
import { ProductColor } from '../types';

interface ColorSwatchProps {
  colors: ProductColor[];
  selectedColorHex?: string;
  onSelectColor: (color: ProductColor) => void;
  maxDisplay?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isAr?: boolean;
  theme?: 'dark-overlay' | 'light-overlay' | 'default';
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  colors,
  selectedColorHex,
  onSelectColor,
  maxDisplay = 4,
  size = 'sm',
  isAr = true,
  theme = 'default'
}) => {
  if (!colors || colors.length === 0) return null;

  const displayColors = colors.slice(0, maxDisplay);
  const extraCount = colors.length - maxDisplay;

  const sizeClasses = {
    xs: 'w-2.5 h-2.5 sm:w-3 sm:h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }[size];

  return (
    <div 
      className="flex items-center gap-1.5" 
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <div className="flex items-center gap-1 sm:gap-1.5">
        {displayColors.map((color) => {
          const colorHex = color?.hex || '#121212';
          const isSelected = selectedColorHex 
            ? selectedColorHex.toLowerCase() === colorHex.toLowerCase() 
            : false;

          return (
            <button
              key={color.id || colorHex}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onSelectColor(color);
              }}
              title={isAr ? color.nameAr : color.nameEn}
              className={`relative rounded-full transition-all duration-200 cursor-pointer shadow-2xs ${sizeClasses} ${
                isSelected 
                  ? 'ring-1.5 ring-offset-1 ring-[#f27d26] scale-110 z-10 border border-white' 
                  : theme === 'dark-overlay'
                    ? 'border border-white/40 hover:scale-115 hover:z-10'
                    : 'border border-black/10 hover:scale-110 hover:z-10'
              }`}
              style={{ backgroundColor: colorHex }}
              aria-label={isAr ? color.nameAr : color.nameEn}
            />
          );
        })}
      </div>

      {extraCount > 0 && (
        <span className={`text-[9px] font-sans font-bold leading-none select-none px-0.5 ${
          theme === 'dark-overlay' 
            ? 'text-white/90' 
            : 'text-stone-500'
        }`}>
          +{extraCount}
        </span>
      )}
    </div>
  );
};

