import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/tokens.css';

export const wrapper = style({
  width: '100%',
  flex: 1,
});

export const wrapperBg = styleVariants({
  white: { backgroundColor: '#ffffff' },
  gray: { backgroundColor: vars.color.gray50 },
  dark: { backgroundColor: vars.color.gray100 },
});

export const inner = style({
  maxWidth: '996px',
  width: '100%',
  margin: '0 auto',
  padding: '0 16px',
});
