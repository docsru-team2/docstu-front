import { style } from '@vanilla-extract/css';
import { media, vars } from '@/styles/tokens.css';

export const sectionWrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  margin: '84px 0 96px 0',
  '@media': {
    [media.belowIPadMini]: {
      padding: '0 24px',
    },
  },
});

export const sectionItem = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',

  '@media': {
    [media.belowIPadMini]: {
      flexDirection: 'column',
    },
  },
});

export const imgSize = style({
  '@media': {
    [media.belowIPadMini]: {
      width: '100%',
      height: 'auto',
    },
  },
});

export const textBox = style({
  '@media': {
    [media.belowIPadMini]: {
      marginBottom: '32px',
      padding: '0 20px',
    },
  },
});

export const sectionTitle = style({
  margin: '8px 0 12px 0',
  fontSize: vars.font.size['4xl'],
  fontWeight: vars.font.weight.bold,
  lineHeight: vars.font.lineHeight.tight,
  letterSpacing: '.0244rem',
});

export const sectionDes = style({
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.regular,
  color: '#676767',
  letterSpacing: '.0244rem',
});

export const divider = style({
  width: '100%',
  height: '1px',
  margin: '48px 0',
  background:
    'repeating-linear-gradient(to right, #B2B2B2 0 8px, transparent 8px 14px)',
});
