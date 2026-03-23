import { media, vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const searchInput = style({
  width: '100%',
  height: '40px',
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: '999px',
  backgroundColor: vars.color.white,
  fontSize: vars.font.size.md,
  paddingLeft: '36px',

  selectors: {
    '&::placeholder': {
      color: vars.color.gray400,
    },
    '&:focus-visible': {
      outline: `1px solid ${vars.color.brandDark}`,
    },
  },
  '@media': {
    [media.tablet]: {
      fontSize: vars.font.size.lg,
    },
  },
});

export const searchWrapper = style({
  position: 'relative',
  width: '100%',
});

export const searchIcon = style({
  position: 'absolute',
  top: '50%',
  left: '8px',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
});
