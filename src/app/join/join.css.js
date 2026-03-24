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

export const loginWrapper = style({
  width: '518px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const fontGroup = style({
  fontWeight: vars.font.weight.regular,
  color: vars.color.gray600,
});

export const LinkFont = style({
  color: vars.color.gray800,
  textDecoration: 'underline',
});

export const mediaLogo = style({
  '@media': {
    [media.belowMobile]: {
      width: '240px',
      height: 'auto',
    },
  },
});

export const googleBtn = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  backgroundColor: 'white',
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: '12px',
  height: '48px',
  marginBottom: '24px',
  cursor: 'pointer',
});
