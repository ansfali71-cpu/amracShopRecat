import { ColorTheme } from '../types';

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryText: string;
  badgeBg: string;
  badgeText: string;
  borderFocus: string;
  gradient: string;
  activeNav: string;
  hex: string;
}

export const THEME_MAP: Record<ColorTheme, ThemeColors> = {
  orange: {
    primary: 'bg-[#f27d26]',
    primaryHover: 'hover:bg-[#df6b15]',
    primaryLight: 'bg-[#f27d26]/10 text-[#f27d26] border-[#f27d26]/20',
    primaryText: 'text-[#f27d26]',
    badgeBg: 'bg-[#f27d26]',
    badgeText: 'text-white',
    borderFocus: 'focus:border-[#f27d26] focus:ring-[#f27d26]/20',
    gradient: 'from-[#f27d26] to-[#d8620e]',
    activeNav: 'text-[#f27d26] border-b-2 border-[#f27d26]',
    hex: '#f27d26'
  },
  slate: {
    primary: 'bg-[#1a1a1a]',
    primaryHover: 'hover:bg-black',
    primaryLight: 'bg-stone-100 text-[#1a1a1a] border-stone-300',
    primaryText: 'text-[#1a1a1a]',
    badgeBg: 'bg-[#1a1a1a]',
    badgeText: 'text-white',
    borderFocus: 'focus:border-[#1a1a1a] focus:ring-black/20',
    gradient: 'from-[#1a1a1a] to-[#121212]',
    activeNav: 'text-[#1a1a1a] border-b-2 border-[#1a1a1a]',
    hex: '#1a1a1a'
  },
  emerald: {
    primary: 'bg-emerald-700',
    primaryHover: 'hover:bg-emerald-800',
    primaryLight: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    primaryText: 'text-emerald-700',
    badgeBg: 'bg-emerald-700',
    badgeText: 'text-white',
    borderFocus: 'focus:border-emerald-700 focus:ring-emerald-700/20',
    gradient: 'from-emerald-700 to-teal-800',
    activeNav: 'text-emerald-700 border-b-2 border-emerald-700',
    hex: '#047857'
  },
  blue: {
    primary: 'bg-slate-900',
    primaryHover: 'hover:bg-slate-800',
    primaryLight: 'bg-slate-100 text-slate-900 border-slate-200',
    primaryText: 'text-slate-900',
    badgeBg: 'bg-slate-900',
    badgeText: 'text-white',
    borderFocus: 'focus:border-slate-900 focus:ring-slate-900/20',
    gradient: 'from-slate-900 to-blue-950',
    activeNav: 'text-slate-900 border-b-2 border-slate-900',
    hex: '#0f172a'
  },
  purple: {
    primary: 'bg-[#7c2d12]',
    primaryHover: 'hover:bg-[#63240e]',
    primaryLight: 'bg-[#7c2d12]/10 text-[#7c2d12] border-[#7c2d12]/20',
    primaryText: 'text-[#7c2d12]',
    badgeBg: 'bg-[#7c2d12]',
    badgeText: 'text-white',
    borderFocus: 'focus:border-[#7c2d12] focus:ring-[#7c2d12]/20',
    gradient: 'from-[#7c2d12] to-[#431407]',
    activeNav: 'text-[#7c2d12] border-b-2 border-[#7c2d12]',
    hex: '#7c2d12'
  }
};
