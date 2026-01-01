// Storage keys
export const STORAGE_KEY = 'mentira-game';

// Theme colors
export const BRAND_GRADIENT = 'bg-gradient-to-r from-purple-600 to-pink-600';
export const BRAND_GRADIENT_BR = 'bg-gradient-to-br from-purple-600 to-pink-600';
export const BRAND_TEXT_GRADIENT = 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent';

// Button styles
export const BUTTON_STYLES = {
  primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
  secondary: 'bg-white/80 backdrop-blur-sm text-purple-700',
  success: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
  danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white',
  neutral: 'bg-white/80 backdrop-blur-sm text-gray-700',
} as const;

export type ButtonVariant = keyof typeof BUTTON_STYLES;
