import { createTheme } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
  color: {
    gray900: '#171717',
    gray800: '#262626',
    gray700: '#404040',
    gray600: '#525252',
    gray500: '#737373',
    gray400: '#A3A3A3',
    gray300: '#D4D4D4',
    gray200: '#E5E5E5',
    gray100: '#F5F5F5',
    gray50: '#FAFAFA',
    white: '#FFFFFF',

    brandDark: '#262626',
    brandYellow: '#FFC117',
    brandLight: '#F1F2F5',

    error: '#EB3E3E',
  },

  font: {
    size: {
      xs: '0.75rem',
      sm: '0.8125rem',
      md: '0.875rem',
      lg: '1rem',
      xl: '1.125rem',
      '2xl': '1.25rem',
      '3xl': '1.375rem',
      '4xl': '1.5rem',
    },
    weight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '130%',
      normal: '160%',
    },
  },
});

export const media = {
  tablet: 'screen and (min-width: 768px)',
  desktop: 'screen and (min-width: 1280px)',
};
