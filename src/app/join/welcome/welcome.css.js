import { media, vars } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  height: '100vh',
  backgroundColor: vars.color.gray100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media': {
    [media.belowIPadMini]: {
      padding: '0 113px',
    },
    [media.belowMobile]: {
      padding: '0 16px',
    },
  },
});

export const welcomWrapper = style({
  width: '518px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const fontGroup = style({
  fontWeight: vars.font.weight.regular,
  fontSize: vars.font.size['4xl'],
  margin: '32px 0 24px 0',
});

export const btnWrapper = style({
  width: '160px',
});
