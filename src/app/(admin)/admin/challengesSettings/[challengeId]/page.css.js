import { style } from '@vanilla-extract/css';
import { vars, media } from '@/styles/tokens.css.js';

export const container = style({
  width: '100%',
  marginTop: '24px',
});

export const navigationBar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '16px',
});

export const challengeNo = style({
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.gray800,
});

export const navButtons = style({
  display: 'flex',
  gap: '10px',
});

export const navButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
});


export const actionButtons = style({
  display: 'flex',
  gap: '12px',
  marginTop: '48px',
  marginBottom: '48px',

  '@media': {
    [media.iPadMini]: {
      justifyContent: 'flex-end',
    },
  },
});

export const buttonWrapper = style({
  flex: 1,

  '@media': {
    [media.iPadMini]: {
      flex: 'none',
      width: '153px',
    },
  },
});