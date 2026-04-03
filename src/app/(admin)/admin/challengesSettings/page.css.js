// src/app/(admin)/admin/challengesList/page.css.js
import { style } from '@vanilla-extract/css';
import { vars, media } from '@/styles/tokens.css.js';

export const heading = style({
  fontSize: vars.font.size['2xl'],
  fontWeight: vars.font.weight.semibold,
  color: vars.color.gray800,
  paddingTop: '8px',
  paddingBottom: '8px',
  marginTop: '24px',
  // marginBottom: '16px',
});

export const filterBar = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '16px',

  '@media': {
    [media.iPadMini]: {
      marginBottom: '24px',
    },
  },
});

export const filterItem = style({
  flexShrink: 0,
  width: '160px',
});

export const paginationWrapper = style({
  marginTop: '40px',
  marginBottom: '40px',
});
